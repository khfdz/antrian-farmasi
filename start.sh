#!/bin/bash

# Pastikan nvm sudah di-load
export NVM_DIR="$HOME/.nvm"
source "$NVM_DIR/nvm.sh"

# Jalankan frontend di terminal baru dengan Node.js v22
gnome-terminal -- bash -c "source ~/.nvm/nvm.sh && nvm use 22 && cd frontend && npm install && npm run dev; exec bash"

# Jalankan backend di terminal baru dengan Node.js v22
gnome-terminal -- bash -c "source ~/.nvm/nvm.sh && nvm use 22 && cd backend && npm install && npm start; exec bash"
