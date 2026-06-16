<template>
  <NuxtLayout name="public" :streamer="streamer">
    <div class="mt-5 space-y-5 select-none pb-12">
      <!-- Loading State -->
      <div v-if="loading" class="space-y-4 py-8 font-mono">
        <div class="flex items-center justify-between">
          <UiLqSkeleton class="h-6 w-32" />
          <UiLqSkeleton class="h-6 w-16" />
        </div>
        <div class="space-y-3">
          <UiLqSkeleton class="h-16 w-full rounded-[10px]" v-slot:default v-for="n in 3" :key="n" />
        </div>
      </div>

      <!-- Main Content -->
      <template v-else-if="streamer">
        <!-- Status Header Panel -->
        <div class="flex items-center justify-between bg-surface border-[1.5px] border-retro rounded-[10px] p-4.5 shadow-soft font-mono">
          <div>
            <div class="text-[9px] text-[var(--color-text-tertiary)] font-bold uppercase tracking-wider">Status Antrean</div>
            <div class="flex items-center gap-2 mt-1.5">
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span class="text-[10px] font-black text-primary tracking-widest uppercase">LIVE QUEUE</span>
            </div>
          </div>
          <div class="text-right">
            <div class="text-[9px] text-[var(--color-text-tertiary)] font-bold uppercase tracking-wider">Total Antrean</div>
            <div class="text-base font-black text-retro mt-1 uppercase tracking-wide">{{ totalActiveCount }}</div>
          </div>
        </div>

        <!-- Empty State (Monochrome CRT screen illustration) -->
        <div
          v-if="playing.length === 0 && waiting.length === 0 && parked.length === 0"
          class="flex flex-col items-center justify-center py-20 px-6 text-center bg-surface border-[1.5px] border-retro rounded-[10px] shadow-soft"
        >
          <!-- Retro-Tech CRT Monitor SVG -->
          <div class="relative w-32 h-32 mb-6 scanline-effect rounded-[8px] bg-[#050505] border-[1.5px] border-retro flex items-center justify-center overflow-hidden">
            <svg
              viewBox="0 0 100 100"
              class="w-20 h-20 text-[var(--color-text-tertiary)] transition-colors duration-300"
              xmlns="http://www.w3.org/2000/svg"
            >
              <!-- CRT Monitor Outer Screen Frame -->
              <rect x="15" y="15" width="70" height="50" rx="8" fill="none" stroke="currentColor" stroke-width="2.5" />
              <!-- Screen Inner display lines -->
              <rect x="20" y="20" width="60" height="40" rx="4" fill="none" stroke="currentColor" stroke-width="1.5" opacity="0.4" />
              <!-- Monitor stand base -->
              <path d="M40 65l-5 15h30l-5-15z" fill="none" stroke="currentColor" stroke-width="2" />
              <line x1="30" y1="80" x2="70" y2="80" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
              <!-- NO SIGNAL / OFFLINE pulse label -->
              <text x="50" y="44" font-family="monospace" font-size="6" font-weight="bold" fill="currentColor" text-anchor="middle" class="charging-bolt">EMPTY LOBBY</text>
              <line x1="30" y1="50" x2="70" y2="50" stroke="currentColor" stroke-width="1.5" stroke-dasharray="2,2" opacity="0.5" />
            </svg>
          </div>
          <h3 class="text-xs font-black text-retro mb-2 font-display uppercase tracking-wider">Lobi sedang kosong</h3>
          <p class="text-[11px] text-[var(--color-text-secondary)] max-w-[280px] leading-relaxed font-mono uppercase tracking-wide font-medium">
            Streamer sedang istirahat atau belum membuka pendaftaran mabar.
          </p>
        </div>

        <template v-else>
          <!-- PLAYING SECTION -->
          <div v-if="playing.length > 0" class="space-y-3">
            <h2 class="text-[10px] font-black text-secondary uppercase tracking-widest flex items-center gap-1.5 px-0.5 font-display">
              <span class="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              Sedang Bermain
            </h2>
            
            <TransitionGroup name="list" tag="div" class="space-y-2.5">
              <div
                v-for="(item, idx) in playing"
                :key="item.id"
                class="relative overflow-hidden bg-surface border-[1.5px] border-secondary/40 rounded-[10px] p-4 shadow-soft transition-all"
              >
                <div class="absolute left-0 top-0 bottom-0 w-0.5 bg-secondary" />
                <div class="flex items-center justify-between">
                  <div class="min-w-0 flex-1 pr-3">
                    <div class="flex items-center gap-2 flex-wrap">
                      <span class="text-sm font-display font-bold text-retro tracking-wide">{{ item.viewer_name }}</span>
                      <UiLqBadge v-if="item.priority_level === 2" variant="fast-track">⭐ Fast Track</UiLqBadge>
                    </div>
                    <div class="text-[10px] text-[var(--color-text-tertiary)] mt-1.5 flex items-center gap-1.5 font-mono font-bold uppercase tracking-wider">
                      <span class="border border-retro px-1.5 py-0.5 rounded-[4px] text-[9px]">{{ maskGameId(item.game_id) }}</span>
                      <span>&middot;</span>
                      <span class="text-secondary">Sisa {{ item.remaining_quota }} Match</span>
                    </div>
                  </div>
                  <div class="flex flex-col items-end shrink-0 font-mono">
                    <span class="text-[9px] border-[1.5px] border-secondary text-secondary font-bold px-2.5 py-1 rounded-[6px] uppercase tracking-wider bg-transparent">In-Game</span>
                  </div>
                </div>
              </div>
            </TransitionGroup>
          </div>

          <!-- WAITING SECTION -->
          <div class="space-y-3">
            <h2 class="text-[10px] font-black text-[var(--color-text-tertiary)] uppercase tracking-widest px-0.5 font-display">
              Daftar Antrean ({{ waiting.length }})
            </h2>
            <div v-if="waiting.length === 0" class="text-center py-6 bg-surface border border-retro rounded-[10px] text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--color-text-tertiary)]">
              Tidak ada antrean dalam daftar tunggu
            </div>
            
            <TransitionGroup v-else name="list" tag="div" class="space-y-2">
              <div
                v-for="(item, idx) in waiting"
                :key="item.id"
                class="flex items-center justify-between bg-surface border border-retro hover:border-primary/40 rounded-[10px] p-3 transition-colors shadow-soft"
              >
                <div class="flex items-center gap-3 min-w-0 flex-1 pr-2">
                  <span class="text-[10px] font-mono text-[var(--color-text-tertiary)] font-bold w-5 text-center">#0{{ idx + 1 }}</span>
                  <div class="min-w-0 flex-1">
                    <div class="flex items-center gap-2 flex-wrap">
                      <span class="text-xs font-display font-bold text-retro truncate max-w-[150px]">{{ item.viewer_name }}</span>
                      <UiLqBadge v-if="item.priority_level === 2" variant="fast-track">Fast</UiLqBadge>
                    </div>
                    <div class="text-[10px] text-[var(--color-text-tertiary)] mt-1 flex items-center gap-1.5 font-mono font-bold uppercase tracking-wider">
                      <span class="border border-retro px-1 py-0.5 rounded-[4px] text-[9px]">{{ maskGameId(item.game_id) }}</span>
                      <span>&middot;</span>
                      <span>Sisa {{ item.remaining_quota }} Match</span>
                    </div>
                  </div>
                </div>
                <div class="text-right shrink-0 font-mono">
                  <span class="text-[8px] border border-retro text-[var(--color-text-secondary)] px-2.5 py-1 rounded-[6px] font-bold uppercase tracking-wider">Menunggu</span>
                </div>
              </div>
            </TransitionGroup>
          </div>

          <!-- PARKED SECTION -->
          <div class="space-y-2">
            <button
              class="w-full flex items-center justify-between px-3 py-3 bg-surface border border-retro rounded-[10px] transition-colors text-[10px] font-mono font-bold text-[var(--color-text-tertiary)] active:scale-[0.99] duration-150"
              @click="isParkedOpen = !isParkedOpen"
            >
              <span class="uppercase tracking-wider">Antrean Terparkir ({{ parked.length }})</span>
              <svg
                :class="['w-4 h-4 text-[var(--color-text-tertiary)] transition-transform duration-250 ease-out', isParkedOpen && 'rotate-180']"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <Transition
              enter-active-class="transition-all duration-300 ease-out"
              enter-from-class="max-h-0 opacity-0"
              enter-to-class="max-h-[1000px] opacity-100"
              leave-active-class="transition-all duration-200 ease-in"
              leave-from-class="max-h-[1000px] opacity-100"
              leave-to-class="max-h-0 opacity-0"
            >
              <div v-show="isParkedOpen" class="overflow-hidden">
                <div class="space-y-2 pt-1 pb-2">
                  <div v-if="parked.length === 0" class="text-center py-5 text-[10px] font-mono font-bold text-[var(--color-text-tertiary)] uppercase tracking-wider italic">
                    Tidak ada antrean terparkir
                  </div>
                  
                  <TransitionGroup name="list" tag="div" class="space-y-2">
                    <div
                      v-for="(item, idx) in parked"
                      :key="item.id"
                      class="flex items-center justify-between bg-surface border border-retro rounded-[10px] p-3 opacity-60 hover:opacity-100 transition-opacity"
                    >
                      <div class="min-w-0 flex-1 pr-2">
                        <div class="flex items-center gap-2 flex-wrap">
                          <span class="text-xs font-display font-bold text-[var(--color-text-secondary)] truncate max-w-[150px]">{{ item.viewer_name }}</span>
                          <UiLqBadge v-if="item.priority_level === 2" variant="parked">Fast</UiLqBadge>
                        </div>
                        <div class="text-[10px] text-[var(--color-text-tertiary)] mt-1 flex items-center gap-1.5 font-mono font-bold uppercase tracking-wider">
                          <span class="border border-retro px-1 py-0.5 rounded-[4px] text-[9px]">{{ maskGameId(item.game_id) }}</span>
                          <span>&middot;</span>
                          <span>Sisa {{ item.remaining_quota }} Match</span>
                        </div>
                      </div>
                      <div class="text-right shrink-0 font-mono">
                        <span class="text-[8px] border border-retro text-[var(--color-text-tertiary)] px-2.5 py-1 rounded-[6px] font-bold uppercase tracking-wider">Terparkir</span>
                      </div>
                    </div>
                  </TransitionGroup>
                </div>
              </div>
            </Transition>
          </div>
        </template>
      </template>

      <!-- Not Found State -->
      <div
        v-else
        class="flex flex-col items-center justify-center py-20 px-6 text-center bg-surface border border-retro rounded-[10px] shadow-soft"
      >
        <span class="text-3xl mb-4 font-mono">&#128269;</span>
        <h3 class="text-xs font-black text-retro mb-2 font-display uppercase tracking-wider">Streamer tidak ditemukan</h3>
        <p class="text-[11px] text-[var(--color-text-secondary)] max-w-[280px] font-mono uppercase tracking-wider font-medium leading-relaxed">
          Link antrean yang Anda akses tidak valid atau username streamer salah.
        </p>
        <NuxtLink to="/" class="btn-primary mt-6 text-xs uppercase tracking-wider">
          Kembali ke Beranda
        </NuxtLink>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

definePageMeta({
  layout: false,
})

const route = useRoute()
const username = route.params.username as string
const config = useRuntimeConfig()

const streamer = ref<any>(null)
const publicItems = ref<any[]>([])
const loading = ref(true)
const isParkedOpen = ref(false)

const { connect, disconnect } = useSSE(username, () => {
  fetchQueueData()
})

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

  if (streamer.value) {
    connect()
  }
})

onBeforeUnmount(() => {
  disconnect()
})

const maskGameId = (gameId: string) => {
  if (!gameId) return ''
  if (gameId.includes('*')) return gameId

  if (gameId.length <= 4) {
    return gameId.substring(0, 2) + '*'.repeat(gameId.length - 2)
  }
  return gameId.substring(0, 4) + '*'.repeat(Math.max(4, gameId.length - 4))
}

const playing = computed(() => publicItems.value.filter((item) => item.status === 'PLAYING'))
const waiting = computed(() => publicItems.value.filter((item) => item.status === 'WAITING'))
const parked = computed(() => publicItems.value.filter((item) => item.status === 'PARKED'))
const totalActiveCount = computed(() => playing.value.length + waiting.value.length)
</script>

<style scoped>
@keyframes pulse-light {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
}

.charging-bolt {
  animation: pulse-light 1.5s infinite ease-in-out;
}
</style>
