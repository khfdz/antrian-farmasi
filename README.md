Antrian Farmasi

Aplikasi Antrian Farmasi adalah sistem berbasis web untuk mengelola antrian farmasi secara real-time di Rumah Sakit Keluarga Karawang. Aplikasi ini dirancang menggunakan teknologi modern seperti React, Vite, Node.js, Express.js, MySQL, TailwindCSS, dan WebSocket untuk memasikan performa yang optimal dan user experience yang baik.

🎯 Fitur Utama
- Manejemen Antrian Loket:
    - Loket A: BPJS Obat Racikan
    - Loket B: BPJS Obat Jadi
    - Loket C: Obat Racikan
    - Loket D: Obat Jadi
- Real-Time Updates :
  - Update dan panggil nomor antrian secara langsung menggunakan WebSocket.
- Integrasi Database: Penyimpanan data antrian yang terstruktur menggunakan MySQL.

🚀 Teknologi yang Digunakan
Frontend: React + Vite + TailwindCSS
Backend: Node.js + Express
Database: MySQL
Real-Time Communication: WebSocket

📂 Struktur Proyek
antrian-farmasi/
├── backend/                              # Server backend
│   ├── config/                             # Konfigurasi aplikasi
│   │   ├── mysqlDB.js                        - Konfigurasi untuk koneksi ke database
│   ├── controllers/                        # Logika pengelolaan request
│   │   ├── queueController.js                - Controller untuk antrian
│   │   ├── audioController.js                - Controller untuk audio
│   ├── data/                               # Data statis dalam format JSON
│   │   ├── audioData.json                    - Data audio JSON
│   ├── routes/                             # Rute API
│   │   ├── queueRoutes.js                    - Rute untuk antrian
│   │   ├── audioRoutes.js                    - Rute untuk audio
│   ├── services/                           # Layanan untuk logika bisnis atau pemrosesan data
│   │   ├── emitAntrianUpdate.js              - Emit pembaruan antrian dari database
│   ├── scripts/                            # Script otomatisasi
│   │   ├── initializeDatabase.js             - Script untuk membuat tabel di database
│   ├── sockets/                            # WebSocket untuk komunikasi real-time
│   │   ├── antrianSocket.js                  - WebSocket untuk antrian
│   │   ├── audioSocket.js                    - WebSocket untuk audio
│   ├── .env                                # File konfigurasi environment
│   ├── server.js                           # Entry point server untuk aplikasi Express
├── frontend/
├── public/                     # Folder untuk file publik
│   ├── audio/                  # Folder untuk file audio
│   │   ├── 1.mp3               # File audio nomor 1
│   │   ├── 2.mp3               # File audio nomor 2
│   │   ├── 3.mp3               # File audio nomor 3
│   │   ├── 4.mp3               # File audio nomor 4
│   │   ├── 5.mp3               # File audio nomor 5
│   │   ├── 6.mp3               # File audio nomor 6
│   │   ├── 7.mp3               # File audio nomor 7
│   │   ├── 8.mp3               # File audio nomor 8
│   │   ├── 9.mp3               # File audio nomor 9
│   │   ├── 10.mp3              # File audio nomor 10
│   │   ├── 11.mp3              # File audio nomor 11
│   │   ├── 100.mp3             # File audio nomor 100
│   │   ├── A.mp3               # File audio huruf A
│   │   ├── B.mp3               # File audio huruf B
│   │   ├── C.mp3               # File audio huruf C
│   │   ├── D.mp3               # File audio huruf D
│   │   ├── belass.mp3          # File audio kata "belas"
│   │   ├── bell.mp3            # File audio bel notifikasi
│   │   ├── loket1.mp3          # File audio loket 1
│   │   ├── loket2.mp3          # File audio loket 2
│   │   ├── no_antrian.mp3      # File audio untuk nomor antrian
│   │   ├── non_racikan.mp3     # File audio untuk "non racikan"
│   │   ├── puluh.mp3           # File audio kata "puluh"
│   │   ├── racikan.mp3         # File audio untuk "racikan"
│   │   ├── ratus.mp3           # File audio kata "ratus"




  

├── frontend/               # Aplikasi frontend
├── database/               # Script database (schema & seed)
├── .env.example            # Contoh file environment
├── .gitignore              # File/folder yang diabaikan git
├── README.md               # Dokumentasi proyek
└── LICENSE                 # Lisensi proyek


bash
Copy
Edit
dwdw
lwdkwd
