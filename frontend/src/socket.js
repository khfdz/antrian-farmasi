import { io } from "socket.io-client";

// Pastikan URL backend sesuai dengan konfigurasi Anda
const socket = io("http://localhost:5000");

export default socket;
