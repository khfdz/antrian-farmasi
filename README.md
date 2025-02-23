# 💊 Antrian Farmasi

Aplikasi Antrian Farmasi adalah sistem berbasis web untuk mengelola antrian farmasi secara real-time di Rumah Sakit Keluarga Karawang. Aplikasi ini dirancang menggunakan teknologi modern seperti React, Vite, Node.js, Express.js, MySQL, TailwindCSS, dan WebSocket untuk memastikan performa yang optimal dan pengalaman pengguna yang baik

# 🎯 Fitur Utama
- Manejemen Antrian Loket:
    - Loket A: BPJS Obat Racikan
    - Loket B: BPJS Obat Jadi
    - Loket C: Obat Racikan
    - Loket D: Obat Jadi
- Real-Time Updates :
    - Update dan panggil nomor antrian secara langsung menggunakan WebSocket.
- Integrasi Database: 
    - Penyimpanan data antrian yang terstruktur menggunakan MySQL.

# 🚀 Teknologi yang Digunakan
- Frontend: React + Vite + TailwindCSS
- Backend: Node.js + Express
- Database: MySQL
- Real-Time Communication: WebSocket

# 🛠️ Cara Instalasi & Menjalankan Proyek
✅ Persyaratan Minimum:
- Node.js (versi LTS)
- MySQL Server
- Printer Thermal

📌 Langkah Instalasi:
- Clone repository https://github.com/username/antrian-farmasi.git
- cd antrian-farmasi

Setup Backend
- cd backend
- npm install
- npm start

Setup Frontend
- cd frontend
- npm install
- npm run dev

Setup Database
- d
- dad
- adad

Setup .env di folder frontend
```
VITE_LOCAL=5000
VITE_NETWORK=192.168.1.128:5000
```
- Cek ip menggunakan ipconfig
- Ganti .env di folder frontend menggunakan ip komputer yang akan digunakan

Setup server.js di folder backend
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
📘 Penjelasan:  
Struktur folder ini dibagi menjadi beberapa bagian utama: backend, frontend, public, dan src. Berikut adalah penjelasan dari masing-masing folder dan fungsinya: 

📁 antrian-farmasi/  
Root folder dari proyek antrian farmasi yang berisi file konfigurasi utama dan sub-folder untuk backend, frontend, serta aset publik.

📂 backend/  
Folder ini berisi seluruh logika dan konfigurasi server (Node.js) untuk sistem antrian farmasi.
- config/
    - mysqlDB.js: File konfigurasi koneksi ke database MySQL.
- controllers/
    - antrianController.js: Mengelola logika utama terkait antrian pasien (menambah, memanggil, mereset antrian, dll.).
    - audioController.js: Bertanggung jawab mengelola pemutaran audio untuk pemanggilan antrian.
- data/
    - dataAudio.json: Data konfigurasi dan mapping file audio untuk pemanggilan nomor antrian.
- routes/
    - antrianRoutes.js: Rute (endpoint) untuk mengakses fitur terkait antrian.
    - audioRoutes.js: Rute (endpoint) untuk mengakses fitur terkait audio.
- sockets/
    - antrianSocket.js: Mengatur komunikasi tampilan antrian secara real-time
    - audioSocket.js: Mengatur pemutaran audio secara real-time.
    - printSocket.js: Mengatur proses pencetakan nomor antrian secara real-time.
    - resetSocket.js: Mengatur proses reset antrian secara real-time.
- .env: File konfigurasi lingkungan untuk menyimpan variabel sensitif (contoh: kredensial database).
- server.js: Entry point utama backend untuk menjalankan server Node.js dan mengatur middleware, rute, serta socket.

📂 frontend/    
Folder ini disiapkan untuk mengatur logika dan antarmuka pengguna (UI) berbasis React di sisi klien.

📂 public/  
Folder ini berisi aset statis yang dapat diakses langsung dari browser.
- audio/: Kumpulan file audio untuk pemanggilan nomor antrian, termasuk:
    - Angka (1.mp3, 2.mp3, dst.)
    - Huruf (A.mp3, B.mp3, dst.)
    - Informasi tambahan (loket1.mp3, no_antrian.mp3, dll.)
- image/: Kumpulan aset gambar seperti logo dalam berbagai variasi:
    - logo.png: Logo utama.
    - logoBersih.png: Logo tanpa latar.
    - logoPanjang.png: Logo versi horizontal.
    - logoPanjangAlamat.png: Logo dengan alamat.
    - logoPanjangLengkap.png: Logo lengkap dengan detail.
      
📂 src/  
Folder utama untuk kode sumber (React) di sisi frontend.
- components/: Kumpulan komponen UI yang dapat digunakan ulang.
    - Footer.jsx: Komponen footer umum.
    - FooterAdm.jsx: Komponen footer khusus admin.
    - Navbar.jsx: Komponen navbar (navigasi utama).
- data/: Kumpulan data statis atau konfigurasi.
    - speedAudio.json: Konfigurasi kecepatan pemutaran audio.
- pages/: Kumpulan halaman utama di aplikasi React.
    - PageCall.jsx: Halaman untuk memanggil nomor antrian ke loket tujuan.
    - PagePrint.jsx: Halaman untuk mencetak nomor antrian menggunakan printer thermal.
    - PageView.jsx: Halaman untuk menampilkan nomor antrian dan proses pemanggilan secara real-time.
- App.css: Gaya global aplikasi.
- App.jsx: Komponen utama yang merangkum seluruh aplikasi.
- index.css: Gaya tambahan untuk proyek.
- main.jsx: Entry point utama React (merender aplikasi ke DOM).

📄 File Konfigurasi Lainnya
- .env: File untuk menyimpan variabel lingkungan.
- index.html: Template utama HTML untuk merender aplikasi React.
- postcss.config.js: Konfigurasi PostCSS untuk pemrosesan CSS.
- tailwind.config.js: Konfigurasi Tailwind CSS.
- vite.config.js: Konfigurasi Vite (build tool untuk aplikasi React).
- README.md: Dokumentasi proyek ini.
- LICENSE: Lisensi proyek ini.

📌 Catatan
- backend digunakan untuk mengatur logika bisnis dan komunikasi dengan database.
- frontend digunakan untuk membangun antarmuka aplikasi berbasis React.
- public digunakan untuk menyimpan aset statis yang diakses langsung oleh klien.
- src berisi kode utama React untuk menjalankan aplikasi di sisi klien.

## 🎉 Kontributor Utama

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/khfdz">
        <img src="https://github.com/khfdz.png" width="100px;" alt="Dhika Hafidz"/>
        <br />
        <sub><b>Dhika Hafidz</b></sub>
      </a>
      <br />
      🚀 Pengembang Utama
    </td>
    <td align="left" valign="middle">
      <b>khfdz</b>  
      <br />
      📸 <a href="https://instagram.com/khfdz">instagram.com/khfdz</a>
      <br />
      🎨 <a href="https://behance.com/khfdz">behance.com/khfdz</a>
    </td>
  </tr>
</table>

💡 **Ingin berkontribusi?** Jangan ragu untuk melakukan pull request atau membuka issue!

