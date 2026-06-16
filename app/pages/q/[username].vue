<template>
  <NuxtLayout name="public" :streamer="streamer">
    <div class="mt-4 space-y-5 select-none">
      <!-- Loading State -->
      <div v-if="loading" class="space-y-4 py-8">
        <div class="flex items-center justify-between">
          <UiLqSkeleton class="h-6 w-32" />
          <UiLqSkeleton class="h-6 w-16" />
        </div>
        <div class="space-y-3">
          <UiLqSkeleton class="h-16 w-full" v-for="n in 3" :key="n" />
        </div>
      </div>

      <!-- Main Content when loaded -->
      <template v-else-if="streamer">
        <!-- Live Queue Status Header -->
        <div class="flex items-center justify-between bg-surface-dark border border-white/5 rounded-lg p-4 shadow-soft">
          <div>
            <div class="text-xs text-gray-400 font-medium">Status Antrean</div>
            <div class="flex items-center gap-2 mt-1">
              <span class="relative flex h-2.5 w-2.5">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
              <span class="text-sm font-bold text-white tracking-wider">🔴 LIVE QUEUE</span>
            </div>
          </div>
          <div class="text-right">
            <div class="text-xs text-gray-400 font-medium">Total Antrean</div>
            <div class="text-lg font-bold text-primary mt-0.5">{{ totalActiveCount }}</div>
          </div>
        </div>

        <!-- Empty State (No players in WAITING, PLAYING, PARKED) -->
        <div
          v-if="playing.length === 0 && waiting.length === 0 && parked.length === 0"
          class="flex flex-col items-center justify-center py-16 px-6 text-center bg-surface-dark border border-white/5 rounded-lg shadow-soft"
        >
          <!-- Animated Charging Controller SVG -->
          <div class="relative w-24 h-24 mb-6">
            <svg
              viewBox="0 0 100 100"
              class="w-full h-full text-gray-500 hover:text-primary transition-colors duration-300"
              xmlns="http://www.w3.org/2000/svg"
            >
              <!-- Controller Outline -->
              <path
                d="M30 35c-10 0-15 8-15 20s8 25 15 25c5 0 8-3 10-6h20c2 3 5 6 10 6 7 0 15-13 15-25s-5-20-15-20H30z"
                fill="none"
                stroke="currentColor"
                stroke-width="4"
                stroke-linejoin="round"
                class="controller-body"
              />
              <!-- D-Pad -->
              <path d="M25 55h6v-6h4v6h6v4h-6v6h-4v-6h-6z" fill="currentColor" opacity="0.6" />
              <!-- Buttons -->
              <circle cx="65" cy="53" r="3" fill="currentColor" opacity="0.6" />
              <circle cx="73" cy="57" r="3" fill="currentColor" opacity="0.6" />
              <circle cx="69" cy="61" r="3" fill="currentColor" opacity="0.6" />
              <!-- Battery Indicator inside Controller -->
              <rect x="42" y="42" width="16" height="8" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.5" />
              <rect x="59" y="44" width="2" height="4" rx="0.5" fill="currentColor" />
              <rect x="44" y="44" width="0" height="4" fill="#13A8C7" class="battery-charge" />
              <!-- Plug & Cable charging -->
              <path d="M50 78v8c0 3-2 5-5 5" fill="none" stroke="#13A8C7" stroke-width="2" stroke-linecap="round" class="charging-cable" />
              <path d="M50 74l-3 4h6z" fill="#13A8C7" class="charging-bolt" />
            </svg>
          </div>
          <h3 class="text-base font-bold text-white mb-2">Lobi sedang kosong</h3>
          <p class="text-xs text-gray-400 max-w-[280px] leading-relaxed">
            Streamer sedang istirahat atau belum membuka pendaftaran mabar. Pantau terus halaman ini!
          </p>
        </div>

        <template v-else>
          <!-- 1. PLAYING SECTION (Top priority visual highlight) -->
          <div v-if="playing.length > 0" class="space-y-2.5">
            <h2 class="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5 px-1">
              <span class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Sedang Bermain
            </h2>
            <div class="grid gap-2.5">
              <div
                v-for="(item, idx) in playing"
                :key="idx"
                class="relative overflow-hidden bg-gradient-to-r from-primary/10 to-transparent border border-primary/30 rounded-lg p-3.5 shadow-glow transition-all"
              >
                <!-- Glowing side border -->
                <div class="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
                <div class="flex items-center justify-between">
                  <div class="min-w-0">
                    <div class="flex items-center gap-2 flex-wrap">
                      <span class="text-sm font-bold text-white">{{ item.viewer_name }}</span>
                      <UiLqBadge v-if="item.priority_level === 2" variant="fast-track">Fast Track</UiLqBadge>
                    </div>
                    <div class="text-xs text-gray-400 mt-1 flex items-center gap-1.5">
                      <span class="font-mono">{{ maskGameId(item.game_id) }}</span>
                      <span>&middot;</span>
                      <span class="text-primary font-medium">Sisa {{ item.remaining_quota }} Match</span>
                    </div>
                  </div>
                  <div class="flex flex-col items-end shrink-0">
                    <span class="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded font-bold uppercase tracking-wider">In-Game</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 2. WAITING SECTION (Main list) -->
          <div class="space-y-2.5">
            <h2 class="text-xs font-bold text-gray-400 uppercase tracking-wider px-1">
              Daftar Antrean ({{ waiting.length }})
            </h2>
            <div v-if="waiting.length === 0" class="text-center py-6 bg-surface-dark/40 border border-white/5 rounded-lg text-xs text-gray-500 italic">
              Tidak ada antrean dalam daftar tunggu
            </div>
            <div v-else class="space-y-2">
              <div
                v-for="(item, idx) in waiting"
                :key="idx"
                class="flex items-center justify-between bg-surface-dark border border-white/5 hover:border-white/10 rounded-lg p-3 transition-colors shadow-soft"
              >
                <div class="flex items-center gap-3 min-w-0">
                  <span class="text-xs font-mono text-gray-400 w-5 text-center">#{{ idx + 1 }}</span>
                  <div class="min-w-0">
                    <div class="flex items-center gap-2 flex-wrap">
                      <span class="text-sm font-semibold text-white truncate max-w-[150px]">{{ item.viewer_name }}</span>
                      <UiLqBadge v-if="item.priority_level === 2" variant="fast-track" class="scale-90">Fast</UiLqBadge>
                    </div>
                    <div class="text-xs text-gray-500 mt-0.5 flex items-center gap-1.5">
                      <span class="font-mono">{{ maskGameId(item.game_id) }}</span>
                      <span>&middot;</span>
                      <span>Sisa {{ item.remaining_quota }} Match</span>
                    </div>
                  </div>
                </div>
                <div class="text-right shrink-0">
                  <span class="text-[10px] bg-white/5 border border-white/10 text-gray-300 px-2 py-0.5 rounded font-medium">Menunggu</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 3. PARKED SECTION (Collapsed by default) -->
          <div class="space-y-2">
            <button
              class="w-full flex items-center justify-between px-3 py-2 bg-surface-dark/30 hover:bg-surface-dark/50 border border-white/5 rounded-lg transition-colors text-xs text-gray-400"
              @click="isParkedOpen = !isParkedOpen"
            >
              <span class="font-semibold uppercase tracking-wider">Antrean Terparkir ({{ parked.length }})</span>
              <svg
                :class="['w-4 h-4 text-gray-400 transition-transform duration-200', isParkedOpen && 'rotate-180']"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <Transition
              enter-active-class="transition-all duration-200 ease-out"
              enter-from-class="max-h-0 opacity-0"
              enter-to-class="max-h-[1000px] opacity-100"
              leave-active-class="transition-all duration-200 ease-in"
              leave-from-class="max-h-[1000px] opacity-100"
              leave-to-class="max-h-0 opacity-0"
            >
              <div v-show="isParkedOpen" class="overflow-hidden space-y-2">
                <div v-if="parked.length === 0" class="text-center py-4 text-xs text-gray-600 italic">
                  Tidak ada antrean terparkir
                </div>
                <div
                  v-for="(item, idx) in parked"
                  :key="idx"
                  class="flex items-center justify-between bg-surface-dark/20 border border-white/5 rounded-lg p-3"
                >
                  <div class="min-w-0">
                    <div class="flex items-center gap-2 flex-wrap">
                      <span class="text-sm text-gray-300 truncate max-w-[150px]">{{ item.viewer_name }}</span>
                      <UiLqBadge v-if="item.priority_level === 2" variant="fast-track" class="scale-90 opacity-60">Fast</UiLqBadge>
                    </div>
                    <div class="text-xs text-gray-500 mt-0.5 flex items-center gap-1.5">
                      <span class="font-mono">{{ maskGameId(item.game_id) }}</span>
                      <span>&middot;</span>
                      <span>Sisa {{ item.remaining_quota }} Match</span>
                    </div>
                  </div>
                  <div class="text-right shrink-0">
                    <span class="text-[10px] bg-white/[0.02] border border-white/5 text-gray-500 px-2 py-0.5 rounded font-medium">Terparkir</span>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </template>
      </template>

      <!-- Streamer Not Found -->
      <div
        v-else
        class="flex flex-col items-center justify-center py-20 px-6 text-center bg-surface-dark border border-white/5 rounded-lg shadow-soft"
      >
        <span class="text-4xl mb-4">🔍</span>
        <h3 class="text-base font-bold text-white mb-2">Streamer tidak ditemukan</h3>
        <p class="text-xs text-gray-400 max-w-[280px]">
          Link antrean yang Anda akses tidak valid atau username streamer salah.
        </p>
        <NuxtLink to="/" class="btn-primary mt-6 text-xs !py-2 !px-4">
          Kembali ke Beranda
        </NuxtLink>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
})

const route = useRoute()
const username = route.params.username as string
const config = useRuntimeConfig()

// State
const streamer = ref<any>(null)
const publicItems = ref<any[]>([])
const loading = ref(true)
const isParkedOpen = ref(false)

// SSE Composable
const { connect, disconnect } = useSSE(username, () => {
  // Callback when eventSource receives 'queue_update'
  fetchQueueData()
})

// Fetch Profile and Initial Queue Data
const fetchStreamerProfile = async () => {
  try {
    const res = await $fetch(`${config.public.apiBaseUrl}/public/streamer/${username}`) as any
    if (res.success) {
      streamer.value = res.data
    }
  } catch (err) {
    console.error('Error fetching streamer profile:', err)
  }
}

const fetchQueueData = async () => {
  try {
    const res = await $fetch(`${config.public.apiBaseUrl}/public/queues/${username}`) as any
    if (res.success) {
      publicItems.value = res.data
    }
  } catch (err) {
    console.error('Error fetching queue data:', err)
  }
}

onMounted(async () => {
  loading.value = true
  await Promise.all([
    fetchStreamerProfile(),
    fetchQueueData()
  ])
  loading.value = false

  // Establish real-time sync with SSE
  if (streamer.value) {
    connect()
  }
})

onBeforeUnmount(() => {
  disconnect()
})

// Mask Game ID fallback if not masked by API
const maskGameId = (gameId: string) => {
  if (!gameId) return ''
  if (gameId.includes('*')) return gameId // Already masked by API
  
  if (gameId.length <= 4) {
    return gameId.substring(0, 2) + '*'.repeat(gameId.length - 2)
  }
  return gameId.substring(0, 4) + '*'.repeat(Math.max(4, gameId.length - 4))
}

// Lists segregated by status
const playing = computed(() => {
  return publicItems.value.filter((item) => item.status === 'PLAYING')
})

const waiting = computed(() => {
  // Backend returns pre-sorted FIFO and priority, keep as-is
  return publicItems.value.filter((item) => item.status === 'WAITING')
})

const parked = computed(() => {
  return publicItems.value.filter((item) => item.status === 'PARKED')
})

const totalActiveCount = computed(() => {
  return playing.value.length + waiting.value.length
})
</script>

<style scoped>
/* Animated charging controller css */
@keyframes charge {
  0% { width: 0%; opacity: 0.3; }
  50% { width: 100%; opacity: 1; }
  100% { width: 100%; opacity: 0.3; }
}

@keyframes pulse-light {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

.battery-charge {
  animation: charge 2.5s infinite ease-in-out;
}

.charging-bolt {
  animation: pulse-light 1.5s infinite ease-in-out;
}

.controller-body {
  animation: pulse-light 3s infinite ease-in-out;
}
</style>
