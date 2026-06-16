<template>
  <div class="min-h-screen bg-surface-deepest flex items-center justify-center px-6">
    <div class="text-center">
      <div class="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mx-auto mb-6 shadow-soft">
        <span class="text-white font-bold text-lg">LQ</span>
      </div>

      <svg
        class="animate-spin h-8 w-8 text-primary-light mx-auto mb-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>

      <h1 class="text-lg font-bold text-[var(--color-text-primary)] mb-2">{{ statusTitle }}</h1>
      <p class="text-sm text-[var(--color-text-secondary)]">{{ statusMessage }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
})

const authStore = useAuthStore()
const route = useRoute()

const statusTitle = ref('Memproses login...')
const statusMessage = ref('Mohon tunggu sebentar, kami sedang memverifikasi akun Google kamu.')

onMounted(async () => {
  const token = route.query.token as string

  if (!token) {
    statusTitle.value = 'Login gagal'
    statusMessage.value = 'Token tidak ditemukan. Mengalihkan ke halaman login...'
    setTimeout(() => navigateTo('/login'), 2000)
    return
  }

  try {
    authStore.setToken(token)
    statusTitle.value = 'Berhasil login!'
    statusMessage.value = 'Mengalihkan ke dashboard...'
    await authStore.fetchProfile()
    await navigateTo('/dashboard')
  } catch {
    statusTitle.value = 'Login gagal'
    statusMessage.value = 'Gagal memuat profil. Mengalihkan...'
    setTimeout(() => navigateTo('/login'), 2000)
  }
})
</script>
