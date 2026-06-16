# LobbyQ

LobbyQ adalah sistem manajemen antrean *mabar* (main bareng) interaktif yang dirancang khusus untuk para streamer game online. Dengan antarmuka bernuansa **retro-tech / neo-brutalist**, aplikasi ini mempermudah streamer mengelola *viewer* yang ingin ikut bermain secara adil, rapi, dan transparan (bisa diintegrasikan sebagai *overlay* di OBS).

## Fitur Utama

- **Queue Management**: Kelola antrean *viewer* ke dalam tiga kategori:
  - **Waiting List**: Pemain yang menunggu giliran bermain.
  - **Playing**: Pemain yang saat ini sedang aktif bermain bersama streamer.
  - **Parked List**: Pemain yang ditangguhkan (pause) karena tidak merespons atau sedang AFK.
- **Fast Track**: Berikan prioritas antrean untuk *viewer* khusus (misal: *subscriber*, pendonasi) agar diprioritaskan di posisi atas.
- **Interactive Dashboard**: Streamer dapat menambah antrean secara manual, atau mengedit data (Nama, ID Game, Sisa Kuota) secara cepat hanya dengan fitur *Double Click Edit*.
- **Bulk Match Complete**: Selesaikan sesi banyak pemain secara sekaligus dengan sekali klik.
- **Interactive Tour Guide**: Menggunakan `driver.js` untuk memberikan *walkthrough* fitur bagi streamer yang baru pertama kali menggunakan dashboard.

## Tech Stack

Proyek ini dibangun menggunakan:
- [Nuxt 4](https://nuxt.com/) / Vue 3
- [Pinia](https://pinia.vuejs.org/) untuk *State Management*
- [Tailwind CSS](https://tailwindcss.com/) dengan modifikasi khusus (*Neo-Brutalist design*)
- [Driver.js](https://driverjs.com/) untuk *Product Tour*

---

## Setup & Instalasi

Pastikan Anda sudah menginstal [Bun](https://bun.sh/) di komputer Anda.

1. **Clone repository ini**
   ```bash
   git clone https://github.com/your-username/lobby-q.git
   cd lobby-q
   ```

2. **Install dependensi**
   Aplikasi ini menggunakan `bun` sebagai package manager utama.
   ```bash
   bun install
   ```

3. **Menjalankan Development Server**
   Jalankan server pada `http://localhost:3000`:
   ```bash
   bun run dev
   ```

4. **Build untuk Production**
   Untuk men-deploy aplikasi:
   ```bash
   bun run build
   ```

## Integrasi OBS

Tampilan antrean dapat disematkan ke dalam OBS Studio menggunakan fitur **Browser Source**. Anda dapat mengambil URL khusus publik untuk menampilkan daftar antrean secara *real-time* dengan latar transparan tanpa mengganggu siaran game utama Anda.

---
*Dibuat oleh [SYNCHRONIZETEAMS](https://synchronizeteams.com)*
