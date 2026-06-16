<template>
  <div class="min-h-[calc(100vh-120px)] flex items-center justify-center px-6 py-12">
    <div class="w-full max-w-md">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-2xl font-bold text-white mb-2">Daftar LobbyQ</h1>
        <p class="text-gray-400 text-sm">Buat akun gratis dan mulai kelola antrean mabar kamu.</p>
      </div>

      <!-- Register Form -->
      <div class="card p-6">
        <form @submit.prevent="handleRegister" class="space-y-4">
          <div>
            <label class="block text-sm text-gray-300 mb-1.5">Nama</label>
            <input
              v-model="form.name"
              type="text"
              class="input-field"
              placeholder="Nama lengkap kamu"
              required
            />
          </div>

          <div>
            <label class="block text-sm text-gray-300 mb-1.5">Username</label>
            <input
              v-model="form.username"
              type="text"
              class="input-field"
              placeholder="username (tanpa spasi)"
              pattern="[a-zA-Z0-9]+"
              required
            />
            <p class="text-xs text-gray-500 mt-1">
              Akan digunakan untuk link publik: <span class="text-primary">/q/{{ form.username || 'username' }}</span>
            </p>
          </div>

          <div>
            <label class="block text-sm text-gray-300 mb-1.5">Email</label>
            <input
              v-model="form.email"
              type="email"
              class="input-field"
              placeholder="email@contoh.com"
              required
            />
          </div>

          <div>
            <label class="block text-sm text-gray-300 mb-1.5">Password</label>
            <input
              v-model="form.password"
              type="password"
              class="input-field"
              placeholder="Minimal 8 karakter"
              minlength="8"
              required
            />
          </div>

          <!-- Error message -->
          <div v-if="errorMsg" class="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3 text-sm text-red-400">
            {{ errorMsg }}
          </div>

          <!-- Success message -->
          <div v-if="successMsg" class="bg-green-500/10 border border-green-500/20 rounded-lg px-4 py-3 text-sm text-green-400">
            {{ successMsg }}
          </div>

          <UiLqButton
            variant="primary"
            size="lg"
            :loading="loading"
            :disabled="!isFormValid"
            class="w-full"
            @click="handleRegister"
          >
            Daftar
          </UiLqButton>
        </form>

        <!-- Divider -->
        <div class="flex items-center gap-3 my-6">
          <div class="flex-1 h-px bg-white/10" />
          <span class="text-xs text-gray-500">atau</span>
          <div class="flex-1 h-px bg-white/10" />
        </div>

        <!-- Google OAuth -->
        <UiLqButton
          variant="ghost"
          size="lg"
          class="w-full"
          @click="handleGoogleLogin"
        >
          <svg class="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Daftar dengan Google
        </UiLqButton>
      </div>

      <!-- Footer link -->
      <p class="text-center text-sm text-gray-400 mt-6">
        Sudah punya akun?
        <NuxtLink to="/login" class="text-primary hover:text-primary-light transition-colors font-medium">
          Masuk di sini
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

useHead({
  title: 'Daftar - LobbyQ',
})

const authStore = useAuthStore()
const config = useRuntimeConfig()

const form = reactive({
  name: '',
  username: '',
  email: '',
  password: '',
})

const loading = ref(false)
const errorMsg = ref('')
const successMsg = ref('')

const isFormValid = computed(() => {
  return form.name && form.username && form.email && form.password.length >= 8
})

const handleRegister = async () => {
  if (!isFormValid.value) return
  loading.value = true
  errorMsg.value = ''
  successMsg.value = ''

  try {
    const res = await authStore.register({
      name: form.name,
      username: form.username,
      email: form.email,
      password: form.password,
    }) as { success: boolean }

    if (res.success) {
      successMsg.value = 'Pendaftaran berhasil! Silakan login.'
      setTimeout(() => navigateTo('/login'), 1500)
    }
  } catch (err: any) {
    errorMsg.value = err?.data?.message || 'Pendaftaran gagal. Silakan coba lagi.'
  } finally {
    loading.value = false
  }
}

const handleGoogleLogin = () => {
  window.location.href = `${config.public.apiBaseUrl}/auth/google`
}
</script>
