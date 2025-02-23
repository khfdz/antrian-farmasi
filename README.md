Antrian Farmasi

Aplikasi Antrian Farmasi adalah sistem berbasis web untuk mengelola antrian farmasi secara real-time di Rumah Sakit Keluarga Karawang. Aplikasi ini dirancang menggunakan teknologi modern seperti React, Vite, Node.js, Express.js, MySQL, TailwindCSS, dan WebSocket untuk memasikan performa yang optimal dan user experience yang baik.

# 🎯 Fitur Utama
- Manejemen Antrian Loket:
    - Loket A: BPJS Obat Racikan
    - Loket B: BPJS Obat Jadi
    - Loket C: Obat Racikan
    - Loket D: Obat Jadi
- Real-Time Updates :
  - Update dan panggil nomor antrian secara langsung menggunakan WebSocket.
- Integrasi Database: Penyimpanan data antrian yang terstruktur menggunakan MySQL.

# 🚀 Teknologi yang Digunakan
Frontend: React + Vite + TailwindCSS
Backend: Node.js + Express
Database: MySQL
Real-Time Communication: WebSocket

# 🛠️ Cara Instalasi & Menjalankan Proyek
Persyaratan Minimum:
- Node.js (versi LTS)
- MySQL Server
- Printer Thermal

# Langkah Instalasi:
- Clone repository https://github.com/username/antrian-farmasi.git
- cd antrian-farmasi

# Setup Backend
- cd backend
- npm install
- npm start

# Setup Frontend
- cd frontend
- npm install
- npm run dev

# Setup Database
- d
- dad
- adad

# Setup .env di folder frontend
```
VITE_LOCAL=5000
VITE_NETWORK=192.168.1.128:5000
```
- Cek ip menggunakan ipconfig
- Ganti .env di folder frontend menggunakan ip komputer yang akan digunakan

# Setup server.js di folder backend
```
const allowedOrigins = [
  "http://192.168.1.14:5173",
  "http://192.168.1.14:5000",
  "http://192.168.1.128:5173",
  "http://192.168.1.128:5000",
  "http://localhost:5173",
  "http://192.168.x.x:5173",
];
```
- Tambahkan ip yang akan digunakan kedalam allowedOrigins
- Buat 2 dengan port 5000 dan 5173

# 📣 Alur Kerja
```
Page View : 192.168.1.xxx/view
Page Print : 192.168.1.xxx/print
Page Call 192.168.1.xxx/call
```
- Page View berfungsi untuk menampilkan jumlah nomor antrian dan memproses pemanggilan nomor antrian pasien.
- Page Print berfungsi sebagai halaman yang digunakan oleh admin untuk mencetak nomor antrian pasien menggunakan printer thermal.
- Page Call berfungsi sebagai halaman yang digunakan oleh admin untuk memanggil nomor antrian pasien ke loket tujuan.

# 📂 Struktur Proyek
```
antrian-farmasi/
├── backend/
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
│   │   ├── resetSocket.js
│   ├── .env
│   └── server.js
├── frontend/
├── public/
│   ├── audio/
│   │   ├── 1.mp3
│   │   ├── 2.mp3
│   │   ├── 3.mp3
│   │   ├── 4.mp3
│   │   ├── 5.mp3
│   │   ├── 6.mp3
│   │   ├── 7.mp3
│   │   ├── 8.mp3
│   │   ├── 9.mp3
│   │   ├── 10.mp3
│   │   ├── 11.mp3
│   │   ├── 100.mp3
│   │   ├── A.mp3
│   │   ├── B.mp3
│   │   ├── C.mp3
│   │   ├── D.mp3
│   │   ├── belass.mp3
│   │   ├── bell.mp3
│   │   ├── loket1.mp3
│   │   ├── loket2.mp3
│   │   ├── no_antrian.mp3
│   │   ├── non_racikan.mp3
│   │   ├── puluh.mp3
│   │   ├── racikan.mp3
│   │   └── ratus.mp3
│   ├── image/
│   │   ├── logo.png
│   │   ├── logoBersih.png
│   │   ├── logoPanjang.png
│   │   ├── logoPanjangAlamat.png
│   │   ├── logoPanjangLengkap.png
├── src/
│   ├── components/
│   │   ├── Footer.jsx
│   │   ├── FooterAdm.jsx
│   │   ├── Navbar.jsx
│   ├── data/
│   │   ├── speedAudio.json
│   ├── pages/
│   │   ├── PageCall.jsx
│   │   ├── PagePrint.jsx
│   │   ├── PageView.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
├── .env
├── index.html
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
├── README.md
└── LICENSE
```

# 📜 Penjelasan Struktur
- backend/: Direktori backend berisi semua file untuk server Node.js, termasuk konfigurasi database, kontroler, rute, layanan, dan socket.
- frontend/: Direktori frontend untuk aplikasi React.
- public/audio/: File audio untuk memanggil antrian.
- database/: Script schema dan seed untuk menginisialisasi database.
- .env.example: Contoh konfigurasi environment.
- README.md: Dokumentasi proyek.
- LICENSE: Lisensi proyek.

- 
