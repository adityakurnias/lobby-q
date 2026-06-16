import { defineStore } from 'pinia'

export interface QueueItem {
  id: string
  viewer_name: string
  game_id: string
  total_quota: number
  priority_level: number
  status: 'WAITING' | 'PLAYING' | 'PARKED' | 'COMPLETED'
  created_at?: string
}

export interface PublicQueueItem {
  viewer_name: string
  game_id: string
  status: 'WAITING' | 'PLAYING' | 'PARKED'
  remaining_quota: number
}

interface QueueState {
  playing: QueueItem[]
  waiting: QueueItem[]
  parked: QueueItem[]
  loading: boolean
}

export const useQueueStore = defineStore('queue', {
  state: (): QueueState => ({
    playing: [],
    waiting: [],
    parked: [],
    loading: false,
  }),

  getters: {
    totalWaiting: (state) => state.waiting.length,
    totalPlaying: (state) => state.playing.length,
    totalParked: (state) => state.parked.length,
  },

  actions: {
    async fetchQueues() {
      const api = useNuxtApp().$api as typeof $fetch
      this.loading = true
      try {
        const res = await api('/queues', {
          method: 'GET',
        }) as { success: boolean; data: { playing: QueueItem[]; waiting: QueueItem[]; parked: QueueItem[] } }

        if (res.success) {
          this.playing = res.data.playing
          this.waiting = res.data.waiting
          this.parked = res.data.parked
        }
      } finally {
        this.loading = false
      }
    },

    async addQueue(payload: { viewer_name: string; game_id: string; total_quota?: number; priority_level?: number }) {
      const api = useNuxtApp().$api as typeof $fetch
      const res = await api('/queues', {
        method: 'POST',
        body: payload,
      }) as { success: boolean; data: QueueItem }

      if (res.success && res.data) {
        this.waiting.push(res.data)
      }
      return res
    },

    async updateQueue(id: string, payload: Partial<Pick<QueueItem, 'viewer_name' | 'game_id' | 'total_quota' | 'priority_level' | 'status'>>) {
      const api = useNuxtApp().$api as typeof $fetch
      const res = await api(`/queues/${id}`, {
        method: 'PATCH',
        body: payload,
      })
      if ((res as { success: boolean }).success) {
        await this.fetchQueues()
      }
      return res
    },

    async deleteQueue(id: string) {
      const api = useNuxtApp().$api as typeof $fetch
      const res = await api(`/queues/${id}`, {
        method: 'DELETE',
      }) as { success: boolean }

      if (res.success) {
        this.waiting = this.waiting.filter((q) => q.id !== id)
        this.playing = this.playing.filter((q) => q.id !== id)
        this.parked = this.parked.filter((q) => q.id !== id)
      }
      return res
    },

    async matchComplete(id: string) {
      const api = useNuxtApp().$api as typeof $fetch
      const idempotency_key = crypto.randomUUID()
      const res = await api(`/queues/${id}/match-complete`, {
        method: 'POST',
        body: { idempotency_key },
      }) as { success: boolean; data: { remaining_quota: number } }

      if (res.success) {
        await this.fetchQueues()
      }
      return res
    },

    async bulkMatchComplete(queueIds: string[]) {
      const api = useNuxtApp().$api as typeof $fetch
      const players = queueIds.map((queue_id) => ({
        queue_id,
        idempotency_key: crypto.randomUUID(),
      }))
      const res = await api('/queues/bulk-match-complete', {
        method: 'POST',
        body: { players },
      })
      if ((res as { success: boolean }).success) {
        await this.fetchQueues()
      }
      return res
    },

    async endSession() {
      const api = useNuxtApp().$api as typeof $fetch
      const res = await api('/stream/end-session', {
        method: 'POST',
        body: {},
      }) as { success: boolean }

      if (res.success) {
        // Optimistic UI Update: Langsung pindahkan semua antrean aktif ke Parked
        const updatedPlaying = this.playing.map(q => ({ ...q, status: 'PARKED' as const }))
        const updatedWaiting = this.waiting.map(q => ({ ...q, status: 'PARKED' as const }))
        
        this.parked = [...this.parked, ...updatedPlaying, ...updatedWaiting]
        this.playing = []
        this.waiting = []

        // Tetap panggil fetchQueues untuk mensinkronkan data final dari backend
        await this.fetchQueues()
      }
      return res
    },

    handleRealtimeEvent(_data: { type: string }) {
      // When SSE fires a QUEUE_UPDATED event, refetch queues
      this.fetchQueues()
    },
  },
})
