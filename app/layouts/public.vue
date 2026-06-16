<template>
  <div class="min-h-screen bg-surface-deeper scroll-smooth">
    <!-- Sticky Streamer Header -->
    <div
      v-if="streamer"
      class="sticky top-0 z-50 backdrop-blur-md bg-surface-deeper/90 border-b border-white/5"
    >
      <div class="max-w-lg mx-auto px-4 py-3 flex items-center gap-3">
        <img
          v-if="streamer.avatar_url"
          :src="streamer.avatar_url"
          :alt="streamer.name"
          class="w-10 h-10 rounded-full object-cover border-2 border-primary/30"
        />
        <div
          v-else
          class="w-10 h-10 rounded-full bg-secondary flex items-center justify-center"
        >
          <span class="text-white font-bold text-sm">{{ streamer.name?.charAt(0)?.toUpperCase() }}</span>
        </div>
        <div class="flex-1 min-w-0">
          <h1 class="text-white font-semibold text-sm truncate">{{ streamer.name }}</h1>
          <span class="text-xs text-gray-400">@{{ streamer.username }}</span>
        </div>
        <button
          class="p-2 rounded-lg hover:bg-white/5 transition-colors"
          title="Bagikan link"
          @click="shareLink"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Main Content -->
    <main class="max-w-lg mx-auto px-4 pb-8">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
interface StreamerProfile {
  name?: string
  username?: string
  avatar_url?: string
}

const props = defineProps<{
  streamer?: StreamerProfile | null
}>()

const shareLink = async () => {
  if (!props.streamer?.username) return
  const url = `${window.location.origin}/q/${props.streamer.username}`
  if (navigator.share) {
    try {
      await navigator.share({ title: `Antrean ${props.streamer.name}`, url })
    } catch { /* user cancelled */ }
  } else {
    await navigator.clipboard.writeText(url)
  }
}
</script>
