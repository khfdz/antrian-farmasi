@echo off
REM Masuk ke folder backend
cd backend

REM Menjalankan server Node.js
start cmd /k "node server.js"

REM Tunggu 5 detik agar server aktif (bisa disesuaikan)
timeout /t 5 /nobreak >nul

REM Buka di Google Chrome dengan alamat IP yang diinginkan
start chrome http://192.168.1.129:5000/view

exit
