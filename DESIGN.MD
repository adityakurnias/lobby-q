# LobbyQ Design System & UX Specification v1.0

## Product Overview

**Product Name:** LobbyQ

**Category:** SaaS

**Purpose:**
Sistem manajemen antrean mabar untuk streamer game online yang menggantikan pencatatan manual menggunakan Notepad.

**Primary Users:**

* Streamer game online
* Usia 15–30 tahun
* Menggunakan desktop dan mobile
* Familiar dengan tools sederhana
* Membutuhkan pengelolaan antrean setiap hari

---

# Design Principles

## Core UX Goals

### Fast

User harus dapat melihat dan mengelola antrean tanpa berpikir.

### Fun

Nuansa gaming modern tanpa terlihat seperti dashboard enterprise.

### Focused

Tidak ada fitur yang mengalihkan perhatian dari tujuan utama: mengelola antrean.

### OBS First

Dashboard streamer dirancang khusus untuk OBS Dock dengan lebar hanya 300–400px.

---

# Brand Identity

## Personality

* Gaming
* Friendly
* Lightweight
* Minimalist

## Color Palette

### Primary

#13A8C7

### Secondary

#1B4A5E

### Surface Accent

#D2F6FB

## Theme

Dark Mode Only

Tidak tersedia Light Mode pada v1.0.

Alasan:

* Lebih nyaman untuk streamer
* Selaras dengan estetika gaming
* Mengurangi kompleksitas desain

---

# Typography

## Primary Font

Inter

## Alternative

Geist

## Typography Rules

* Angka harus mudah dibaca
* Prioritaskan readability dibanding style
* Gunakan font-weight 600 untuk angka statistik

---

# Visual Direction

## Inspiration

Dell Dashboard Style

Karakteristik:

* Profesional
* Bersih
* Tidak berlebihan
* Fokus ke data

## Component Style

### Border Radius

Rounded

8px–12px

### Shadows

Soft Shadow

Tidak menggunakan heavy shadow.

### Animation Level

3/10

Animasi hanya untuk:

* Accordion transition
* List movement
* Toast appearance

Tidak ada animasi dekoratif.

---

# Information Architecture

## Public Pages

### Landing Page

1. Hero
2. Visual Demo
3. Cara Kerja
4. CTA

### Queue Page

/q/{username}

Halaman publik untuk viewer.

### Authentication

Login
Register

---

# OBS Dashboard Layout

## Width Constraint

300px – 400px

Hard Requirement:

Tidak boleh ada horizontal scroll.

## Layout Structure

Top Input Section

↓

Queue Statistics

↓

PLAYING

↓

WAITING

↓

PARKED

---

# Dashboard Metrics

Tampilkan:

* Total WAITING
* Total PLAYING
* Total PARKED

Tidak menampilkan:

* Average Wait Time
* Peak Queue Time
* Total Match Hari Ini

---

# Queue Management

## Supported Actions

### Add Queue

Inline Input

### Edit Queue

Double-click row

### Pause User

Inline Action

### Wake User

Inline Action

### Bulk End Match

Master Action

### End Session

Semua WAITING menjadi PARKED

## Rejected Features

### Drag and Drop

Rejected

Alasan:

* Sulit pada layar OBS sempit
* Berpotensi menyebabkan kesalahan interaksi

---

# Queue Row Design

## Visible Information

Posisi

Contoh:

#1

Nama Viewer

Contoh:

Budi

Masked Game ID

Contoh:

1234***

Sisa Match

Contoh:

Sisa 2 Match

Priority Badge

⭐ Fast Track

---

# Public Queue Page

## Header

Avatar Streamer

Nama Streamer

Status Badge

🔴 LIVE QUEUE

## Sections

### PLAYING

Paling atas

Visual highlight lebih kuat

### WAITING

List utama

### PARKED

Collapsed by default

---

# Viewer Interaction

Viewer hanya dapat:

* Melihat antrean
* Refresh data otomatis

Viewer tidak dapat:

* Join queue
* Edit queue
* Login
* Mengubah data

Public page bersifat read-only.

---

# Empty States

## OBS Dashboard

Belum ada antrean.

Ketik nama viewer di atas untuk memulai.

## Public Queue

Lobi sedang kosong.

Streamer sedang istirahat atau belum membuka pendaftaran mabar.

Tambahkan ilustrasi controller yang sedang di-charge.

---

# Notifications

## OBS Dashboard

Toast Success

Toast Error

Toast Warning

## Public Queue

Tidak ada browser notification.

Gunakan:

* Flash highlight
* Smooth row transition

Saat posisi antrean berubah.

---

# Mobile Experience

## Queue Page

Single Page Layout

Sticky Header

Berisi:

* Avatar
* Nama streamer
* Tombol share

Tidak menggunakan:

* Bottom Navigation
* Hamburger Menu

---

# Component Library

Required Components:

* Toast
* Accordion
* Collapsible
* Skeleton Loading
* Inline Form
* Badge
* Queue Card
* Stats Card

Rejected Components:

* Modal
* Command Palette
* Data Table
* Popup Wizard

---

# UX Rules

## Rule 1

OBS First.

Semua komponen dashboard harus bekerja sempurna pada lebar 300px.

## Rule 2

No Horizontal Scroll.

## Rule 3

Zero Modal Policy.

Semua aksi dilakukan inline.

## Rule 4

Read Only Public Page.

Viewer tidak boleh mengubah data.

## Rule 5

Instant Feedback.

Semua tombol aksi harus memiliki loading state.

## Rule 6

Queue Position Must Be Visible.

Posisi antrean harus langsung terlihat tanpa membuka detail.

## Rule 7

One Screen Priority.

Aksi utama harus terlihat tanpa scroll berlebihan pada OBS Dock.

## Rule 8

Minimal Cognitive Load.

Hanya tampilkan informasi yang dibutuhkan untuk mengelola antrean.
