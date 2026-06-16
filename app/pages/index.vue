<template>
  <div class="relative min-h-screen bg-surface-deeper overflow-hidden pb-16 text-retro">
    <!-- Hero Section -->
    <section class="max-w-7xl mx-auto px-6 pt-16 md:pt-24 pb-16 flex flex-col items-center text-center">
      <div class="inline-flex items-center gap-2 px-3 py-1 bg-surface border-[1.5px] border-retro rounded-full mb-6 shadow-[2px_2px_0px_#111111]">
        <span class="w-2.5 h-2.5 rounded-full bg-secondary border border-retro"></span>
        <span class="font-mono text-[10px] font-bold tracking-wider uppercase text-retro">Online Queue w/ LobbyQ</span>
      </div>
      
      <h1 class="font-display text-5xl md:text-7xl font-extrabold text-retro tracking-tight leading-none max-w-4xl mb-6 uppercase">
        MANAGE YOUR MABAR QUEUE <br>
        <span class="text-primary underline decoration-4 decoration-secondary underline-offset-8">WITHOUT NOTEPAD.</span>
      </h1>
      
      <p class="font-sans text-retro/75 text-sm md:text-base max-w-xl mb-10 leading-relaxed">
        LobbyQ adalah sistem antrean mabar terintegrasi untuk para streamer. Didesain secara khusus untuk disematkan langsung di OBS Dock dengan visual retro-tech editorial yang bersih dan performa tinggi.
      </p>

      <div class="flex flex-col sm:flex-row gap-4 font-mono text-xs font-bold">
        <NuxtLink to="/register" class="btn-primary text-xs px-8 py-4 min-w-[180px] tracking-wider uppercase">
          Mulai Antrean Gratis
        </NuxtLink>
        <a href="#demo" class="btn-secondary text-xs px-8 py-4 min-w-[180px] tracking-wider uppercase">
          Lihat Live Demo
        </a>
      </div>

      <!-- Features bar preserved from current design -->
      <div class="flex items-center justify-center gap-6 mt-12 text-[10px] text-retro font-mono uppercase tracking-widest font-bold">
        <span class="flex items-center gap-1.5">
          [+] Real-time via SSE
        </span>
        <span class="flex items-center gap-1.5">
          [+] OBS Integrated
        </span>
        <span class="flex items-center gap-1.5">
          [+] Zero Modals
        </span>
      </div>
    </section>

    <!-- Product Preview (CRT Screen Mockup in Light Theme) -->
    <section id="demo" class="max-w-5xl mx-auto px-6 pb-24">
      <div class="relative border-[1.5px] border-retro p-2 bg-white shadow-[6px_6px_0px_#111111] rounded-[10px]">
        <!-- Window Header -->
        <div class="flex items-center justify-between px-3 py-2 border-b-[1.5px] border-retro font-mono text-xs text-retro bg-surface-deeper mb-2 rounded-t-[8px] font-bold">
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-primary border border-retro"></span>
            <span class="w-3 h-3 rounded-full bg-secondary border border-retro"></span>
            <span class="w-3 h-3 rounded-full bg-surface-deepest border border-retro"></span>
            <span class="ml-2 font-black">OBS_DOCK://LOBBYQ_PREVIEW.exe</span>
          </div>
          <span class="text-primary font-black animate-pulse flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-primary animate-ping" />
            <span>● FEED ACTIVE</span>
          </span>
        </div>

        <!-- Simulated Dashboard Screen (Light CRT Screen) -->
        <div class="crt-screen scanlines bg-white rounded-b-[8px] p-6 min-h-[400px] flex flex-col md:flex-row gap-6 relative">
          <!-- Left side: Form & Stats -->
          <div class="w-full md:w-1/3 flex flex-col gap-4">
            <div class="border-[1.5px] border-retro bg-surface-deeper p-4 flex flex-col gap-3 rounded-[10px]">
              <span class="font-mono text-xs text-secondary uppercase font-bold tracking-wider">// Quick Add</span>
              <div class="flex gap-2">
                <input type="text" placeholder="Nama Viewer..." readonly :value="simStep === 3 ? 'Fajar' : 'Joko_Gaming'" class="bg-white border-[1.5px] border-retro px-3 py-2 text-xs font-sans rounded-[8px] w-full focus:outline-none text-retro font-bold">
                <button class="bg-primary text-white text-xs font-mono px-3 py-2 rounded-[8px] border-[1.5px] border-retro font-bold">ADD</button>
              </div>
            </div>

            <!-- Stats -->
            <div class="grid grid-cols-3 gap-2">
              <div class="border-[1.5px] border-retro rounded-[10px] bg-white p-3 text-center">
                <div class="font-mono text-[9px] text-retro font-bold uppercase">PLAYING</div>
                <div class="font-display text-xl font-extrabold text-primary mt-1">{{ simPlaying.length }}</div>
              </div>
              <div class="border-[1.5px] border-retro rounded-[10px] bg-white p-3 text-center">
                <div class="font-mono text-[9px] text-retro font-bold uppercase">WAITING</div>
                <div class="font-display text-xl font-extrabold text-secondary mt-1">{{ simWaiting.length }}</div>
              </div>
              <div class="border-[1.5px] border-retro rounded-[10px] bg-white p-3 text-center">
                <div class="font-mono text-[9px] text-retro font-bold uppercase">PARKED</div>
                <div class="font-display text-xl font-extrabold text-retro/60 mt-1">{{ simParked.length }}</div>
              </div>
            </div>

            <!-- Venn circles mockup -->
            <div class="border-[1.5px] border-retro rounded-[10px] bg-surface-deeper p-4 font-sans text-xs text-retro flex items-center justify-between">
              <div>
                <span class="font-mono text-[10px] text-primary font-bold tracking-wide">// COMFORT SCALE</span>
                <p class="text-[10px] mt-0.5 font-mono uppercase font-bold tracking-wider">Lobby stress: STABLE</p>
              </div>
              
              <!-- Venn overlapping circles dynamic -->
              <div class="relative w-10 h-10 flex-shrink-0">
                <div class="absolute top-0 left-0 w-7 h-7 rounded-full bg-primary mix-blend-multiply opacity-80 animate-pulse"></div>
                <div class="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-secondary mix-blend-multiply opacity-80"></div>
              </div>
            </div>
          </div>

          <!-- Right side: Queue Cards Preview -->
          <div class="flex-grow flex flex-col gap-4">
            <div class="border-b-[1.5px] border-retro pb-2 flex items-center justify-between">
              <span class="font-mono text-xs text-retro uppercase font-bold tracking-wider">Antrean Saat Ini (Active Queue)</span>
              <span class="font-mono text-[10px] text-retro bg-surface-deeper px-2 py-0.5 border border-retro rounded">{{ simPlaying.length + simWaiting.length }} Viewer terdaftar</span>
            </div>

            <!-- Cards -->
            <div class="flex flex-col gap-2.5 overflow-y-auto max-h-[300px] pr-1">
              <!-- Render playing items -->
              <div v-for="(item, idx) in simPlaying" :key="'play-' + item.id" class="border-[1.5px] border-secondary bg-secondary/[0.03] p-3 flex items-center justify-between rounded-[10px]">
                <div class="flex items-center gap-3">
                  <span class="font-mono text-lg font-bold text-secondary">#0{{ idx + 1 }}</span>
                  <div>
                    <h4 class="font-display font-bold text-sm text-retro flex items-center gap-1.5 uppercase">
                      {{ item.name }} 
                      <span v-if="item.fast" class="font-mono text-[8px] font-bold text-primary bg-primary/10 border border-primary/20 px-1 py-0.5 rounded">⭐ FAST TRACK</span>
                    </h4>
                    <p class="font-mono text-[10px] text-retro/70">ID: {{ item.gameId }} | Sisa {{ item.quota }} Match</p>
                  </div>
                </div>
                <span class="font-mono text-[10px] font-bold text-secondary bg-secondary/10 border border-secondary px-2 py-1 rounded-[6px] uppercase">PLAYING</span>
              </div>

              <!-- Render waiting items -->
              <div v-for="(item, idx) in simWaiting" :key="'wait-' + item.id" class="border-[1.5px] border-retro bg-white p-3 flex items-center justify-between rounded-[10px]" :class="{ 'border-primary bg-primary/[0.02]': simStep === 3 && item.id === '7' }">
                <div class="flex items-center gap-3">
                  <span class="font-mono text-lg font-bold text-retro">#0{{ simPlaying.length + idx + 1 }}</span>
                  <div>
                    <h4 class="font-display font-bold text-sm text-retro flex items-center gap-1.5 uppercase">
                      {{ item.name }}
                      <span v-if="item.fast" class="font-mono text-[8px] font-bold text-primary bg-primary/10 border border-primary/20 px-1 py-0.5 rounded">⭐ FAST TRACK</span>
                    </h4>
                    <p class="font-mono text-[10px] text-retro/70">ID: {{ item.gameId }} | Sisa {{ item.quota }} Match</p>
                  </div>
                </div>
                <span class="font-mono text-[10px] font-bold text-retro/60 border border-retro px-2 py-1 rounded-[6px] uppercase bg-surface-dark">WAITING</span>
              </div>
            </div>
          </div>
          
          <!-- Sync / Action Log Toast inside CRT preview -->
          <div class="absolute bottom-4 left-6 right-6 z-20 bg-white border-[1.5px] border-primary text-primary text-[9px] font-mono font-bold text-center py-2.5 rounded-[8px] flex items-center justify-center gap-1.5 shadow-soft uppercase tracking-widest">
            <span class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span>{{ simLog }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Cara Kerja Section (Preserved content with adapted design) -->
    <section class="border-t-[1.5px] border-retro bg-[#fcfcfc] py-24">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center max-w-2xl mx-auto mb-16">
          <h2 class="font-display text-2xl md:text-3xl font-black text-retro tracking-wider uppercase">Cara Kerja LobbyQ</h2>
          <p class="font-sans text-retro/70 text-xs mt-2 uppercase font-mono font-bold">Tidak perlu notepad, tidak perlu integrasi bot yang rumit. Mulai dalam 3 langkah instan.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="(step, i) in steps" :key="i" class="border-[1.5px] border-retro p-8 bg-white shadow-[3px_3px_0px_#111111] rounded-[10px] flex flex-col justify-between min-h-[240px] transition-all duration-300 hover:-translate-y-1">
            <div>
              <div class="flex items-center justify-between mb-6">
                <div class="font-mono text-lg font-bold text-primary">0{{ i + 1 }} / {{ step.meta || 'STEP' }}</div>
                <div class="w-9 h-9 rounded-[6px] bg-surface-dark border border-retro flex items-center justify-center shrink-0">
                  <component :is="step.icon" class="w-4.5 h-4.5 text-primary" />
                </div>
              </div>
              <h3 class="font-display text-sm font-black text-retro mb-2 uppercase tracking-wider">{{ step.title }}</h3>
              <p class="font-mono text-[10px] text-retro/75 leading-relaxed uppercase tracking-wider font-semibold">{{ step.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="max-w-7xl mx-auto px-6 py-24 text-center">
      <div class="border-[1.5px] border-primary bg-primary/[0.03] p-12 shadow-[6px_6px_0px_#111111] relative overflow-hidden rounded-[10px]">
        <div class="absolute -top-12 -right-12 w-48 h-48 bg-primary opacity-5 rounded-full blur-3xl"></div>
        <div class="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
          <h2 class="font-display text-2xl md:text-4xl font-black text-retro tracking-wider uppercase mb-4">
            SIAP UNTUK MABAR LEBIH RAPI?
          </h2>
          <p class="font-mono text-[10px] text-retro/70 max-w-md mb-8 uppercase tracking-wider font-bold">
            Dapatkan pengalaman mengelola antrean yang mulus, rapi, dan terlihat keren di stream Anda sekarang juga.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 font-mono text-xs font-bold">
            <NuxtLink to="/register" class="btn-primary text-xs px-8 py-3.5 min-w-[180px] tracking-wider uppercase">
              COBA SEKARANG (GRATIS)
            </NuxtLink>
            <NuxtLink to="/login" class="btn-secondary text-xs px-8 py-3.5 min-w-[180px] tracking-wider uppercase">
              MASUK KE DASHBOARD
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { h, ref, reactive, onMounted, onBeforeUnmount } from 'vue'

definePageMeta({
  layout: 'default',
})

useHead({
  title: 'LobbyQ - Manajemen Antrean Mabar untuk Streamer Game',
})

// Custom SVG Icons
const UserIcon = {
  render() {
    return h('svg', { class: 'w-5 h-5 text-primary', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' })
    ])
  }
}

const ClipboardIcon = {
  render() {
    return h('svg', { class: 'w-5 h-5 text-primary', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' })
    ])
  }
}

const ShareIcon = {
  render() {
    return h('svg', { class: 'w-5 h-5 text-primary', fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z' })
    ])
  }
}

const steps = [
  { icon: UserIcon, title: 'Daftar Akun Streamer', desc: 'Buat akun dalam hitungan detik gratis atau masuk dengan cepat menggunakan akun Google.', meta: 'SETUP' },
  { icon: ClipboardIcon, title: 'Kelola Antrean di OBS', desc: 'Sematkan link dashboard di OBS Custom Dock. Tambah, edit, dan jalankan antrean secara inline tanpa modal.', meta: 'OBS DOCK' },
  { icon: ShareIcon, title: 'Bagikan Link Publik', desc: 'Tampilkan link publik /q/username pada chat bot streaming atau overlay agar penonton memantau posisi mereka.', meta: 'SHARE' },
]

// Simulator state
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
  setTimeout(() => { syncIndicator.value = false }, 1000)
}

const runStep = () => {
  simStep.value = (simStep.value + 1) % 4
  triggerSync()

  if (simStep.value === 0) {
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
    simPlaying.value = [
      { id: '1', name: 'Budi', gameId: '12345***', quota: 1, fast: true },
      { id: '2', name: 'Andi', gameId: '67890***', quota: 1, fast: false },
    ]
    simLog.value = 'Streamer menyelesaikan match Budi (Sisa kuota: 1).'
  } else if (simStep.value === 2) {
    simWaiting.value = simWaiting.value.filter(item => item.id !== '3')
    simPlaying.value.push({ id: '3', name: 'Rina', gameId: '11223***', quota: 2, fast: false })
    simLog.value = 'Streamer memindahkan Rina ke dalam status PLAYING.'
  } else if (simStep.value === 3) {
    simWaiting.value.push({ id: '7', name: 'Fajar', gameId: '55667***', quota: 3, fast: false })
    simLog.value = 'Streamer menambahkan "Fajar" ke dalam WAITING list.'
  }
}

let simInterval: any = null
onMounted(() => { simInterval = setInterval(runStep, 4000) })
onBeforeUnmount(() => { if (simInterval) clearInterval(simInterval) })

const features = [
  { icon: '🎮', title: 'Sinkronisasi Real-Time', desc: 'Semua perubahan antrean di-broadcast instan menggunakan Server-Sent Events (SSE). Tanpa reload.' },
  { icon: '📺', title: 'OBS Custom Dock Ready', desc: 'Antarmuka super tipis berukuran 300px-400px yang muat sempurna langsung di panel OBS Dock Anda.' },
  { icon: '🔒', title: 'Keamanan Privasi Game ID', desc: 'Melindungi ID Game penonton Anda dari penyalahgunaan menggunakan masking otomatis di frontend publik.' },
  { icon: '🚫', title: 'Zero Modal Policy', desc: 'Tidak ada popup atau modal dialog yang mengganggu fokus permainan Anda. Semua pengeditan dilakukan secara inline.' },
]
</script>
