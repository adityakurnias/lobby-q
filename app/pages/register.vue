<template>
  <div class="min-h-[calc(100vh-120px)] flex items-center justify-center px-6 py-12 relative font-mono">
    <div class="w-full max-w-md relative z-10">
      <div class="text-center mb-8">
        <UiLqLogo size="md" class="mx-auto mb-4" />
        <h1 class="text-xl font-black text-retro mb-2 font-display uppercase tracking-wider">Daftar LobbyQ</h1>
        <p class="text-[var(--color-text-tertiary)] text-[9px] font-bold uppercase tracking-widest">Buat akun gratis untuk mengelola antrean mabar.</p>
      </div>

      <div class="border-[1.5px] border-retro bg-white p-8 shadow-[4px_4px_0px_#111111] rounded-[10px]">
        <form @submit.prevent="handleRegister" class="space-y-5">
          <div>
            <label class="block text-[9px] text-[var(--color-text-secondary)] mb-1.5 font-bold uppercase tracking-widest">Nama</label>
            <input
              v-model="form.name"
              type="text"
              class="input-field bg-white !py-2.5 !text-xs"
              placeholder="Nama lengkap kamu"
              required
            />
          </div>

          <div>
            <label class="block text-[9px] text-[var(--color-text-secondary)] mb-1.5 font-bold uppercase tracking-widest">Username</label>
            <input
              v-model="form.username"
              type="text"
              class="input-field bg-white !py-2.5 !text-xs"
              placeholder="username (tanpa spasi)"
              pattern="[a-zA-Z0-9]+"
              required
            />
            <p class="text-[9px] text-[var(--color-text-tertiary)] mt-1.5 font-bold uppercase tracking-widest">
              Link publik: <span class="text-secondary font-bold">/q/{{ form.username || 'username' }}</span>
            </p>
          </div>

          <div>
            <label class="block text-[9px] text-[var(--color-text-secondary)] mb-1.5 font-bold uppercase tracking-widest">Email</label>
            <input
              v-model="form.email"
              type="email"
              class="input-field bg-white !py-2.5 !text-xs"
              placeholder="email@contoh.com"
              required
            />
          </div>

          <div>
            <label class="block text-[9px] text-[var(--color-text-secondary)] mb-1.5 font-bold uppercase tracking-widest">Password</label>
            <input
              v-model="form.password"
              type="password"
              class="input-field bg-white !py-2.5 !text-xs"
              placeholder="Minimal 8 karakter"
              minlength="8"
              required
            />
          </div>

          <div v-if="errorMsg" class="bg-primary/5 border border-primary/25 rounded-[6px] px-4 py-3 text-[10px] text-primary font-bold uppercase tracking-wider">
            [!] {{ errorMsg }}
          </div>

          <div v-if="successMsg" class="bg-secondary/5 border border-secondary/25 rounded-[6px] px-4 py-3 text-[10px] text-secondary font-bold uppercase tracking-wider">
            [+] {{ successMsg }}
          </div>

          <UiLqButton
            variant="primary"
            size="lg"
            :loading="loading"
            :disabled="!isFormValid"
            class="w-full font-mono uppercase font-bold text-xs tracking-widest"
            @click="handleRegister"
          >
            Daftar
          </UiLqButton>
        </form>

        <div class="flex items-center gap-3 my-6 font-mono">
          <div class="flex-1 h-px bg-retro/20" />
          <span class="text-[9px] text-[var(--color-text-tertiary)] font-bold uppercase tracking-widest">atau</span>
          <div class="flex-1 h-px bg-retro/20" />
        </div>

        <UiLqButton
          variant="secondary"
          size="lg"
          class="w-full flex items-center justify-center gap-2 font-mono uppercase font-bold text-xs tracking-widest"
          @click="handleGoogleLogin"
        >
          <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Google
        </UiLqButton>
      </div>

      <p class="text-center text-[10px] text-[var(--color-text-secondary)] mt-6 uppercase font-bold tracking-wider">
        Sudah punya akun?
        <NuxtLink to="/login" class="text-primary hover:underline font-extrabold">
          Masuk di sini
        </NuxtLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'

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
