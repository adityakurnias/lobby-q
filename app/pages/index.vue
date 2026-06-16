<template>
  <div class="relative min-h-screen bg-surface-deeper overflow-hidden">
    <!-- Background Glow Effects -->
    <div class="absolute inset-0 pointer-events-none z-0">
      <div class="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[150px] animate-pulse" />
      <div class="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-secondary/15 rounded-full blur-[130px]" />
    </div>

    <!-- Hero Section -->
    <section class="relative z-10 max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
      <!-- Badge Announcement -->
      <div class="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4.5 py-1.5 mb-8 hover:bg-primary/15 transition-all">
        <span class="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
        <span class="text-xs text-primary font-semibold tracking-wide uppercase">LobbyQ v1.0 &middot; OBS Streamer Ready</span>
      </div>

      <!-- Main Headline -->
      <h1 class="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight tracking-tight mb-6">
        Kelola Antrean Mabar<br />
        <span class="text-gradient">Lebih Cepat Dari Notepad</span>
      </h1>

      <!-- Sub-headline -->
      <p class="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
        Gantikan pencatatan antrean manual kamu yang berantakan.
        Gunakan dashboard khusus yang pas di <span class="text-white font-medium">OBS Custom Dock</span> dan biarkan viewer memantau posisi mereka secara real-time.
      </p>

      <!-- Call To Actions -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <NuxtLink to="/register" class="btn-primary text-sm px-8 py-3.5 flex items-center gap-2 shadow-glow hover:scale-[1.02] transition-transform">
          <span>Mulai Gratis Sekarang</span>
          <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </NuxtLink>
        <a href="#demo" class="btn-ghost text-sm px-8 py-3.5 hover:bg-white/5 transition-all">
          Lihat Live Demo Sync
        </a>
      </div>

      <div class="flex items-center justify-center gap-6 mt-8 text-xs text-gray-500">
        <span class="flex items-center gap-1.5">⚡ Real-time via SSE</span>
        <span>&middot;</span>
        <span class="flex items-center gap-1.5">🎮 OBS Integrated</span>
        <span>&middot;</span>
        <span class="flex items-center gap-1.5">🔒 100% Privacy Safe</span>
      </div>
    </section>

    <!-- Interactive Simulator Demo Section -->
    <section id="demo" class="relative z-10 py-16 border-t border-white/5 bg-black/30 backdrop-blur-sm">
      <div class="max-w-6xl mx-auto px-6">
        <div class="text-center mb-12">
          <h2 class="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-3">
            Sinkronisasi Real-Time Dua Sisi
          </h2>
          <p class="text-sm text-gray-400 max-w-lg mx-auto">
            Lihat bagaimana tindakan Streamer di dashboard OBS (kiri) memperbarui status di halaman Publik Viewer (kanan) secara otomatis.
          </p>

          <!-- Simulator Action Log Log -->
          <div class="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-5 py-2 mt-6">
            <span class="w-2 h-2 rounded-full bg-primary animate-ping" />
            <span class="text-xs text-gray-300 font-mono">{{ simLog }}</span>
            <span
              :class="[
                'text-[10px] uppercase font-bold px-2 py-0.5 rounded transition-all duration-300',
                syncIndicator ? 'bg-primary/20 text-primary scale-110' : 'bg-white/5 text-gray-500'
              ]"
            >
              {{ syncIndicator ? '⚡ SSE SYNCED' : 'STANDBY' }}
            </span>
          </div>
        </div>

        <!-- Simulator Container Grid -->
        <div class="grid lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
          <!-- 1. LEFT SIDE: STREAMER OBS DOCK (320px simulator layout) -->
          <div class="lg:col-span-6 flex flex-col items-center">
            <div class="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-widest">Tampilan Streamer (OBS Dock)</div>
            
            <div class="w-full max-w-[340px] bg-black border border-white/10 rounded-lg p-3 shadow-2xl relative select-none">
              <!-- OBS Header -->
              <div class="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
                <div class="flex items-center gap-1.5">
                  <div class="w-5 h-5 rounded bg-primary flex items-center justify-center">
                    <span class="text-white font-bold text-[9px]">LQ</span>
                  </div>
                  <span class="text-xs font-bold text-white">OBS Dock &middot; LobbyQ</span>
                </div>
                <span class="text-[9px] text-green-400 bg-green-950/40 px-1.5 py-0.5 rounded font-mono border border-green-800/30">ONLINE</span>
              </div>

              <!-- Top Add Input (Simulated UI) -->
              <div class="bg-surface-dark/40 border border-white/5 rounded p-2 mb-3 space-y-1.5">
                <div class="text-[9px] font-semibold text-gray-500">Tambah Antrean</div>
                <div class="grid grid-cols-2 gap-1">
                  <div class="bg-white/5 border border-white/10 rounded px-2 py-1 text-[10px] text-gray-400">
                    {{ simStep === 3 ? 'Fajar' : 'Ketik nama...' }}
                  </div>
                  <div class="bg-white/5 border border-white/10 rounded px-2 py-1 text-[10px] text-gray-500">
                    {{ simStep === 3 ? '55667***' : 'Game ID...' }}
                  </div>
                </div>
                <div class="flex justify-between items-center pt-0.5">
                  <span class="text-[9px] text-gray-500">Kuota: 1</span>
                  <div class="flex items-center gap-1.5">
                    <span class="text-[9px] text-amber-300">⭐ Fast Track</span>
                    <button class="bg-primary text-white text-[9px] px-2.5 py-0.5 rounded font-semibold transition-all" :class="{ 'scale-105 bg-primary-light': simStep === 3 }">
                      Tambah
                    </button>
                  </div>
                </div>
              </div>

              <!-- Stats grid -->
              <div class="grid grid-cols-3 gap-1 mb-3">
                <div class="bg-surface-dark/20 border border-white/5 rounded py-1 text-center">
                  <div class="text-xs font-bold text-primary">{{ simPlaying.length }}</div>
                  <div class="text-[8px] text-gray-500 uppercase">Playing</div>
                </div>
                <div class="bg-surface-dark/20 border border-white/5 rounded py-1 text-center">
                  <div class="text-xs font-bold text-white">{{ simWaiting.length }}</div>
                  <div class="text-[8px] text-gray-500 uppercase">Waiting</div>
                </div>
                <div class="bg-surface-dark/20 border border-white/5 rounded py-1 text-center">
                  <div class="text-xs font-bold text-gray-400">{{ simParked.length }}</div>
                  <div class="text-[8px] text-gray-500 uppercase">Parked</div>
                </div>
              </div>

              <!-- Collapsibles Simulated -->
              <div class="space-y-2 text-[10px]">
                <!-- PLAYING LIST -->
                <div class="border border-white/5 rounded overflow-hidden">
                  <div class="px-2 py-1 bg-white/[0.02] flex items-center justify-between text-primary font-bold">
                    <span>PLAYING ({{ simPlaying.length }})</span>
                    <span class="text-[8px] text-gray-500 hover:text-white cursor-pointer font-normal">Selesai (Bulk)</span>
                  </div>
                  <div class="p-2 space-y-1.5">
                    <div v-for="(item, idx) in simPlaying" :key="item.id" class="flex items-center justify-between bg-white/[0.02] border border-white/5 rounded p-1.5">
                      <div>
                        <div class="font-bold flex items-center gap-1">
                          <span class="text-primary">#{{ idx + 1 }}</span>
                          <span>{{ item.name }}</span>
                          <span v-if="item.fast" class="text-[8px] bg-amber-500/20 text-amber-300 px-1 rounded">⭐ Fast</span>
                        </div>
                        <div class="text-[8px] text-gray-500">{{ item.gameId }} &middot; Sisa {{ item.quota }} Match</div>
                      </div>
                      <div class="flex items-center gap-1 scale-90 origin-right">
                        <button class="bg-primary text-white px-2 py-0.5 rounded font-medium" :class="{ 'bg-primary-light scale-105': simStep === 1 && item.id === '1' }">Selesai</button>
                        <button class="bg-white/5 border border-white/10 text-gray-400 px-1.5 py-0.5 rounded">Park</button>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- WAITING LIST -->
                <div class="border border-white/5 rounded overflow-hidden">
                  <div class="px-2 py-1 bg-white/[0.02] flex items-center justify-between text-white font-bold">
                    <span>WAITING ({{ simWaiting.length }})</span>
                  </div>
                  <div class="p-2 space-y-1.5">
                    <div v-for="(item, idx) in simWaiting" :key="item.id" class="flex items-center justify-between bg-white/[0.02] border border-white/5 rounded p-1.5" :class="{ 'border-primary/30 bg-primary/5': simStep === 3 && item.id === '7' }">
                      <div>
                        <div class="font-bold flex items-center gap-1">
                          <span class="text-gray-400">#{{ idx + 1 }}</span>
                          <span>{{ item.name }}</span>
                          <span v-if="item.fast" class="text-[8px] bg-amber-500/20 text-amber-300 px-1 rounded">⭐ Fast</span>
                        </div>
                        <div class="text-[8px] text-gray-500">{{ item.gameId }} &middot; Sisa {{ item.quota }} Match</div>
                      </div>
                      <div class="flex items-center gap-1 scale-90 origin-right">
                        <button class="bg-secondary hover:bg-secondary-light text-white px-2 py-0.5 rounded font-medium" :class="{ 'bg-primary scale-105': simStep === 2 && item.id === '3' }">Play</button>
                        <button class="text-gray-500 hover:text-red-400 p-0.5">✕</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Active pointer simulator overlay -->
              <div v-if="simStep === 1" class="absolute top-[165px] right-[52px] pointer-events-none transition-all duration-500 animate-bounce">
                <span class="text-lg">👆</span>
              </div>
              <div v-else-if="simStep === 2" class="absolute top-[265px] right-[52px] pointer-events-none transition-all duration-500 animate-bounce">
                <span class="text-lg">👆</span>
              </div>
              <div v-else-if="simStep === 3" class="absolute top-[90px] right-[18px] pointer-events-none transition-all duration-500 animate-bounce">
                <span class="text-lg">👆</span>
              </div>
            </div>
          </div>

          <!-- 2. RIGHT SIDE: PUBLIC VIEWER PAGE (Smartphone format) -->
          <div class="lg:col-span-6 flex flex-col items-center">
            <div class="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-widest">Tampilan Publik Viewer (Link URL)</div>
            
            <div class="w-full max-w-[340px] bg-surface-deeper border border-white/10 rounded-2xl p-3 shadow-2xl relative select-none">
              <!-- Phone notch/bezel decoration -->
              <div class="w-28 h-4 bg-black border-b border-white/10 rounded-b-xl mx-auto -mt-3 mb-2 flex items-center justify-center">
                <div class="w-10 h-1 bg-white/20 rounded-full" />
              </div>

              <!-- Streamer Sticky Header inside mockup -->
              <div class="bg-surface-dark/80 backdrop-blur border border-white/5 rounded-lg p-2 mb-3 flex items-center gap-2">
                <div class="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                  <span class="text-white font-bold text-xs">J</span>
                </div>
                <div class="flex-1 min-w-0">
                  <div class="text-[11px] font-bold text-white truncate">John Streamer</div>
                  <div class="text-[9px] text-gray-400">@johnstream</div>
                </div>
                <div class="flex items-center gap-1 text-[8px] bg-red-500/20 text-red-400 border border-red-500/30 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                  <span class="w-1 h-1 rounded-full bg-red-500 animate-pulse" />
                  Live
                </div>
              </div>

              <!-- Section Playing (Viewer side) -->
              <div class="space-y-1.5 mb-3 text-[10px]">
                <div class="text-[9px] font-semibold text-primary uppercase tracking-wider flex items-center gap-1 px-1">
                  <span class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  Sedang Bermain
                </div>
                <div class="space-y-1.5">
                  <div v-for="(item, idx) in simPlaying" :key="item.id" class="relative overflow-hidden bg-gradient-to-r from-primary/10 to-transparent border border-primary/20 rounded p-2.5">
                    <div class="absolute left-0 top-0 bottom-0 w-0.5 bg-primary" />
                    <div class="flex items-center justify-between">
                      <div>
                        <div class="font-bold text-white flex items-center gap-1">
                          <span>{{ item.name }}</span>
                          <span v-if="item.fast" class="text-[7px] bg-amber-500/20 text-amber-300 px-1 rounded">Fast</span>
                        </div>
                        <div class="text-[8px] text-gray-400 mt-0.5">{{ item.gameId }} &middot; Sisa {{ item.quota }} Match</div>
                      </div>
                      <span class="text-[8px] bg-primary/20 text-primary border border-primary/30 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Playing</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Section Waiting (Viewer side) -->
              <div class="space-y-1.5 text-[10px]">
                <div class="text-[9px] font-semibold text-gray-500 uppercase tracking-wider px-1">Daftar Antrean ({{ simWaiting.length }})</div>
                <div class="space-y-1.5">
                  <div v-for="(item, idx) in simWaiting" :key="item.id" class="flex items-center justify-between bg-surface-dark border border-white/5 rounded p-2">
                    <div class="flex items-center gap-2">
                      <span class="text-xs font-mono text-gray-500">#{{ idx + 1 }}</span>
                      <div>
                        <div class="font-semibold text-white flex items-center gap-1">
                          <span>{{ item.name }}</span>
                          <!-- Highlights specific viewer example -->
                          <span v-if="item.id === '4'" class="text-[8px] bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-1 rounded">Posisi Kamu</span>
                          <span v-if="item.fast" class="text-[7px] bg-amber-500/20 text-amber-300 px-1 rounded">Fast</span>
                        </div>
                        <div class="text-[8px] text-gray-500 mt-0.5">{{ item.gameId }} &middot; Sisa {{ item.quota }} Match</div>
                      </div>
                    </div>
                    <span class="text-[7px] bg-white/5 border border-white/10 text-gray-400 px-1.5 py-0.5 rounded font-medium">Waiting</span>
                  </div>
                </div>
              </div>

              <!-- SSE status overlay animation for visual synced proof -->
              <div v-if="syncIndicator" class="absolute inset-x-2 top-2 z-30 bg-primary/95 text-white text-[10px] font-bold text-center py-1 rounded shadow-lg animate-bounce flex items-center justify-center gap-1">
                <span>⚡ Sinkronisasi Instan via SSE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How it works (Cara Kerja) Section -->
    <section class="relative z-10 py-20 border-t border-white/5">
      <div class="max-w-6xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-4">
            Cara Kerja Tiga Langkah
          </h2>
          <p class="text-sm text-gray-400 max-w-md mx-auto">
            Hanya butuh beberapa detik untuk menyiapkan lobi antrean mabar kamu.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <!-- Step 1 -->
          <div class="card p-6 text-center group hover:border-primary/20 transition-all hover:-translate-y-1 duration-300">
            <div class="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/20 transition-colors">
              <svg class="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div class="text-xs text-primary font-bold uppercase tracking-wider mb-2">Langkah 1</div>
            <h3 class="text-lg font-bold text-white mb-2">Daftar Akun Streamer</h3>
            <p class="text-xs text-gray-400 leading-relaxed">
              Buat akun dalam hitungan detik gratis atau masuk dengan cepat menggunakan akun Google.
            </p>
          </div>

          <!-- Step 2 -->
          <div class="card p-6 text-center group hover:border-primary/20 transition-all hover:-translate-y-1 duration-300">
            <div class="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/20 transition-colors">
              <svg class="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <div class="text-xs text-primary font-bold uppercase tracking-wider mb-2">Langkah 2</div>
            <h3 class="text-lg font-bold text-white mb-2">Kelola Antrean di OBS</h3>
            <p class="text-xs text-gray-400 leading-relaxed">
              Sematkan link dashboard di OBS Custom Dock. Tambah, edit, dan jalankan antrean secara inline tanpa modal.
            </p>
          </div>

          <!-- Step 3 -->
          <div class="card p-6 text-center group hover:border-primary/20 transition-all hover:-translate-y-1 duration-300">
            <div class="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/20 transition-colors">
              <svg class="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
              </svg>
            </div>
            <div class="text-xs text-primary font-bold uppercase tracking-wider mb-2">Langkah 3</div>
            <h3 class="text-lg font-bold text-white mb-2">Bagikan Link Publik</h3>
            <p class="text-xs text-gray-400 leading-relaxed">
              Tampilkan link publik `/q/username` pada chat bot streaming atau overlay agar penonton memantau posisi mereka.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Marketing Highlights -->
    <section class="relative z-10 py-16 border-t border-white/5 bg-black/[0.15]">
      <div class="max-w-6xl mx-auto px-6">
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="feature in features" :key="feature.title" class="p-6 rounded-lg bg-surface-dark border border-white/5 shadow-soft hover:border-white/10 transition-colors">
            <div class="text-3xl mb-4 select-none">{{ feature.icon }}</div>
            <h3 class="text-sm font-bold text-white mb-2">{{ feature.title }}</h3>
            <p class="text-xs text-gray-400 leading-relaxed">{{ feature.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Final Call to Action -->
    <section class="relative z-10 py-20">
      <div class="max-w-4xl mx-auto px-6 text-center">
        <div class="card p-10 relative overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 pointer-events-none" />
          <div class="relative z-10">
            <h2 class="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-4">
              Siap Meninggalkan Cara Manual?
            </h2>
            <p class="text-sm text-gray-400 mb-8 max-w-md mx-auto leading-relaxed">
              Beralih ke manajemen antrean mabar modern dan tingkatkan keterlibatan penonton saat streaming game Anda.
            </p>
            <NuxtLink to="/register" class="btn-primary text-sm px-10 py-4 inline-flex items-center gap-2 hover:scale-[1.02] transition-transform">
              <span>Daftar Sekarang &mdash; Gratis</span>
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

useHead({
  title: 'LobbyQ - Manajemen Antrean Mabar untuk Streamer Game',
})

// Simulator states
const simPlaying = ref([
  { id: '1', name: 'Budi', gameId: '12345***', quota: 2, fast: true },
  { id: '2', name: 'Andi', gameId: '67890***', quota: 1, fast: false },
])

const simWaiting = ref([
  { id: '3', name: 'Rina', gameId: '11223***', quota: 2, fast: false },
  { id: '4', name: 'Dimas', gameId: '44556***', quota: 3, fast: false },
  { id: '5', name: 'Eko', gameId: '99887***', quota: 1, fast: true },
])

const simParked = ref([
  { id: '6', name: 'Zaki', gameId: '88776***', quota: 5, fast: false }
])

const simLog = ref('LobbyQ simulator aktif, sedang menunggu sinkronisasi...')
const simStep = ref(0)
const syncIndicator = ref(false)

const triggerSync = () => {
  syncIndicator.value = true
  setTimeout(() => {
    syncIndicator.value = false
  }, 1000)
}

const runStep = () => {
  simStep.value = (simStep.value + 1) % 4
  triggerSync()

  if (simStep.value === 0) {
    // Step 0: Reset to initial
    simPlaying.value = [
      { id: '1', name: 'Budi', gameId: '12345***', quota: 2, fast: true },
      { id: '2', name: 'Andi', gameId: '67890***', quota: 1, fast: false },
    ]
    simWaiting.value = [
      { id: '3', name: 'Rina', gameId: '11223***', quota: 2, fast: false },
      { id: '4', name: 'Dimas', gameId: '44556***', quota: 3, fast: false },
      { id: '5', name: 'Eko', gameId: '99887***', quota: 1, fast: true },
    ]
    simLog.value = 'Simulator direset ke status awal.'
  } else if (simStep.value === 1) {
    // Step 1: Complete match on Budi
    simPlaying.value = [
      { id: '1', name: 'Budi', gameId: '12345***', quota: 1, fast: true },
      { id: '2', name: 'Andi', gameId: '67890***', quota: 1, fast: false },
    ]
    simLog.value = 'Streamer menyelesaikan match Budi (Sisa kuota: 1).'
  } else if (simStep.value === 2) {
    // Step 2: Play Rina
    simWaiting.value = simWaiting.value.filter(item => item.id !== '3')
    simPlaying.value.push({ id: '3', name: 'Rina', gameId: '11223***', quota: 2, fast: false })
    simLog.value = 'Streamer memindahkan Rina ke dalam status PLAYING.'
  } else if (simStep.value === 3) {
    // Step 3: Add Fajar
    simWaiting.value.push({ id: '7', name: 'Fajar', gameId: '55667***', quota: 3, fast: false })
    simLog.value = 'Streamer menambahkan "Fajar" ke dalam WAITING list.'
  }
}

let simInterval: any = null
onMounted(() => {
  simInterval = setInterval(runStep, 4000)
})
onBeforeUnmount(() => {
  if (simInterval) clearInterval(simInterval)
})

const features = [
  {
    icon: '⚡',
    title: 'Sinkronisasi Real-Time',
    desc: 'Semua perubahan antrean di-broadcast instan menggunakan Server-Sent Events (SSE). Tanpa reload halaman.',
  },
  {
    icon: '🎮',
    title: 'OBS Custom Dock Ready',
    desc: 'Antarmuka super tipis berukuran 300px-400px yang muat sempurna langsung di panel OBS Dock Anda.',
  },
  {
    icon: '🔒',
    title: 'Keamanan Privasi Game ID',
    desc: 'Melindungi ID Game penonton Anda dari penyalahgunaan menggunakan masking otomatis di frontend publik.',
  },
  {
    icon: '🚫',
    title: 'Zero Modal Policy',
    desc: 'Tidak ada popup atau modal dialog yang mengganggu fokus permainan Anda. Semua pengeditan dilakukan secara inline.',
  },
]
</script>

<style scoped>
.text-gradient {
  background-size: 200% auto;
  animation: shine 4s linear infinite;
}

@keyframes shine {
  to {
    background-position: 200% center;
  }
}
</style>
