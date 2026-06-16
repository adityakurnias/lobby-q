<template>
  <div class="min-h-screen bg-black text-white p-3 font-sans select-none pb-20">
    <!-- Top Header & Profile Info -->
    <div class="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
      <div class="flex items-center gap-2">
        <div class="w-7 h-7 rounded bg-primary flex items-center justify-center">
          <span class="text-white font-bold text-xs">LQ</span>
        </div>
        <div class="min-w-0">
          <h1 class="text-sm font-bold truncate">{{ authStore.streamer?.name || 'Dashboard Streamer' }}</h1>
          <a
            v-if="authStore.streamer?.username"
            :href="`/q/${authStore.streamer.username}`"
            target="_blank"
            class="text-[10px] text-primary hover:underline flex items-center gap-1"
          >
            <span>/q/{{ authStore.streamer.username }}</span>
            <svg class="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
      <button
        @click="handleLogout"
        class="text-xs text-gray-500 hover:text-white transition-colors"
        title="Logout dari aplikasi"
      >
        Logout
      </button>
    </div>

    <!-- Top Input Section (Add Queue) -->
    <div class="bg-surface-dark/40 border border-white/5 rounded-lg p-3 mb-4 space-y-3 shadow-soft">
      <div class="text-xs font-semibold text-gray-400">Tambah Antrean</div>
      <form @submit.prevent="handleAddQueue" class="space-y-2.5">
        <div class="grid grid-cols-2 gap-2">
          <input
            v-model="form.viewer_name"
            type="text"
            placeholder="Nama Viewer"
            class="bg-white/5 border border-white/10 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-primary/50"
            required
          />
          <input
            v-model="form.game_id"
            type="text"
            placeholder="Game ID (MLBB/FF)"
            class="bg-white/5 border border-white/10 rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-primary/50"
            required
          />
        </div>
        <div class="flex items-center justify-between gap-2 pt-1">
          <div class="flex items-center gap-2">
            <span class="text-[11px] text-gray-400">Kuota:</span>
            <input
              v-model.number="form.total_quota"
              type="number"
              min="1"
              max="20"
              class="w-12 bg-white/5 border border-white/10 rounded px-1.5 py-1 text-center text-xs text-white focus:outline-none focus:border-primary/50"
              required
            />
          </div>
          <label class="flex items-center gap-1 cursor-pointer select-none">
            <input
              v-model="form.is_fast_track"
              type="checkbox"
              class="rounded border-white/10 bg-white/5 text-primary focus:ring-0 focus:ring-offset-0 w-3.5 h-3.5"
            />
            <span class="text-[11px] text-amber-300 font-medium">⭐ Fast Track</span>
          </label>
          <UiLqButton
            variant="primary"
            size="sm"
            :loading="actionLoading.add"
            class="!py-1 !px-3 text-xs"
          >
            Tambah
          </UiLqButton>
        </div>
      </form>
    </div>

    <!-- Queue Statistics -->
    <div class="grid grid-cols-3 gap-2 mb-4">
      <div class="bg-surface-dark/20 border border-white/5 rounded-lg py-2 text-center shadow-soft">
        <div class="text-base font-bold text-primary">{{ queueStore.totalPlaying }}</div>
        <div class="text-[9px] text-gray-500 uppercase tracking-wider font-semibold">Playing</div>
      </div>
      <div class="bg-surface-dark/20 border border-white/5 rounded-lg py-2 text-center shadow-soft">
        <div class="text-base font-bold text-white">{{ queueStore.totalWaiting }}</div>
        <div class="text-[9px] text-gray-500 uppercase tracking-wider font-semibold">Waiting</div>
      </div>
      <div class="bg-surface-dark/20 border border-white/5 rounded-lg py-2 text-center shadow-soft">
        <div class="text-base font-bold text-gray-400">{{ queueStore.totalParked }}</div>
        <div class="text-[9px] text-gray-500 uppercase tracking-wider font-semibold">Parked</div>
      </div>
    </div>

    <!-- Main Collapsible Sections -->
    <div class="space-y-3">
      <!-- 1. PLAYING SECTION -->
      <UiLqCollapsible :defaultOpen="true" :count="queueStore.playing.length">
        <template #title>
          <span class="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Playing
          </span>
        </template>
        
        <div class="space-y-2">
          <!-- Bulk actions inside playing -->
          <div v-if="queueStore.playing.length > 0" class="flex justify-between items-center pb-1 border-b border-white/5 mb-2">
            <span class="text-[10px] text-gray-500 font-mono">Daftar Pemain Aktif</span>
            <UiLqButton
              variant="ghost"
              size="sm"
              :loading="actionLoading.bulkComplete"
              class="!py-0.5 !px-2 text-[10px] !font-semibold text-primary hover:text-white"
              @click="handleBulkComplete"
            >
              Selesai Match (Bulk)
            </UiLqButton>
          </div>

          <!-- Empty state -->
          <div v-if="queueStore.playing.length === 0" class="text-center py-4 text-xs text-gray-500 italic">
            Tidak ada pemain yang sedang bermain
          </div>

          <!-- Item list -->
          <div
            v-for="(item, idx) in queueStore.playing"
            :key="item.id"
            class="flex items-center justify-between bg-white/[0.02] border border-white/5 hover:border-white/10 rounded p-2 transition-all"
          >
            <div class="flex-1 min-w-0 pr-2">
              <div class="flex items-center gap-1.5 flex-wrap">
                <span class="text-[10px] font-semibold text-primary">#{{ idx + 1 }}</span>
                <!-- Editable Name -->
                <div @dblclick="startEdit(item.id, 'viewer_name', item.viewer_name)" class="inline-block cursor-text">
                  <input
                    v-if="editingId === item.id && editingField === 'viewer_name'"
                    v-model="editValue"
                    @blur="saveEdit(item)"
                    @keyup.enter="saveEdit(item)"
                    @keyup.esc="cancelEdit"
                    ref="editInput"
                    class="bg-white/10 text-xs text-white rounded px-1 max-w-[100px] outline-none border border-primary/50"
                  />
                  <span v-else class="text-xs font-bold text-white truncate max-w-[120px] block hover:text-primary transition-colors" title="Double click untuk edit">
                    {{ item.viewer_name }}
                  </span>
                </div>
                <UiLqBadge v-if="item.priority_level === 2" variant="fast-track" class="scale-90">Fast</UiLqBadge>
              </div>
              
              <div class="flex items-center gap-1.5 mt-1 text-[10px] text-gray-500 flex-wrap">
                <!-- Editable Game ID -->
                <div @dblclick="startEdit(item.id, 'game_id', item.game_id)" class="cursor-text">
                  <input
                    v-if="editingId === item.id && editingField === 'game_id'"
                    v-model="editValue"
                    @blur="saveEdit(item)"
                    @keyup.enter="saveEdit(item)"
                    @keyup.esc="cancelEdit"
                    ref="editInput"
                    class="bg-white/10 text-[10px] text-white rounded px-1 max-w-[80px] outline-none border border-primary/50"
                  />
                  <span v-else class="hover:text-primary transition-colors" title="Double click untuk edit ID">{{ item.game_id }}</span>
                </div>
                <span>&middot;</span>
                <!-- Editable Quota -->
                <div @dblclick="startEdit(item.id, 'total_quota', item.total_quota)" class="cursor-text flex items-center gap-0.5">
                  <input
                    v-if="editingId === item.id && editingField === 'total_quota'"
                    v-model="editValue"
                    type="number"
                    @blur="saveEdit(item)"
                    @keyup.enter="saveEdit(item)"
                    @keyup.esc="cancelEdit"
                    ref="editInput"
                    class="bg-white/10 text-[10px] text-white rounded px-1 w-10 text-center outline-none border border-primary/50"
                  />
                  <span v-else class="hover:text-primary transition-colors" title="Double click untuk edit kuota">Sisa {{ item.total_quota }} Match</span>
                </div>
              </div>
            </div>

            <!-- Contextual Actions -->
            <div class="flex items-center gap-1.5">
              <UiLqButton
                variant="primary"
                size="sm"
                :loading="actionLoading[item.id] === 'complete'"
                class="!py-1 !px-2 text-[10px]"
                @click="handleCompleteMatch(item.id)"
              >
                Selesai
              </UiLqButton>
              <UiLqButton
                variant="ghost"
                size="sm"
                :loading="actionLoading[item.id] === 'park'"
                class="!py-1 !px-2 text-[10px]"
                @click="handleUpdateStatus(item.id, 'PARKED')"
              >
                Park
              </UiLqButton>
            </div>
          </div>
        </div>
      </UiLqCollapsible>

      <!-- 2. WAITING SECTION -->
      <UiLqCollapsible :defaultOpen="true" :count="sortedWaiting.length">
        <template #title>
          <span class="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
            Waiting List
          </span>
        </template>
        
        <div class="space-y-2">
          <!-- Empty state -->
          <div v-if="sortedWaiting.length === 0" class="text-center py-5 text-xs text-gray-500">
            <div>Belum ada antrean.</div>
            <div class="text-[10px] text-gray-600 mt-1">Ketik nama viewer di atas untuk memulai.</div>
          </div>

          <!-- Item list -->
          <div
            v-for="(item, idx) in sortedWaiting"
            :key="item.id"
            class="flex items-center justify-between bg-white/[0.02] border border-white/5 hover:border-white/10 rounded p-2 transition-all"
          >
            <div class="flex-1 min-w-0 pr-2">
              <div class="flex items-center gap-1.5 flex-wrap">
                <span class="text-[10px] font-mono text-gray-400">#{{ idx + 1 }}</span>
                <!-- Editable Name -->
                <div @dblclick="startEdit(item.id, 'viewer_name', item.viewer_name)" class="inline-block cursor-text">
                  <input
                    v-if="editingId === item.id && editingField === 'viewer_name'"
                    v-model="editValue"
                    @blur="saveEdit(item)"
                    @keyup.enter="saveEdit(item)"
                    @keyup.esc="cancelEdit"
                    ref="editInput"
                    class="bg-white/10 text-xs text-white rounded px-1 max-w-[100px] outline-none border border-primary/50"
                  />
                  <span v-else class="text-xs font-semibold text-white truncate max-w-[120px] block hover:text-primary transition-colors" title="Double click untuk edit">
                    {{ item.viewer_name }}
                  </span>
                </div>
                <!-- Priority Toggle -->
                <button
                  @click="togglePriority(item)"
                  class="text-xs transition-transform hover:scale-110 active:scale-95"
                  title="Toggle priority (Normal / Fast Track)"
                >
                  <span v-if="item.priority_level === 2" class="text-amber-400 text-[11px] block">⭐ Fast</span>
                  <span v-else class="text-gray-600 hover:text-amber-400/50 text-[11px] block">☆ Normal</span>
                </button>
              </div>

              <div class="flex items-center gap-1.5 mt-1 text-[10px] text-gray-500 flex-wrap">
                <!-- Editable Game ID -->
                <div @dblclick="startEdit(item.id, 'game_id', item.game_id)" class="cursor-text">
                  <input
                    v-if="editingId === item.id && editingField === 'game_id'"
                    v-model="editValue"
                    @blur="saveEdit(item)"
                    @keyup.enter="saveEdit(item)"
                    @keyup.esc="cancelEdit"
                    ref="editInput"
                    class="bg-white/10 text-[10px] text-white rounded px-1 max-w-[80px] outline-none border border-primary/50"
                  />
                  <span v-else class="hover:text-primary transition-colors" title="Double click untuk edit ID">{{ item.game_id }}</span>
                </div>
                <span>&middot;</span>
                <!-- Editable Quota -->
                <div @dblclick="startEdit(item.id, 'total_quota', item.total_quota)" class="cursor-text flex items-center gap-0.5">
                  <input
                    v-if="editingId === item.id && editingField === 'total_quota'"
                    v-model="editValue"
                    type="number"
                    @blur="saveEdit(item)"
                    @keyup.enter="saveEdit(item)"
                    @keyup.esc="cancelEdit"
                    ref="editInput"
                    class="bg-white/10 text-[10px] text-white rounded px-1 w-10 text-center outline-none border border-primary/50"
                  />
                  <span v-else class="hover:text-primary transition-colors" title="Double click untuk edit kuota">Sisa {{ item.total_quota }} Match</span>
                </div>
              </div>
            </div>

            <!-- Contextual Actions -->
            <div class="flex items-center gap-1">
              <UiLqButton
                variant="secondary"
                size="sm"
                :loading="actionLoading[item.id] === 'play'"
                class="!py-1 !px-2 text-[10px] !bg-secondary/70 hover:!bg-secondary"
                @click="handleUpdateStatus(item.id, 'PLAYING')"
              >
                Play
              </UiLqButton>
              <UiLqButton
                variant="ghost"
                size="sm"
                :loading="actionLoading[item.id] === 'park'"
                class="!py-1 !px-1.5 text-[10px]"
                @click="handleUpdateStatus(item.id, 'PARKED')"
                title="Simpan ke Parked"
              >
                Park
              </UiLqButton>
              <button
                :disabled="actionLoading[item.id] === 'delete'"
                class="text-gray-500 hover:text-red-400 p-1.5 transition-colors"
                @click="handleDelete(item.id)"
                title="Hapus antrean"
              >
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </UiLqCollapsible>

      <!-- 3. PARKED SECTION -->
      <UiLqCollapsible :defaultOpen="false" :count="queueStore.parked.length">
        <template #title>
          <span class="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
            Parked List
          </span>
        </template>
        
        <div class="space-y-2">
          <!-- Empty state -->
          <div v-if="queueStore.parked.length === 0" class="text-center py-4 text-xs text-gray-600 italic">
            Tidak ada antrean terparkir
          </div>

          <!-- Item list -->
          <div
            v-for="item in queueStore.parked"
            :key="item.id"
            class="flex items-center justify-between bg-white/[0.01] border border-white/5 hover:border-white/10 rounded p-2 transition-all"
          >
            <div class="flex-1 min-w-0 pr-2">
              <div class="flex items-center gap-1.5 flex-wrap">
                <!-- Editable Name -->
                <div @dblclick="startEdit(item.id, 'viewer_name', item.viewer_name)" class="inline-block cursor-text">
                  <input
                    v-if="editingId === item.id && editingField === 'viewer_name'"
                    v-model="editValue"
                    @blur="saveEdit(item)"
                    @keyup.enter="saveEdit(item)"
                    @keyup.esc="cancelEdit"
                    ref="editInput"
                    class="bg-white/10 text-xs text-white rounded px-1 max-w-[100px] outline-none border border-primary/50"
                  />
                  <span v-else class="text-xs font-medium text-gray-300 truncate max-w-[120px] block hover:text-primary transition-colors">
                    {{ item.viewer_name }}
                  </span>
                </div>
                <UiLqBadge v-if="item.priority_level === 2" variant="fast-track" class="scale-90 opacity-70">Fast</UiLqBadge>
              </div>

              <div class="flex items-center gap-1.5 mt-1 text-[10px] text-gray-600 flex-wrap">
                <!-- Editable Game ID -->
                <div @dblclick="startEdit(item.id, 'game_id', item.game_id)" class="cursor-text">
                  <input
                    v-if="editingId === item.id && editingField === 'game_id'"
                    v-model="editValue"
                    @blur="saveEdit(item)"
                    @keyup.enter="saveEdit(item)"
                    @keyup.esc="cancelEdit"
                    ref="editInput"
                    class="bg-white/10 text-[10px] text-white rounded px-1 max-w-[80px] outline-none border border-primary/50"
                  />
                  <span v-else class="hover:text-primary transition-colors">{{ item.game_id }}</span>
                </div>
                <span>&middot;</span>
                <!-- Editable Quota -->
                <div @dblclick="startEdit(item.id, 'total_quota', item.total_quota)" class="cursor-text flex items-center gap-0.5">
                  <input
                    v-if="editingId === item.id && editingField === 'total_quota'"
                    v-model="editValue"
                    type="number"
                    @blur="saveEdit(item)"
                    @keyup.enter="saveEdit(item)"
                    @keyup.esc="cancelEdit"
                    ref="editInput"
                    class="bg-white/10 text-[10px] text-white rounded px-1 w-10 text-center outline-none border border-primary/50"
                  />
                  <span v-else class="hover:text-primary transition-colors">Sisa {{ item.total_quota }} Match</span>
                </div>
              </div>
            </div>

            <!-- Contextual Actions -->
            <div class="flex items-center gap-1">
              <UiLqButton
                variant="ghost"
                size="sm"
                :loading="actionLoading[item.id] === 'play'"
                class="!py-1 !px-2 text-[10px] text-primary border-primary/20 hover:border-primary/50 hover:bg-primary/5"
                @click="handleUpdateStatus(item.id, 'WAITING')"
              >
                Wake
              </UiLqButton>
              <button
                :disabled="actionLoading[item.id] === 'delete'"
                class="text-gray-600 hover:text-red-400 p-1.5 transition-colors"
                @click="handleDelete(item.id)"
                title="Hapus antrean"
              >
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </UiLqCollapsible>
    </div>

    <!-- Master Actions / End Stream at Bottom -->
    <div class="fixed bottom-0 left-0 right-0 p-3 bg-black/95 border-t border-white/10 z-40 max-w-[400px] mx-auto">
      <UiLqButton
        variant="danger"
        size="md"
        :loading="actionLoading.endSession"
        class="w-full !bg-red-950/40 hover:!bg-red-900 border border-red-800/40 text-red-300 font-semibold"
        @click="handleEndSession"
      >
        Akhiri Sesi (End Stream)
      </UiLqButton>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'obs',
})

useHead({
  title: 'OBS Dashboard - LobbyQ',
})

const authStore = useAuthStore()
const queueStore = useQueueStore()
const { showToast } = useToast()

// Form state
const form = reactive({
  viewer_name: '',
  game_id: '',
  total_quota: 1,
  is_fast_track: false,
})

// Editing state
const editingId = ref<string | null>(null)
const editingField = ref<'viewer_name' | 'game_id' | 'total_quota' | null>(null)
const editValue = ref('')
const editInput = ref<HTMLInputElement[] | null>(null)

// Focus edit input automatically
watch(editingId, async (val) => {
  if (val) {
    await nextTick()
    if (editInput.value && editInput.value[0]) {
      editInput.value[0].focus()
      editInput.value[0].select()
    }
  }
})

const startEdit = (id: string, field: 'viewer_name' | 'game_id' | 'total_quota', value: any) => {
  editingId.value = id
  editingField.value = field
  editValue.value = String(value)
}

const cancelEdit = () => {
  editingId.value = null
  editingField.value = null
}

const saveEdit = async (item: QueueItem) => {
  if (!editingId.value || !editingField.value) return
  const id = editingId.value
  const field = editingField.value
  const newValue = editValue.value.trim()

  cancelEdit() // Close edit layout immediately for responsiveness

  // If unchanged, do nothing
  if (String((item as any)[field]) === newValue) return

  try {
    const payload: any = {}
    if (field === 'total_quota') {
      payload[field] = parseInt(newValue, 10) || 1
    } else {
      payload[field] = newValue
    }
    
    await queueStore.updateQueue(id, payload)
    showToast({ type: 'success', message: 'Antrean berhasil diperbarui' })
  } catch (err: any) {
    showToast({ type: 'error', message: err?.data?.message || 'Gagal memperbarui antrean' })
  }
}

// Action loading tracking
const actionLoading = reactive<Record<string, any>>({
  add: false,
  bulkComplete: false,
  endSession: false,
})

// Fetch profiles and queues
onMounted(async () => {
  try {
    if (!authStore.streamer) {
      await authStore.fetchProfile()
    }
    await queueStore.fetchQueues()
  } catch {
    showToast({ type: 'error', message: 'Gagal memuat profil atau antrean' })
  }
})

// Sorting computation for waiting queue (Priority level desc, then FIFO created_at asc)
const sortedWaiting = computed(() => {
  return [...queueStore.waiting].sort((a, b) => {
    // Priority level (2 is Fast Track, 1 is Normal)
    if (b.priority_level !== a.priority_level) {
      return b.priority_level - a.priority_level
    }
    // Created_at ASC (older items first)
    return new Date(a.created_at || 0).getTime() - new Date(b.created_at || 0).getTime()
  })
})

const handleAddQueue = async () => {
  if (!form.viewer_name.trim() || !form.game_id.trim()) return
  actionLoading.add = true
  try {
    const payload = {
      viewer_name: form.viewer_name.trim(),
      game_id: form.game_id.trim(),
      total_quota: form.total_quota,
      priority_level: form.is_fast_track ? 2 : 1,
    }
    const res = await queueStore.addQueue(payload)
    if (res.success) {
      showToast({ type: 'success', message: `Viewer "${form.viewer_name}" berhasil ditambahkan` })
      form.viewer_name = ''
      form.game_id = ''
      form.total_quota = 1
      form.is_fast_track = false
    }
  } catch (err: any) {
    showToast({ type: 'error', message: err?.data?.message || 'Gagal menambahkan viewer' })
  } finally {
    actionLoading.add = false
  }
}

const togglePriority = async (item: QueueItem) => {
  try {
    const newLevel = item.priority_level === 2 ? 1 : 2
    await queueStore.updateQueue(item.id, { priority_level: newLevel })
    showToast({
      type: 'success',
      message: `Status prioritas "${item.viewer_name}" diubah`
    })
  } catch (err: any) {
    showToast({ type: 'error', message: err?.data?.message || 'Gagal mengubah prioritas' })
  }
}

const handleUpdateStatus = async (id: string, status: QueueItem['status']) => {
  actionLoading[id] = status === 'PLAYING' ? 'play' : 'park'
  try {
    await queueStore.updateQueue(id, { status })
    showToast({ type: 'success', message: `Status berhasil diubah ke ${status}` })
  } catch (err: any) {
    showToast({ type: 'error', message: err?.data?.message || 'Gagal memperbarui status' })
  } finally {
    actionLoading[id] = null
  }
}

const handleCompleteMatch = async (id: string) => {
  actionLoading[id] = 'complete'
  try {
    await queueStore.matchComplete(id)
    showToast({ type: 'success', message: 'Match selesai dicatat' })
  } catch (err: any) {
    showToast({ type: 'error', message: err?.data?.message || 'Gagal mencatat penyelesaian match' })
  } finally {
    actionLoading[id] = null
  }
}

const handleBulkComplete = async () => {
  if (queueStore.playing.length === 0) return
  actionLoading.bulkComplete = true
  try {
    const ids = queueStore.playing.map((q) => q.id)
    await queueStore.bulkMatchComplete(ids)
    showToast({ type: 'success', message: 'Seluruh match aktif berhasil diselesaikan' })
  } catch (err: any) {
    showToast({ type: 'error', message: err?.data?.message || 'Gagal menyelesaikan match bulk' })
  } finally {
    actionLoading.bulkComplete = false
  }
}

const handleDelete = async (id: string) => {
  actionLoading[id] = 'delete'
  try {
    await queueStore.deleteQueue(id)
    showToast({ type: 'success', message: 'Antrean berhasil dihapus' })
  } catch (err: any) {
    showToast({ type: 'error', message: err?.data?.message || 'Gagal menghapus antrean' })
  } finally {
    actionLoading[id] = null
  }
}

const handleEndSession = async () => {
  if (confirm('Apakah Anda yakin ingin mengakhiri sesi? Semua antrean aktif akan dipindahkan ke Parked.')) {
    actionLoading.endSession = true
    try {
      await queueStore.endSession()
      showToast({ type: 'success', message: 'Sesi diakhiri. Seluruh antrean dipindahkan ke Parked.' })
    } catch (err: any) {
      showToast({ type: 'error', message: err?.data?.message || 'Gagal mengakhiri sesi' })
    } finally {
      actionLoading.endSession = false
    }
  }
}

const handleLogout = () => {
  authStore.logout()
  navigateTo('/login')
}
</script>
