# Antrian Farmasi

Aplikasi Antrian Farmasi adalah sistem berbasis web untuk mengelola antrian farmasi secara real-time di Rumah Sakit Keluarga Karawang. Aplikasi ini dirancang menggunakan stack modern (React di frontend dan Node.js di backend) dan mendukung pemanggilan suara (audio) serta pembaruan antrian secara real-time melalui WebSocket.

## 🎯 Fitur Utama
- Manajemen antrian per loket:
  - Loket A: BPJS Obat Racikan
  - Loket B: BPJS Obat Jadi
  - Loket C: Obat Racikan
  - Loket D: Obat Jadi
- Pembaruan real-time:
  - Update dan panggil nomor antrian secara langsung menggunakan WebSocket.
- Panggilan suara:
  - Audio terstruktur untuk membacakan nomor dan loket.
- Penyimpanan terstruktur menggunakan MySQL.

## 🚀 Teknologi
- Frontend: React + Vite + TailwindCSS
- Backend: Node.js + Express
- Database: MySQL
- Real-time: WebSocket (socket / socket.io kompatibel)
- Assets: audio (public/audio)

## Struktur Proyek (ringkasan)
antrian-farmasi/
├── backend/                  # Server Node.js, controller, routes, socket
│   ├── config/
│   │   └── mysqlDB.js
│   ├── controllers/
│   │   ├── antrianController.js
│   │   └── audioController.js
│   ├── data/
│   │   └── dataAudio.json
│   ├── routes/
│   │   ├── antrianRoutes.js
│   │   └── audioRoutes.js
│   ├── sockets/
│   │   ├── antrianSocket.js
│   │   ├── audioSocket.js
│   │   ├── printSocket.js
│   │   └── resetSocket.js
│   ├── .env                   # environment (tidak disertakan di repo)
│   └── server.js
├── frontend/                 # Aplikasi React (Vite)
├── public/
│   ├── audio/                # File audio untuk panggilan antrian
│   └── image/
├── src/                      # (jika frontend berada di root `src/` - sesuaikan)
├── database/                 # Skrip schema & seed (jika ada)
├── .env.example
├── index.html
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
├── README.md
└── LICENSE

> Catatan: Struktur di atas menyesuaikan isi repo saat ini. Pastikan untuk meninjau lokasi frontend (`frontend/` atau `src/`) — beberapa repository menempatkan frontend langsung di `src/`.

## Persyaratan
- Node.js >= 16
- npm atau yarn
- MySQL (server berjalan dan dapat diakses)

## Persiapan dan Menjalankan (Panduan cepat)

1. Clone repository
   - git clone https://github.com/khfdz/antrian-farmasi.git
   - cd antrian-farmasi

2. Backend
   - cd backend
   - Install dependensi:
     - npm install
   - Buat file .env berdasarkan .env.example:
     - cp .env.example .env
     - Contoh nilai .env:
       ```
       PORT=5000
       DB_HOST=localhost
       DB_USER=root
       DB_PASSWORD=your_password
       DB_NAME=antrian_farmasi
       DB_PORT=3306
       ```
   - Siapkan database MySQL:
     - Buat database yang sesuai (contoh: antrian_farmasi)
     - Jalankan skrip schema/seed jika ada di folder database/ (mis. database/schema.sql)
   - Jalankan server:
     - npm run dev  (atau npm start sesuai script di package.json)
   - Server akan berjalan di http://localhost:5000 (atau sesuai PORT pada .env)

3. Frontend
   - Jika frontend berada di folder `frontend/`:
     - cd frontend
     - npm install
     - Salin file environment jika diperlukan (mis. .env)
     - Jalankan:
       - npm run dev
     - Frontend biasanya tersedia di http://localhost:3000 (atau port Vite yang ditampilkan)
   - Jika frontend berada di `src/` di root, jalankan per instruksi package.json di root.

4. Audio & Assets
   - File audio berada di public/audio/
   - Pastikan server static melayani folder public agar file audio dapat diputar di client.

## WebSocket / Real-time
- Backend menyediakan endpoint WebSocket (lihat folder backend/sockets/).
- Client (frontend) harus terkoneksi ke server WebSocket untuk menerima update antrian dan perintah pemanggilan suara.
- Periksa implementasi di backend/sockets/ untuk event yang tersedia (mis. 'call', 'update', 'reset') dan sesuaikan client.

## Deployment
- Pastikan variabel .env diatur untuk lingkungan production.
- Build frontend (jika menggunakan Vite): npm run build
- Serve static build atau gunakan reverse proxy (nginx) untuk mengarahkan request API dan file static.
- Jalankan backend di process manager seperti PM2 atau sebagai service.

## Testing manual
- Tambahkan nomor antrian lewat endpoint API (lihat routes antrianRoutes.js) atau UI admin.
- Pastikan client view (display) terhubung ke socket dan menerima event update.
- Tes pemanggilan suara dengan memicu event call dan verifikasi file audio diputar dengan urutan yang tepat.

## Kontribusi
Terima kasih atas kontribusi! Untuk berkontribusi:
- Fork repository
- Buat branch fitur/bugfix
- Buka pull request dengan deskripsi perubahan
- Sertakan testing steps untuk fitur baru atau bug fix

## Saran Perbaikan (opsional / untuk dikerjakan)
- Tambahkan file .env.example dengan variabel yang jelas.
- Tambahkan skrip database (schema + seed) di folder database/ beserta instruksi.
- Tambahkan dokumentasi API singkat (endpoints) di docs atau di README.
- Tambahkan CI (lint, test) dan aturan coding style.

## Lisensi
Proyek ini dilisensikan di bawah LICENSE yang ada di repo.

## Kontak
Jika butuh bantuan lanjutan atau ada pertanyaan, buka issue di repository atau hubungi pemilik repo.
