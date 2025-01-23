import React, { useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";

// const socket = io("http://localhost:5000");
const socket = io("http://192.168.1.200:5000"); // Pastikan menghubungkan ke IP laptop backend


const PageViewAndCall = () => {
  // Fungsi untuk memutar audio secara berurutan
  const playAudioSequence = async (audioSequence) => {
    for (const audioPath of audioSequence) {
      const audio = new Audio(audioPath);
      try {
        await audio.play();
        await new Promise((resolve) => {
          audio.onended = resolve; // Tunggu hingga audio selesai sebelum lanjut
        });
      } catch (error) {
        console.error("Gagal memutar audio:", error);
      }
    }
  };

  // Fungsi untuk menangani event "playCallAudio"
  const handlePlayCallAudio = async (data) => {
    console.log("Menerima data untuk memutar audio:", data);

    try {
      // Panggil API untuk mendapatkan urutan audio
      const response = await axios.get(
        `http://localhost:5000/api/audio/call?letter=${data.section}&number=${data.queueNumber}&loket=${data.loket}`
      );
      const audioSequence = response.data.sequence;

      console.log("Memutar urutan audio:", audioSequence);
      await playAudioSequence(audioSequence); // Putar audio secara berurutan
    } catch (error) {
      console.error("Error saat memanggil API atau memutar audio:", error);
    }
  };

  useEffect(() => {
    // Gabung ke room "callRoom" saat komponen dimuat
    socket.emit("joinRoom", "callRoom");

    // Dengarkan event "playCallAudio" dari server
    socket.on("playCallAudio", handlePlayCallAudio);

    // Bersihkan listener saat komponen di-unmount
    return () => {
      socket.off("playCallAudio", handlePlayCallAudio);
    };
  }, []);

  return (
    <div>
      <h1>Page View & Call</h1>
      <p>Audio aktif. Menunggu panggilan...</p>
    </div>
  );
};

export default PageViewAndCall;
