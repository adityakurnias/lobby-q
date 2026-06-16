<template>
  <div class="min-h-screen flex items-center justify-center px-6">
    <div class="text-center">
      <div class="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4" />
      <p class="text-gray-400 text-sm">{{ statusMessage }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
})

const authStore = useAuthStore()
const route = useRoute()

const statusMessage = ref('Memproses login...')

onMounted(async () => {
  const token = route.query.token as string

  if (!token) {
    statusMessage.value = 'Login gagal. Token tidak ditemukan.'
    setTimeout(() => navigateTo('/login'), 2000)
    return
  }

  try {
    authStore.setToken(token)
    statusMessage.value = 'Berhasil login! Mengalihkan...'
    await authStore.fetchProfile()
    await navigateTo('/dashboard')
  } catch {
    statusMessage.value = 'Gagal memuat profil. Mengalihkan...'
    setTimeout(() => navigateTo('/login'), 2000)
  }
})
</script>
