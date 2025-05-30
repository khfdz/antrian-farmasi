import { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import speedAudio from "../data/speedAudio.json";

const localAccess = import.meta.env.VITE_NETWORK;
const socket = io(`http://${localAccess}`);

const PageView = () => {
  const [audioQueue, setAudioQueue] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);

  // State untuk data antrian tiap kategori
  const [queueData, setQueueData] = useState({
    "bpjs/obat-jadi": null,
    "bpjs/obat-racikan": null,
    "obat-jadi": null,
    "obat-racikan": null,
  });

  // Fungsi fetch data antrian untuk 1 tipe
  const fetchQueueData = async (type) => {
    try {
      const res = await axios.get(`http://${localAccess}/api/antrian/${type}/0`);
      const queueList = res.data;
      if (queueList.length > 0) {
        // Ambil antrian dengan waktu paling lama
        const oldestQueue = queueList.reduce((oldest, curr) =>
          new Date(curr.waktu) < new Date(oldest.waktu) ? curr : oldest
        );
        return oldestQueue;
      }
      return null;
    } catch (err) {
      console.error("Error fetching queue data:", err);
      return null;
    }
  };

  // Fungsi fetch semua antrian sekaligus
  const fetchAllQueues = async () => {
    const bpjsJadi = await fetchQueueData("bpjs/obat-jadi");
    const bpjsRacikan = await fetchQueueData("bpjs/obat-racikan");
    const jadi = await fetchQueueData("obat-jadi");
    const racikan = await fetchQueueData("obat-racikan");

    setQueueData({
      "bpjs/obat-jadi": bpjsJadi,
      "bpjs/obat-racikan": bpjsRacikan,
      "obat-jadi": jadi,
      "obat-racikan": racikan,
    });
  };

  // Play audio sequence
  const playAudioSequence = async () => {
    if (isPlaying || audioQueue.length === 0) return;
    setIsPlaying(true);

    let queue = [...audioQueue];
    setAudioQueue([]);

    for (const audioPath of queue) {
      if (!audioPath) continue;

      const audioConfig = speedAudio[audioPath] || { playbackRate: 1, delay: 0 };
      const { delay } = audioConfig;

      try {
        await playAudioWithTrimming(audioPath);
        if (delay !== 0) await new Promise((r) => setTimeout(r, delay));
      } catch (error) {
        console.error("Gagal memutar audio:", error);
      }
    }

    setIsPlaying(false);
  };

  const playAudioWithTrimming = (audioPath) => {
    return new Promise((resolve, reject) => {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const config = speedAudio[audioPath] || {};
      const spokenPercent = config.spokenPercent ?? 0.8;

      fetch(audioPath)
        .then((res) => res.arrayBuffer())
        .then((buffer) => audioContext.decodeAudioData(buffer))
        .then((audioBuffer) => {
          const duration = audioBuffer.duration;
          const playTime = duration * spokenPercent;

          const source = audioContext.createBufferSource();
          source.buffer = audioBuffer;
          source.connect(audioContext.destination);
          source.start(0);
          source.stop(playTime);

          source.onended = () => resolve();
        })
        .catch(reject);
    });
  };

  // Handle event socket playCallAudio
  const handlePlayCallAudio = (data) => {
    if (Array.isArray(data.sequence)) {
      setAudioQueue((prev) => [...prev, ...data.sequence]);

      const colorClass = data.letter === "A" || data.letter === "B" ? "bg-biru1" : "bg-hijau1";

      Swal.fire({
        icon: "info",
        iconColor: "#FF5733",
        html: `
        <div class="flex flex-col items-center justify-center text-center p-6 w-full max-w-[100%]">
          <span class="text-4xl font-bold text-gray-700 mb-6 animate-fade-in whitespace-nowrap">
            Panggilan Untuk Antrian
          </span>
          <div class="text-6xl font-bold text-white animate-bounce ${colorClass} px-6 py-2 rounded-xl shadow-lg">
            ${data.letter} ${data.number}
          </div>
          <div class="text-4xl text-gray-700 font-bold mt-6">
            <span class="mb-4 whitespace-nowrap">Silakan menuju</span>
          </div>
          <span class="text-white mt-6 text-5xl font-bold ${colorClass} px-6 py-2 rounded-xl shadow-lg animate-bounce">
            LOKET ${data.loket}
          </span>
        </div>
        `,
        showConfirmButton: false,
        timer: 13000,
        customClass: {
          popup: "bg-white shadow-lg rounded-lg p-6",
        },
      });
    }
  };

  // efek untuk memulai play audio jika queue audio berubah
  useEffect(() => {
    playAudioSequence();
  }, [audioQueue]);

  // efek untuk setup socket & fetch data antrian awal
  useEffect(() => {
    fetchAllQueues();

    socket.emit("joinRoom", "callRoom");
    socket.on("playCallAudio", handlePlayCallAudio);
    socket.on("refreshQueue", fetchAllQueues);
    socket.on("queueReset", () => {
      Swal.fire({
        title: "Antrian Direset!",
        text: "Seluruh antrian telah direset oleh sistem.",
        icon: "info",
        confirmButtonText: "OK",
      });
      fetchAllQueues();
    });

    return () => {
      socket.off("playCallAudio", handlePlayCallAudio);
      socket.off("refreshQueue", fetchAllQueues);
      socket.off("queueReset");
    };
  }, []);

  // Mapping prefix ke key queueData
  const prefixToKey = {
    A: "bpjs/obat-jadi",
    B: "bpjs/obat-racikan",
    C: "obat-jadi",
    D: "obat-racikan",
  };

  return (
    <div className="bg-gray-200 w-screen min-h-screen flex flex-col items-center justify-center">
      <Navbar />

      <div className="md:mt-22 mt-28 mb-28 px-12 py-4 flex flex-wrap gap-12 w-full justify-center items-center">
        {[
          { label: "Obat Non Racikan", color: "bg-biru1", prefix: "A" },
          { label: "Obat Racikan", color: "bg-biru1", prefix: "B" },
          { label: "Obat Non Racikan", color: "bg-hijau1", prefix: "C" },
          { label: "Obat Racikan", color: "bg-hijau1", prefix: "D" },
        ].map(({ label, color, prefix }, index) => {
          const key = prefixToKey[prefix];
          const data = queueData[key];
          return (
            <div
              key={index}
              className={`${color} w-[29.5vh] md:w-[35vh] h-auto text-center rounded-md shadow-xl`}
            >
              <h2 className="bg-white p-2 text-2xl rounded-t-md">{label}</h2>
              <p className="text-7xl text-white w-full py-12 items-center justify-center shadow-xl">
                {prefix} {data ? data.no_antrian : "0"}
              </p>
            </div>
          );
        })}
      </div>

      <Footer />
    </div>
  );
};

export default PageView;
