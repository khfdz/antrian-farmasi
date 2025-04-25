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
      const config = speedAudio[audioPath] || {};
      const spokenPercent = config.spokenPercent ?? 0.8; 
  
      fetch(audioPath)
        .then(res => res.arrayBuffer())
        .then(buffer => audioContext.decodeAudioData(buffer))
        .then(audioBuffer => {
          const duration = audioBuffer.duration;
          const playTime = duration * spokenPercent;
  
          const source = audioContext.createBufferSource();
          source.buffer = audioBuffer;
          source.connect(audioContext.destination);
          source.start(0);
          source.stop(playTime);
  
          console.log(`🔉 Play ${audioPath} for ${playTime.toFixed(2)}s (from total ${duration.toFixed(2)}s)`);
          console.log(`🎚 Spoken Percent: ${spokenPercent}`);
  
          source.onended = () => {
            resolve();
          };
        })
        .catch(reject);
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
