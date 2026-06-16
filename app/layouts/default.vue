<template>
  <div class="min-h-screen bg-surface-deeper">
    <!-- Header -->
    <header class="sticky top-0 z-50 backdrop-blur-md bg-surface-deeper/80 border-b border-white/5">
      <div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-2 group">
          <div class="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span class="text-white font-bold text-sm">LQ</span>
          </div>
          <span class="text-lg font-bold text-white group-hover:text-primary transition-colors">
            LobbyQ
          </span>
        </NuxtLink>

        <nav class="flex items-center gap-4">
          <template v-if="authStore.isLoggedIn">
            <NuxtLink
              to="/dashboard"
              class="text-sm text-gray-300 hover:text-white transition-colors"
            >
              Dashboard
            </NuxtLink>
            <button
              class="text-sm text-gray-400 hover:text-white transition-colors"
              @click="handleLogout"
            >
              Logout
            </button>
          </template>
          <template v-else>
            <NuxtLink to="/login" class="btn-ghost !py-2 !px-4 text-sm">
              Login
            </NuxtLink>
            <NuxtLink to="/register" class="btn-primary !py-2 !px-4 text-sm">
              Daftar
            </NuxtLink>
          </template>
        </nav>
      </div>
    </header>

    <!-- Main Content -->
    <main>
      <slot />
    </main>

    <!-- Footer -->
    <footer class="border-t border-white/5 py-8 mt-20">
      <div class="max-w-6xl mx-auto px-6 text-center">
        <p class="text-sm text-gray-500">
          &copy; {{ new Date().getFullYear() }} LobbyQ. Sistem manajemen antrean mabar untuk streamer.
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore()

const handleLogout = () => {
  authStore.logout()
  navigateTo('/login')
}
</script>
