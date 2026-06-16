<template>
  <div class="min-h-screen bg-surface-deeper flex flex-col">
    <header class="sticky top-0 z-50 backdrop-blur-lg bg-surface-deeper/85 border-b border-[var(--color-border-primary)]">
      <div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center gap-2.5 group">
          <UiLqLogo size="sm" />
          <span class="text-lg font-bold text-[var(--color-text-primary)] group-hover:text-primary transition-colors">
            Lobby <span class="font-black text-xl">Q</span>
          </span>
        </NuxtLink>

        <nav class="flex items-center gap-3">
          <template v-if="authStore.isLoggedIn">
            <NuxtLink
              to="/dashboard"
              class="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors px-3 py-2"
            >
              Dashboard
            </NuxtLink>
            <button
              class="text-sm text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] transition-colors px-3 py-2"
              @click="handleLogout"
            >
              Logout
            </button>
          </template>
          <template v-else>
            <NuxtLink to="/login" class="btn-ghost text-sm">
              Login
            </NuxtLink>
            <NuxtLink to="/register" class="btn-primary text-sm">
              Daftar
            </NuxtLink>
          </template>
        </nav>
      </div>
    </header>

    <main class="flex-1">
      <slot />
    </main>

    <footer class="bg-surface-dark text-retro border-t-[1.5px] border-retro mt-20 pt-16 pb-0 select-none">
      <div class="max-w-7xl mx-auto px-6">
        <!-- Top Half: Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 pb-12 border-b border-dashed border-retro/30">
          <!-- Left Column: Newsletter Subscription -->
          <div class="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div class="max-w-sm space-y-3">
              <p class="font-mono text-sm md:text-base leading-relaxed uppercase tracking-wider font-bold">
                Friends let friends manage queues without notepad.
              </p>
            </div>
            
            <form @submit.prevent="handleSubscribe" class="w-full max-w-sm border-[1.5px] border-retro rounded-[8px] bg-transparent p-1.5 flex items-center justify-between">
              <input
                v-model="emailInput"
                type="email"
                placeholder="Your Email"
                required
                class="bg-transparent border-none outline-none px-3 py-1.5 text-xs font-mono placeholder-retro/50 text-retro flex-1 focus:ring-0"
              />
              <div class="flex items-center gap-2 font-mono text-xs font-bold shrink-0">
                <span class="text-[10px] tracking-wider">SUBMIT</span>
                <button type="submit" class="bg-secondary text-white border-[1.5px] border-retro rounded-[6px] w-7 h-7 flex items-center justify-center hover:bg-secondary-light active:translate-y-0.5 active:shadow-[1px_1px_0px_#111111] transition-all shrink-0 shadow-[2px_2px_0px_#111111]">
                  <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </form>
          </div>

          <!-- Divider for Mobile -->
          <div class="block lg:hidden w-full border-t border-dashed border-retro/20"></div>

          <!-- Right Column: Navigation Links -->
          <div class="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-6 font-mono text-xs">
            <!-- Col 1 -->
            <div class="space-y-4">
              <h4 class="font-bold text-retro uppercase tracking-widest">// Product</h4>
              <ul class="space-y-2.5 text-retro/80 font-bold uppercase tracking-wider text-[10px]">
                <li><NuxtLink to="/register" class="hover:text-primary transition-colors">Setup Queue</NuxtLink></li>
                <li><a href="/#demo" class="hover:text-primary transition-colors">OBS Dock Demo</a></li>
                <li><NuxtLink to="/login" class="hover:text-primary transition-colors">Sesi Mabar</NuxtLink></li>
                <li><a href="#" class="hover:text-primary transition-colors">SSE Live Feed</a></li>
                <li><a href="#" class="hover:text-primary transition-colors">Comfort Scale</a></li>
              </ul>
            </div>
            
            <!-- Col 2 -->
            <div class="space-y-4">
              <h4 class="font-bold text-retro uppercase tracking-widest">// Resources</h4>
              <ul class="space-y-2.5 text-retro/80 font-bold uppercase tracking-wider text-[10px]">
                <li><a href="#" class="hover:text-primary transition-colors">OBS Guide</a></li>
                <li><a href="#" class="hover:text-primary transition-colors">Spec Sheet</a></li>
                <li><a href="#" class="hover:text-primary transition-colors">FAQ</a></li>
                <li><a href="#" class="hover:text-primary transition-colors">Wholesale Dev</a></li>
                <li><a href="https://github.com" target="_blank" class="hover:text-primary transition-colors">Github Repo</a></li>
              </ul>
            </div>

            <!-- Col 3 -->
            <div class="space-y-4 col-span-2 md:col-span-1">
              <h4 class="font-bold text-retro uppercase tracking-widest">// Social</h4>
              <ul class="space-y-2.5 text-retro/80 font-bold uppercase tracking-wider text-[10px]">
                <li><a href="https://instagram.com" target="_blank" class="hover:text-primary transition-colors">Instagram</a></li>
                <li><a href="https://tiktok.com" target="_blank" class="hover:text-primary transition-colors">TikTok</a></li>
                <li><a href="https://twitter.com" target="_blank" class="hover:text-primary transition-colors">Twitter</a></li>
                <li><a href="https://facebook.com" target="_blank" class="hover:text-primary transition-colors">Facebook</a></li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Middle Row: Legal & Copyright -->
        <div class="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 pb-10 font-mono text-[10px] font-bold text-retro/80 uppercase tracking-widest">
          <div class="flex items-center gap-6">
            <a href="#" class="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" class="hover:text-primary transition-colors">Terms of Service</a>
          </div>
          <div>
            &copy; <a href="https://synchronizeteams.com" class="hover:text-primary transition-colors font-bold ">SYNCHRONIZETEAMS</a> {{ new Date().getFullYear() }}
          </div>
        </div>

        <!-- Divider before giant logo -->
        <div class="w-full border-t border-dashed border-retro/30 mb-8"></div>
      </div>

      <!-- Giant Typography Logo -->
      <div class="w-full h-[9vw] overflow-hidden select-none">
        <div class="text-[12vw] font-black leading-none text-center tracking-tighter uppercase text-primary/10 font-display">
          LOBBYQ
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const authStore = useAuthStore()
const { showToast } = useToast()

const emailInput = ref('')

const handleSubscribe = () => {
  if (!emailInput.value) return
  showToast({
    type: 'success',
    message: `Terima kasih! ${emailInput.value} berhasil terdaftar.`
  })
  emailInput.value = ''
}

const handleLogout = () => {
  authStore.logout()
  navigateTo('/login')
}
</script>
