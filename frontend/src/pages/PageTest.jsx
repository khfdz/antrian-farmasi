import { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import speedAudio from "../data/speedAudio.json";

const localAccess = import.meta.env.VITE_NETWORK;
const socket = io(`http://${localAccess}`);

const PageTest = () => {
  const [audioQueue, setAudioQueue] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);

  const playAudioWithTrimming = (audioPath) => {
    return new Promise((resolve, reject) => {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const audio = new Audio(audioPath);
      audio.preload = 'auto';
    
      audio.onloadeddata = async () => {
        try {
          const response = await fetch(audioPath);
          const arrayBuffer = await response.arrayBuffer();
          const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
          
          // Misalnya kita tahu bahwa kata-kata diucapkan dalam 20% durasi
          const wordDuration = 0.6; // 20% dari durasi audio
          const silenceDuration = 0.4; // 80% dari durasi audio adalah silence
      
          const duration = audioBuffer.duration;
      
          // Menghitung waktu berapa lama audio akan diputar
          const playTime = wordDuration * duration;
      
          const source = audioContext.createBufferSource();
          source.buffer = audioBuffer;
      
          // Memulai audio dari 0 detik, lalu berhenti setelah 20% durasi
          source.connect(audioContext.destination);
      
          source.start(0);  // Mulai audio
          source.stop(playTime);  // Hentikan audio setelah 20% durasi
          
          console.log(`Playing audio from ${audioPath}, stopping at ${playTime}s`);
      
          // Menyelesaikan setelah audio selesai
          source.onended = () => {
            resolve(); // Resolving Promise ketika audio selesai
          };
        } catch (error) {
          reject(error); // Reject jika ada error
        }
      };
    });
  };

  const playAudioSequence = async () => {
    if (isPlaying || audioQueue.length === 0) return;
    setIsPlaying(true);

    let queue = [...audioQueue];
    setAudioQueue([]);

    for (const [index, audioPath] of queue.entries()) {
      if (!audioPath) continue;

      const audioConfig = speedAudio[audioPath] || {
        playbackRate: 1,
        delay: 0,
      };

      const { playbackRate, delay } = audioConfig;
      const audio = new Audio(audioPath);
      audio.playbackRate = playbackRate;
      audio.preload = "auto";

      // 🔊 Logging info
      console.log(`🎧 #${index + 1}`);
      console.log(`Audio: ${audioPath}`);
      console.log(`Playback Rate: ${playbackRate}`);
      console.log(`Delay after end: ${delay} ms`);

      try {
        // Menunggu hingga audio selesai diputar sebelum melanjutkan ke audio berikutnya
        await playAudioWithTrimming(audioPath);
        
        // Jika ada delay yang diatur, kita tunggu sejenak
        if (delay !== 0) {
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      } catch (error) {
        console.error("Gagal memutar audio:", error);
      }
    }

    setIsPlaying(false);
  };

  const handlePlayCallAudio = async (data) => {
    try {
      const response = await axios.get(`http://${localAccess}/api/audio/call`, {
        params: {
          letter: data.letter,
          number: data.number,
          loket: data.loket,
          type: data.type,
        },
      });

      const audioSequence = response.data?.sequence;

      if (audioSequence && Array.isArray(audioSequence)) {
        setAudioQueue((prev) => [...prev, ...audioSequence]);
      } else {
        console.error("Audio sequence tidak ditemukan atau tidak valid:", audioSequence);
      }
    } catch (error) {
      console.error("Error saat memanggil API atau memutar audio:", error);
    }
  };

  useEffect(() => {
    socket.emit("joinRoom", "callRoom");
    socket.on("playCallAudio", handlePlayCallAudio);
    return () => {
      socket.off("playCallAudio", handlePlayCallAudio);
    };
  }, []);

  useEffect(() => {
    playAudioSequence();
  }, [audioQueue]);

  return null; // Tidak ada tampilan UI
};

export default PageTest;
