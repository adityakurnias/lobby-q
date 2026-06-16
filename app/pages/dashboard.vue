<template>
  <div class="min-h-screen bg-surface-deeper text-[var(--color-text-primary)] font-sans select-none pb-28">
    <!-- Top Header -->
    <div class="flex items-center justify-between border-b-[1.5px] border-retro px-3 py-3 mb-4 bg-surface-dark/40">
      <div class="flex items-center gap-2.5">
        <div class="w-8 h-8 rounded-[6px] bg-primary flex items-center justify-center border border-retro shadow-soft">
          <span class="text-white font-black text-xs font-display">LQ</span>
        </div>
        <div class="min-w-0">
          <h1 class="text-xs font-black truncate uppercase tracking-wider font-display">{{ authStore.streamer?.name || 'Dashboard Streamer' }}</h1>
          <a
            v-if="authStore.streamer?.username"
            :href="`/q/${authStore.streamer.username}`"
            target="_blank"
            class="text-[10px] text-secondary hover:underline flex items-center gap-1 font-mono font-bold"
          >
            <span>/q/{{ authStore.streamer.username }}</span>
            <svg class="w-2.5 h-2.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button
          @click="startTour"
          class="text-[9px] font-mono font-bold text-[var(--color-text-tertiary)] hover:text-secondary transition-colors px-2 py-1 border border-retro rounded-[6px] hover:bg-retro/[0.05]"
          title="Mulai Tour"
        >
          TOUR
        </button>
        <button
          @click="handleLogout"
          class="text-[9px] font-mono font-bold text-[var(--color-text-tertiary)] hover:text-primary transition-colors px-2 py-1 border border-retro rounded-[6px] hover:bg-retro/[0.05]"
          title="Logout"
        >
          LOGOUT
        </button>
      </div>
    </div>

    <!-- Add Queue Form -->
    <div id="tour-add-queue" class="bg-surface-dark border-[1.5px] border-retro rounded-[10px] p-3 mx-3 mb-4 space-y-3 font-mono">
      <div class="text-[9px] font-bold text-[var(--color-text-tertiary)] uppercase tracking-wider">Tambah Antrean</div>
      <form @submit.prevent="handleAddQueue" class="space-y-2">
        <div class="grid grid-cols-2 gap-2">
          <input
            v-model="form.viewer_name"
            type="text"
            placeholder="NAMA VIEWER"
            class="bg-surface-deeper border-[1.5px] border-retro rounded-[6px] px-2.5 py-2 text-xs text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/10 font-sans font-bold"
            required
          />
          <input
            v-model="form.game_id"
            type="text"
            placeholder="GAME ID"
            class="bg-surface-deeper border-[1.5px] border-retro rounded-[6px] px-2.5 py-2 text-xs text-[var(--color-text-primary)] placeholder:text-[var(--color-text-tertiary)] focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/10 font-mono font-bold"
            required
          />
        </div>
        <div class="flex items-center justify-between gap-2 pt-1">
          <div class="flex items-center gap-1.5 shrink-0">
            <span class="text-[9px] text-[var(--color-text-tertiary)] font-bold uppercase">Kuota:</span>
            <input
              v-model.number="form.total_quota"
              type="number"
              min="1" max="20"
              class="w-11 bg-surface-deeper border-[1.5px] border-retro rounded-[6px] py-1 text-center text-xs text-[var(--color-text-primary)] focus:outline-none focus:border-secondary font-mono font-bold"
              required
            />
          </div>
          <label class="flex items-center gap-1.5 cursor-pointer select-none shrink-0">
            <input
              v-model="form.is_fast_track"
              type="checkbox"
              class="rounded-[4px] border-retro bg-surface-deeper text-primary focus:ring-primary/20 focus:ring-offset-0 w-3.5 h-3.5"
            />
            <span class="text-[9px] text-primary font-bold uppercase tracking-wider">Fast Track</span>
          </label>
          <UiLqButton
            variant="primary"
            size="sm"
            :loading="actionLoading.add"
            class="uppercase font-bold text-[9px] tracking-wider"
          >
            Tambah
          </UiLqButton>
        </div>
      </form>
    </div>

    <!-- Stats Section (Border-based layout) -->
    <div id="tour-stats" class="grid grid-cols-3 gap-2 px-3 mb-4 font-mono">
      <div class="border-[1.5px] border-retro bg-surface rounded-[10px] py-2.5 text-center shadow-soft">
        <div class="text-[8px] text-[var(--color-text-tertiary)] font-bold uppercase tracking-wider">Playing</div>
        <div class="text-lg font-black text-secondary mt-1">{{ queueStore.totalPlaying }}</div>
      </div>
      <div class="border-[1.5px] border-retro bg-surface rounded-[10px] py-2.5 text-center shadow-soft">
        <div class="text-[8px] text-[var(--color-text-tertiary)] font-bold uppercase tracking-wider">Waiting</div>
        <div class="text-lg font-black text-retro mt-1">{{ queueStore.totalWaiting }}</div>
      </div>
      <div class="border-[1.5px] border-retro bg-surface rounded-[10px] py-2.5 text-center shadow-soft">
        <div class="text-[8px] text-[var(--color-text-tertiary)] font-bold uppercase tracking-wider">Parked</div>
        <div class="text-lg font-black text-[var(--color-text-tertiary)] mt-1">{{ queueStore.totalParked }}</div>
      </div>
    </div>

    <!-- Queue Sections -->
    <div class="space-y-4 px-3">
      <!-- PLAYING SECTION -->
      <UiLqCollapsible id="tour-playing" :defaultOpen="true" :count="queueStore.playing.length">
        <template #title>
          <span class="text-[10px] font-black text-secondary uppercase tracking-widest flex items-center gap-1.5 font-display">
            <span class="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
            Playing
          </span>
        </template>

        <div class="space-y-2.5 mt-2.5">
          <div v-if="queueStore.playing.length > 0" class="flex justify-between items-center pb-2 border-b border-retro">
            <span class="text-[8px] text-[var(--color-text-tertiary)] font-mono font-bold uppercase tracking-widest">Daftar Pemain Aktif</span>
            <UiLqButton
              variant="ghost"
              size="sm"
              :loading="actionLoading.bulkComplete"
              class="!text-[8px] !font-bold !text-secondary hover:!text-retro uppercase !px-2 !py-0.5"
              @click="handleBulkComplete"
            >
              Selesai Match (Bulk)
            </UiLqButton>
          </div>

          <div v-if="queueStore.playing.length === 0" class="text-center py-5 text-[10px] text-[var(--color-text-tertiary)] font-mono uppercase tracking-wider italic">
            Tidak ada pemain yang sedang bermain
          </div>

          <TransitionGroup name="list" tag="div" class="space-y-2">
            <div
              v-for="(item, idx) in queueStore.playing"
              :key="item.id"
              class="flex items-center justify-between bg-surface border border-retro hover:border-primary/40 rounded-[10px] p-2 transition-all duration-300"
            >
              <div class="flex-1 min-w-0 pr-1.5">
                <div class="flex items-center gap-1.5 flex-wrap">
                  <span class="text-[9px] font-mono font-bold text-secondary">#0{{ idx + 1 }}</span>
                  <div @dblclick="startEdit(item.id, 'viewer_name', item.viewer_name)" class="inline-block cursor-text">
                    <input
                      v-if="editingId === item.id && editingField === 'viewer_name'"
                      v-model="editValue"
                      @blur="saveEdit(item)"
                      @keyup.enter="saveEdit(item)"
                      @keyup.esc="cancelEdit"
                      ref="editInput"
                      class="bg-surface-deeper text-[10px] font-display font-bold text-[var(--color-text-primary)] rounded px-1.5 py-0.5 max-w-[100px] outline-none border border-secondary/40 font-bold"
                    />
                    <span v-else class="text-[11px] font-display font-bold text-retro truncate max-w-[120px] block hover:text-secondary transition-colors" title="Double click untuk edit">
                      {{ item.viewer_name }}
                    </span>
                  </div>
                  <UiLqBadge v-if="item.priority_level === 2" variant="fast-track">⭐ Fast Track</UiLqBadge>
                </div>

                <div class="flex items-center gap-1.5 mt-1 text-[9px] text-[var(--color-text-tertiary)] font-mono font-bold uppercase tracking-wider flex-wrap">
                  <div @dblclick="startEdit(item.id, 'game_id', item.game_id)" class="cursor-text text-[8px] font-bold">
                    <input
                      v-if="editingId === item.id && editingField === 'game_id'"
                      v-model="editValue"
                      @blur="saveEdit(item)"
                      @keyup.enter="saveEdit(item)"
                      @keyup.esc="cancelEdit"
                      ref="editInput"
                      class="bg-surface-deeper text-[10px] text-[var(--color-text-primary)] rounded px-1 py-0.5 max-w-[90px] outline-none border border-secondary/40 font-mono"
                    />
                    <span v-else class="hover:text-secondary transition-colors" title="Double click untuk edit ID">{{ item.game_id }}</span>
                  </div>
                  <span>&middot;</span>
                  <div @dblclick="startEdit(item.id, 'total_quota', item.total_quota)" class="cursor-text">
                    <input
                      v-if="editingId === item.id && editingField === 'total_quota'"
                      v-model="editValue"
                      type="number"
                      @blur="saveEdit(item)"
                      @keyup.enter="saveEdit(item)"
                      @keyup.esc="cancelEdit"
                      ref="editInput"
                      class="bg-surface-deeper text-[10px] text-[var(--color-text-primary)] rounded px-1 py-0.5 w-10 text-center outline-none border border-secondary/45 font-bold"
                    />
                    <span v-else class="hover:text-secondary transition-colors" title="Double click untuk edit kuota">Sisa {{ item.total_quota }} Match</span>
                  </div>
                </div>
              </div>

              <div class="flex items-center gap-1 shrink-0 font-mono">
                <UiLqButton
                  variant="primary"
                  size="sm"
                  :loading="actionLoading[item.id] === 'complete'"
                  class="!text-[8px] !px-2 !py-1 font-bold uppercase"
                  @click="handleCompleteMatch(item.id)"
                >
                  Selesai
                </UiLqButton>
                <UiLqButton
                  variant="secondary"
                  size="sm"
                  :loading="actionLoading[item.id] === 'park'"
                  class="!text-[8px] !px-1.5 !py-1 font-bold uppercase"
                  @click="handleUpdateStatus(item.id, 'PARKED')"
                >
                  Pause
                </UiLqButton>
              </div>
            </div>
          </TransitionGroup>
        </div>
      </UiLqCollapsible>

      <!-- WAITING SECTION -->
      <UiLqCollapsible id="tour-waiting" :defaultOpen="true" :count="sortedWaiting.length">
        <template #title>
          <span class="text-[10px] font-black text-retro uppercase tracking-widest flex items-center gap-1.5 font-display">
            Waiting List
          </span>
        </template>

        <div class="space-y-2.5 mt-2.5">
          <div v-if="sortedWaiting.length === 0" class="text-center py-6 text-[10px] font-mono uppercase tracking-wider text-[var(--color-text-tertiary)] font-bold">
            <div>Belum ada antrean.</div>
            <div class="text-[9px] text-[var(--color-text-tertiary)] mt-1 font-normal uppercase">Ketik nama viewer di atas untuk memulai.</div>
          </div>

          <TransitionGroup name="list" tag="div" class="space-y-2">
            <div
              v-for="(item, idx) in sortedWaiting"
              :key="item.id"
              class="flex items-center justify-between bg-surface border border-retro hover:border-primary/40 rounded-[10px] p-2 transition-all duration-300"
            >
              <div class="flex-1 min-w-0 pr-1.5">
                <div class="flex items-center gap-1.5 flex-wrap">
                  <span class="text-[9px] font-mono font-bold text-[var(--color-text-tertiary)] w-4 text-center">#0{{ idx + 1 }}</span>
                  <div @dblclick="startEdit(item.id, 'viewer_name', item.viewer_name)" class="inline-block cursor-text">
                    <input
                      v-if="editingId === item.id && editingField === 'viewer_name'"
                      v-model="editValue"
                      @blur="saveEdit(item)"
                      @keyup.enter="saveEdit(item)"
                      @keyup.esc="cancelEdit"
                      ref="editInput"
                      class="bg-surface-deeper text-[10px] font-display font-bold text-[var(--color-text-primary)] rounded px-1.5 py-0.5 max-w-[100px] outline-none border border-secondary/40 font-bold"
                    />
                    <span v-else class="text-[11px] font-display font-bold text-retro truncate max-w-[120px] block hover:text-secondary transition-colors" title="Double click untuk edit">
                      {{ item.viewer_name }}
                    </span>
                  </div>
                  <button
                    @click="togglePriority(item)"
                    class="transition-transform hover:scale-105 active:scale-95 shrink-0"
                    title="Toggle priority"
                  >
                    <UiLqBadge v-if="item.priority_level === 2" variant="fast-track">⭐ Fast Track</UiLqBadge>
                    <span v-else class="text-[8px] border border-retro text-[var(--color-text-tertiary)] hover:text-primary hover:border-primary/20 px-2 py-0.5 rounded-[4px] font-mono font-bold uppercase tracking-wider bg-transparent">Normal</span>
                  </button>
                </div>

                <div class="flex items-center gap-1.5 mt-1 text-[9px] text-[var(--color-text-tertiary)] font-mono font-bold uppercase tracking-wider flex-wrap">
                  <div @dblclick="startEdit(item.id, 'game_id', item.game_id)" class="cursor-text text-[8px] font-bold">
                    <input
                      v-if="editingId === item.id && editingField === 'game_id'"
                      v-model="editValue"
                      @blur="saveEdit(item)"
                      @keyup.enter="saveEdit(item)"
                      @keyup.esc="cancelEdit"
                      ref="editInput"
                      class="bg-surface-deeper text-[10px] text-[var(--color-text-primary)] rounded px-1 py-0.5 max-w-[90px] outline-none border border-secondary/40 font-mono"
                    />
                    <span v-else class="hover:text-secondary transition-colors" title="Double click untuk edit ID">{{ item.game_id }}</span>
                  </div>
                  <span>&middot;</span>
                  <div @dblclick="startEdit(item.id, 'total_quota', item.total_quota)" class="cursor-text">
                    <input
                      v-if="editingId === item.id && editingField === 'total_quota'"
                      v-model="editValue"
                      type="number"
                      @blur="saveEdit(item)"
                      @keyup.enter="saveEdit(item)"
                      @keyup.esc="cancelEdit"
                      ref="editInput"
                      class="bg-surface-deeper text-[10px] text-[var(--color-text-primary)] rounded px-1 py-0.5 w-10 text-center outline-none border border-secondary/40 font-bold"
                    />
                    <span v-else class="hover:text-secondary transition-colors" title="Double click untuk edit kuota">Sisa {{ item.total_quota }} Match</span>
                  </div>
                </div>
              </div>

              <div class="flex items-center gap-1 shrink-0 font-mono">
                <UiLqButton
                  variant="secondary"
                  size="sm"
                  :loading="actionLoading[item.id] === 'play'"
                  class="!text-[8px] !px-2 !py-1 font-bold uppercase"
                  @click="handleUpdateStatus(item.id, 'PLAYING')"
                >
                  Play
                </UiLqButton>
                <UiLqButton
                  variant="ghost"
                  size="sm"
                  :loading="actionLoading[item.id] === 'park'"
                  class="!text-[8px] !px-1.5 !py-1 font-bold uppercase"
                  @click="handleUpdateStatus(item.id, 'PARKED')"
                  title="Pause User"
                >
                  Pause
                </UiLqButton>
                <button
                  :disabled="actionLoading[item.id] === 'delete'"
                  class="text-[var(--color-text-tertiary)] hover:text-primary p-1.5 transition-colors rounded-[6px] border border-transparent hover:border-retro cursor-pointer shrink-0"
                  @click="handleDelete(item.id)"
                  title="Hapus antrean"
                >
                  <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </TransitionGroup>
        </div>
      </UiLqCollapsible>

      <!-- PARKED SECTION (PAUSED USERS) -->
      <UiLqCollapsible :defaultOpen="false" :count="queueStore.parked.length">
        <template #title>
          <span class="text-[10px] font-black text-[var(--color-text-tertiary)] uppercase tracking-widest flex items-center gap-1.5 font-display">
            Parked List
          </span>
        </template>

        <div class="space-y-2.5 mt-2.5">
          <div v-if="queueStore.parked.length === 0" class="text-center py-5 text-[10px] font-mono uppercase tracking-wider text-[var(--color-text-tertiary)] font-bold italic">
            Tidak ada antrean terparkir
          </div>

          <TransitionGroup name="list" tag="div" class="space-y-2">
            <div
              v-for="item in queueStore.parked"
              :key="item.id"
              class="flex items-center justify-between bg-surface border border-retro hover:border-primary/40 rounded-[10px] p-2 transition-all duration-300 opacity-70 hover:opacity-100"
            >
              <div class="flex-1 min-w-0 pr-1.5">
                <div class="flex items-center gap-1.5 flex-wrap">
                  <div @dblclick="startEdit(item.id, 'viewer_name', item.viewer_name)" class="inline-block cursor-text">
                    <input
                      v-if="editingId === item.id && editingField === 'viewer_name'"
                      v-model="editValue"
                      @blur="saveEdit(item)"
                      @keyup.enter="saveEdit(item)"
                      @keyup.esc="cancelEdit"
                      ref="editInput"
                      class="bg-surface-deeper text-[10px] font-display font-bold text-[var(--color-text-primary)] rounded px-1.5 py-0.5 max-w-[100px] outline-none border border-secondary/40 font-bold"
                    />
                    <span v-else class="text-[11px] font-display font-bold text-[var(--color-text-secondary)] truncate max-w-[120px] block hover:text-secondary transition-colors">
                      {{ item.viewer_name }}
                    </span>
                  </div>
                  <UiLqBadge v-if="item.priority_level === 2" variant="parked">⭐ Fast Track</UiLqBadge>
                </div>

                <div class="flex items-center gap-1.5 mt-1 text-[9px] text-[var(--color-text-tertiary)] font-mono font-bold uppercase tracking-wider flex-wrap">
                  <div @dblclick="startEdit(item.id, 'game_id', item.game_id)" class="cursor-text text-[8px] font-bold">
                    <input
                      v-if="editingId === item.id && editingField === 'game_id'"
                      v-model="editValue"
                      @blur="saveEdit(item)"
                      @keyup.enter="saveEdit(item)"
                      @keyup.esc="cancelEdit"
                      ref="editInput"
                      class="bg-surface-deeper text-[10px] text-[var(--color-text-primary)] rounded px-1 py-0.5 max-w-[90px] outline-none border border-secondary/40 font-mono"
                    />
                    <span v-else class="hover:text-secondary transition-colors">{{ item.game_id }}</span>
                  </div>
                  <span>&middot;</span>
                  <div @dblclick="startEdit(item.id, 'total_quota', item.total_quota)" class="cursor-text">
                    <input
                      v-if="editingId === item.id && editingField === 'total_quota'"
                      v-model="editValue"
                      type="number"
                      @blur="saveEdit(item)"
                      @keyup.enter="saveEdit(item)"
                      @keyup.esc="cancelEdit"
                      ref="editInput"
                      class="bg-surface-deeper text-[10px] text-[var(--color-text-primary)] rounded px-1 py-0.5 w-10 text-center outline-none border border-secondary/40 font-bold"
                    />
                    <span v-else class="hover:text-secondary transition-colors">Sisa {{ item.total_quota }} Match</span>
                  </div>
                </div>
              </div>

              <div class="flex items-center gap-1 shrink-0 font-mono">
                <UiLqButton
                  variant="secondary"
                  size="sm"
                  :loading="actionLoading[item.id] === 'play'"
                  class="!text-[8px] !px-2.5 !py-1 font-bold uppercase"
                  @click="handleUpdateStatus(item.id, 'WAITING')"
                >
                  Wake
                </UiLqButton>
                <button
                  :disabled="actionLoading[item.id] === 'delete'"
                  class="text-[var(--color-text-tertiary)] hover:text-primary p-1.5 transition-colors rounded-[6px] border border-transparent hover:border-retro cursor-pointer shrink-0"
                  @click="handleDelete(item.id)"
                  title="Hapus antrean"
                >
                  <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </TransitionGroup>
        </div>
      </UiLqCollapsible>
    </div>

    <!-- End Session Sticky Action -->
    <div id="tour-end-session" class="fixed bottom-0 left-0 right-0 p-3 bg-surface-deeper border-t-[1.5px] border-retro z-40 max-w-[400px] mx-auto shadow-soft">
      <UiLqButton
        variant="primary"
        size="md"
        :loading="actionLoading.endSession"
        class="w-full font-display font-black text-xs uppercase tracking-widest !py-3 bg-primary text-white hover:bg-primary-light"
        @click="handleEndSession"
      >
        Akhiri Sesi (End Stream)
      </UiLqButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch, nextTick, computed, onMounted } from 'vue'
import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'

definePageMeta({
  layout: 'obs',
})

useHead({
  title: 'OBS Dashboard - LobbyQ',
})

const authStore = useAuthStore()
const queueStore = useQueueStore()
const { showToast } = useToast()

const form = reactive({
  viewer_name: '',
  game_id: '',
  total_quota: 1,
  is_fast_track: false,
})

const editingId = ref<string | null>(null)
const editingField = ref<'viewer_name' | 'game_id' | 'total_quota' | null>(null)
const editValue = ref('')
const editInput = ref<HTMLInputElement[] | null>(null)

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

const saveEdit = async (item: any) => {
  if (!editingId.value || !editingField.value) return
  const id = editingId.value
  const field = editingField.value
  const newValue = editValue.value.trim()

  cancelEdit()

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

const actionLoading = reactive<Record<string, any>>({
  add: false,
  bulkComplete: false,
  endSession: false,
})

const startTour = () => {
  const driverObj = driver({
    showProgress: true,
    progressText: '{{current}} dari {{total}}',
    nextBtnText: 'Lanjut ➔',
    prevBtnText: '⬅ Kembali',
    doneBtnText: 'Selesai ✔',
    popoverClass: 'lq-tour-popover',
    steps: [
      { element: '#tour-add-queue', popover: { title: 'Tambah Antrean', description: 'Di sini Anda bisa menambahkan antrean baru secara manual jika ada viewer yang request di chat.', side: "bottom", align: 'start' }},
      { element: '#tour-stats', popover: { title: 'Statistik Lobby', description: 'Pantau secara realtime jumlah viewer yang sedang bermain, menunggu giliran, atau sedang diparkir sementara.', side: "bottom", align: 'center' }},
      { element: '#tour-playing', popover: { title: 'Daftar Pemain Aktif', description: 'Ini adalah daftar viewer yang saat ini sedang bermain. Anda dapat menyelesaikan match mereka dari sini.', side: "top", align: 'start' }},
      { element: '#tour-waiting', popover: { title: 'Waiting List', description: 'Daftar antrean viewer yang sedang menunggu giliran. Anda dapat memindahkan mereka ke Playing saat giliran mereka tiba.', side: "top", align: 'start' }},
      { popover: { title: 'Edit Cepat (Double Click)', description: 'Anda bisa mengedit Nama Viewer, ID Game, dan Sisa Kuota langsung dengan melakukan klik-ganda (double click) pada teks tersebut. Tekan Enter pada keyboard Anda untuk menyimpan perubahan!', align: 'center' }},
      { element: '#tour-end-session', popover: { title: 'Akhiri Sesi', description: 'Klik tombol ini ketika Anda selesai streaming untuk memindahkan semua antrean aktif ke Parked dengan aman.', side: "top", align: 'center' }},
    ]
  });
  
  driverObj.drive();
}

onMounted(async () => {
  try {
    if (!authStore.streamer) {
      await authStore.fetchProfile()
    }
    await queueStore.fetchQueues()

    // Cek apakah user baru pertama kali membuka dashboard
    const hasSeenTour = localStorage.getItem('lobbyq_tour_seen')
    if (!hasSeenTour) {
      setTimeout(() => {
        startTour()
        localStorage.setItem('lobbyq_tour_seen', 'true')
      }, 500) // Delay sedikit agar UI render sempurna
    }
  } catch {
    showToast({ type: 'error', message: 'Gagal memuat profil atau antrean' })
  }
})

const sortedWaiting = computed(() => {
  return [...queueStore.waiting].sort((a, b) => {
    if (b.priority_level !== a.priority_level) {
      return b.priority_level - a.priority_level
    }
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

const togglePriority = async (item: any) => {
  try {
    const newLevel = item.priority_level === 2 ? 1 : 2
    await queueStore.updateQueue(item.id, { priority_level: newLevel })
    showToast({ type: 'success', message: `Status prioritas "${item.viewer_name}" diubah` })
  } catch (err: any) {
    showToast({ type: 'error', message: err?.data?.message || 'Gagal mengubah prioritas' })
  }
}

const handleUpdateStatus = async (id: string, status: any) => {
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

<style>
/* Custom Driver.js Theme for LobbyQ */
.lq-tour-popover {
  border: 1.5px solid var(--color-border-primary) !important;
  border-radius: 10px !important;
  box-shadow: 4px 4px 0px #111111 !important;
  background-color: #ffffff !important;
  font-family: 'Space Mono', monospace !important;
  padding: 16px !important;
}

.lq-tour-popover .driver-popover-title {
  font-family: 'Outfit', sans-serif !important;
  font-weight: 900 !important;
  font-size: 16px !important;
  text-transform: uppercase !important;
  color: var(--color-text-primary) !important;
  letter-spacing: 0.05em !important;
  margin-bottom: 8px !important;
}

.lq-tour-popover .driver-popover-description {
  font-size: 12px !important;
  line-height: 1.6 !important;
  color: var(--color-text-secondary) !important;
}

.lq-tour-popover .driver-popover-footer button {
  background-color: transparent !important;
  border: 1.5px solid var(--color-border-primary) !important;
  border-radius: 6px !important;
  color: var(--color-text-primary) !important;
  font-weight: bold !important;
  text-transform: uppercase !important;
  text-shadow: none !important;
  padding: 4px 8px !important;
  font-size: 10px !important;
  letter-spacing: 0.05em !important;
  transition: all 0.2s ease;
  box-shadow: 2px 2px 0px #111111 !important;
}

.lq-tour-popover .driver-popover-footer button:hover {
  transform: translateY(-1px);
  box-shadow: 3px 3px 0px #111111 !important;
}

.lq-tour-popover .driver-popover-footer button:active {
  transform: translateY(1px);
  box-shadow: 1px 1px 0px #111111 !important;
}

.lq-tour-popover .driver-popover-progress-text {
  font-weight: bold !important;
  font-size: 10px !important;
  color: var(--color-text-tertiary) !important;
}
</style>
