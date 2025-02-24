import { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Swal from "sweetalert2";
import speedAudio from "../data/speedAudio.json";

const localAccess = import.meta.env.VITE_NETWORK;
const socket = io(`http://${localAccess}`);

const PageView = () => {
  const [bpjsRacikanData, setBpjsRacikanData] = useState(null);
  const [bpjsJadiData, setBpjsJadiData] = useState(null);
  const [racikanData, setRacikanData] = useState(null);
  const [jadiData, setJadiData] = useState(null);
  const [audioQueue, setAudioQueue] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);

  const playAudioSequence = async () => {
    if (isPlaying || audioQueue.length === 0) return;
    setIsPlaying(true);

    let queue = [...audioQueue];
    setAudioQueue([]);

    for (const audioPath of queue) {
      if (!audioPath) continue;

      const { playbackRate = 1, delay = 0 } = speedAudio[audioPath] || {};
      await playAudioWithSpeed(audioPath, playbackRate, delay);
    }

    setIsPlaying(false);
  };

  const playAudioWithSpeed = (path, playbackRate, delay) => {
    return new Promise((resolve) => {
      const audio = new Audio(path);
      audio.playbackRate = playbackRate;
      audio.preload = "auto";

      audio.onloadedmetadata = () => {
        const duration = (audio.duration / playbackRate) * 1000;
        const waitTime = Math.max(0, duration + delay);

        audio
          .play()
          .catch((error) => console.error("Error playing audio:", error));

        setTimeout(resolve, waitTime);
      };

      audio.onended = resolve;
    });
  };

  useEffect(() => {
    if (audioQueue.length > 0) playAudioSequence();
  }, [audioQueue]);

  useEffect(() => {
    socket.on("queueReset", () => {
      Swal.fire({
        title: "Antrian Direset!",
        text: "Seluruh antrian telah direset oleh sistem.",
        icon: "info",
        confirmButtonText: "OK",
        timer: 5000,
      });

      fetchInitialData();
    });

    return () => {
      socket.off("queueReset");
    };
  }, []);

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
        setAudioQueue((prevQueue) => [...prevQueue, ...audioSequence]);

        const colorClass = ["A", "B"].includes(data.letter)
          ? "bg-biru1"
          : "bg-hijau1";

        Swal.fire({
          icon: "info",
          iconColor: "#FF5733",
          html: `
            <div class="flex flex-col items-center justify-center text-center p-6">
              <span class="text-4xl font-bold text-gray-700 mb-6 animate-fade-in">Panggilan Untuk Antrian</span>
              <div class="text-6xl font-bold text-white animate-bounce ${colorClass} px-6 py-2 rounded-xl shadow-lg">
                ${data.letter} ${data.number}
              </div>
              <div class="text-4xl text-gray-700 font-bold mt-6">Silakan menuju</div>
              <span class="text-white mt-6 text-5xl font-bold ${colorClass} px-6 py-2 rounded-xl shadow-lg animate-bounce">
                LOKET ${data.loket}
              </span>
            </div>`,
          showConfirmButton: false,
          timer: 19000,
          customClass: { popup: "bg-white shadow-lg rounded-lg p-6" },
        });
      } else {
        console.error(
          "Audio sequence tidak ditemukan atau tidak valid:",
          audioSequence
        );
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

  const fetchInitialData = async () => {
    try {
      const urls = [
        "bpjs/obat-racikan/latest",
        "bpjs/obat-jadi/latest",
        "obat-racikan/latest",
        "obat-jadi/latest",
      ];
      const responses = await Promise.all(
        urls.map((url) => axios.get(`http://${localAccess}/api/antrian/${url}`))
      );

      setBpjsRacikanData(responses[0].data.no_antrian);
      setBpjsJadiData(responses[1].data.no_antrian);
      setRacikanData(responses[2].data.no_antrian);
      setJadiData(responses[3].data.no_antrian);
    } catch (error) {
      console.error("Error loading initial data:", error);
    }
  };

  useEffect(() => {
    fetchInitialData();
    [
      "bpjs-obat-racikan",
      "bpjs-obat-jadi",
      "obat-racikan",
      "obat-jadi",
    ].forEach((room) => socket.emit("joinRoom", room));

    return () => {
      [
        "bpjs-obat-racikan",
        "bpjs-obat-jadi",
        "obat-racikan",
        "obat-jadi",
      ].forEach((room) => socket.off(`antrianUpdated-${room}`));
    };
  }, []);

  return (
    <div className="bg-gray-200 w-screen min-h-screen flex flex-col items-center justify-center">
      <Navbar />
      <div className="mt-28 mb-28 px-12 py-4 flex flex-wrap gap-12 w-full justify-center items-center">
        {[
          {
            label: "Obat Non Racikan",
            data: bpjsJadiData,
            color: "bg-biru1",
            prefix: "A",
          },
          {
            label: "Obat Racikan",
            data: bpjsRacikanData,
            color: "bg-biru1",
            prefix: "B",
          },
          {
            label: "Obat Non Racikan",
            data: jadiData,
            color: "bg-hijau1",
            prefix: "C",
          },
          {
            label: "Obat Racikan",
            data: racikanData,
            color: "bg-hijau1",
            prefix: "D",
          },
        ].map(({ label, data, color, prefix }, index) => (
          <div
            key={index}
            className={`${color} w-[29.5vh] md:w-[35vh] h-auto text-center rounded-md shadow-xl`}>
            <h2 className="bg-white p-2 text-2xl rounded-t-md">{label}</h2>
            <p className="text-6xl text-white w-full py-12 items-center justify-center shadow-xl">
              {prefix} {data !== null ? data : "0"}
            </p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default PageView;
