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
  const [activeQueue, setActiveQueue] = useState(null);

  const [queueData, setQueueData] = useState({
    "bpjs/obat-jadi": null,
    "bpjs/obat-racikan": null,
    "obat-jadi": null,
    "obat-racikan": null,
  });

  const fetchQueueData = async (type) => {
    try {
      const res = await axios.get(`http://${localAccess}/api/antrian/${type}/0`);
      const queueList = res.data;
      if (queueList.length > 0) {
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

  const playAudioSequence = async () => {
    if (isPlaying || audioQueue.length === 0) return;
    setIsPlaying(true);

    const queue = [...audioQueue];
    setAudioQueue([]);

    for (const audioPath of queue) {
      if (!audioPath) continue;
      const config = speedAudio[audioPath] || { playbackRate: 1, delay: 0 };

      try {
        await playAudioWithTrimming(audioPath);
        if (config.delay) {
          await new Promise((res) => setTimeout(res, config.delay));
        }
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
          const source = audioContext.createBufferSource();
          source.buffer = audioBuffer;
          source.connect(audioContext.destination);

          const playTime = audioBuffer.duration * spokenPercent;
          source.start(0);
          source.stop(audioContext.currentTime + playTime);

          source.onended = () => resolve();
        })
        .catch(reject);
    });
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
        setAudioQueue((prevQueue) => [...prevQueue, ...audioSequence]);
        setActiveQueue(data.letter);

        const gradientClass =
          data.letter === "A" || data.letter === "B"
            ? "from-blue-500 via-blue-600 to-blue-700"
            : "from-emerald-500 via-emerald-600 to-emerald-700";

        Swal.fire({
          html: `
            <div class="relative overflow-hidden bg-white rounded-3xl p-12">
              <!-- Background Pattern -->
              <div class="absolute inset-0 opacity-5">
                <div class="absolute inset-0 bg-gradient-to-br ${gradientClass}"></div>
              </div>
              
              <!-- Content -->
              <div class="relative z-10 flex flex-col items-center justify-center space-y-8">
                
                <!-- Bell Icon dengan Animasi -->
                <div class="relative">
                  <div class="absolute inset-0 bg-gradient-to-r ${gradientClass} blur-2xl opacity-40 animate-pulse"></div>
                  <div class="relative bg-gradient-to-r ${gradientClass} rounded-full p-6 shadow-2xl animate-bounce">
                    <svg class="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                    </svg>
                  </div>
                </div>

                <!-- Title -->
                <div class="text-center">
                  <h1 class="text-4xl font-black bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent mb-2">
                    PANGGILAN ANTRIAN
                  </h1>
                  <div class="flex items-center justify-center gap-2 mt-4">
                    <div class="h-1 w-16 bg-gradient-to-r ${gradientClass} rounded-full"></div>
                    <div class="h-1 w-8 bg-gradient-to-r ${gradientClass} rounded-full opacity-50"></div>
                  </div>
                </div>

                <!-- Queue Number - LEBIH BESAR -->
                <div class="relative my-8">
                  <!-- Glowing Ring -->
                  <div class="absolute inset-0 bg-gradient-to-r ${gradientClass} blur-3xl opacity-30 animate-pulse"></div>
                  
                  <!-- Number Card -->
                  <div class="relative bg-gradient-to-br ${gradientClass} rounded-3xl p-8 shadow-2xl transform hover:scale-105 transition-all duration-300">
                    <div class="text-center">
                      <div class="text-white text-9xl font-black tracking-wider leading-none">
                        ${data.letter}${data.number}
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Divider dengan Icon -->
                <div class="flex items-center justify-center gap-4 my-6">
                  <div class="h-px w-20 bg-gradient-to-r ${gradientClass} opacity-30"></div>
                  <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
                  </svg>
                  <div class="h-px w-20 bg-gradient-to-r ${gradientClass} opacity-30"></div>
                </div>

                <!-- Silakan Menuju Text -->
                <div class="text-center">
                  <p class="text-3xl text-gray-700 font-bold mb-6">
                    Silahkan Menuju
                  </p>
                </div>

                <!-- Loket Card -->
                <div class="relative">
                  <div class="absolute inset-0 bg-gradient-to-r ${gradientClass} blur-xl opacity-20"></div>
                  <div class="relative bg-white border-4 border-gradient-to-r ${gradientClass} rounded-2xl px-12 py-6 shadow-xl">
                    <div class="flex items-center gap-4">
                      <svg class="w-12 h-12 bg-gradient-to-r ${gradientClass} rounded-lg p-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                      </svg>
                      <div class="text-left">
   
                        <p class="text-5xl font-black bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent">
                          LOKET ${data.loket}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

               

              </div>
            </div>

            <style>
              @keyframes bounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
              }
              .animate-bounce {
                animation: bounce 2s ease-in-out infinite;
              }
            </style>
          `,
          showConfirmButton: false,
          timer: 19000,
          width: '700px',
          padding: 0,
          background: 'transparent',
          backdrop: 'rgba(0,0,0,0.4)',
          customClass: {
            popup: '!bg-transparent !shadow-none',
          },
        });

        await playAudioSequence();
        await fetchAllQueues();
        
        setTimeout(() => setActiveQueue(null), 2000);

        socket.emit("confirmCallAudioReceived", data);
      } else {
        console.error("Audio sequence tidak ditemukan atau tidak valid:", audioSequence);
      }
    } catch (error) {
      console.error("Error saat memanggil API audio call:", error);
    }
  };

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
        timer: 4000,
      });
      fetchAllQueues();
    });

    return () => {
      socket.off("playCallAudio", handlePlayCallAudio);
      socket.off("refreshQueue", fetchAllQueues);
      socket.off("queueReset");
    };
  }, []);

  useEffect(() => {
    if (!isPlaying && audioQueue.length > 0) {
      playAudioSequence();
    }
  }, [audioQueue]);

  const prefixToKey = {
    A: "bpjs/obat-jadi",
    B: "bpjs/obat-racikan",
    C: "obat-jadi",
    D: "obat-racikan",
  };

  // Komponen Card Modern
  const QueueCard = ({ label, prefix, colorScheme, data, isActive }) => {
    const isBlue = colorScheme === "blue";
    const bgGradient = isBlue
      ? "from-blue-500 via-blue-600 to-blue-700"
      : "from-emerald-500 via-emerald-600 to-emerald-700";
    const hoverGradient = isBlue
      ? "hover:from-blue-600 hover:via-blue-700 hover:to-blue-800"
      : "hover:from-emerald-600 hover:via-emerald-700 hover:to-emerald-800";

    return (
      <div
        className={`relative group transition-all duration-500 transform ${
          isActive ? "scale-105 z-10" : "hover:scale-105"
        }`}
      >
        {/* Glow effect */}
        <div
          className={`absolute inset-0 bg-gradient-to-r ${bgGradient} blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-3xl ${
            isActive ? "opacity-50 animate-pulse" : ""
          }`}
        ></div>

        <div
          className={`relative bg-white rounded-3xl shadow-xl overflow-hidden w-[320px] transition-all duration-500 ${
            isActive ? "ring-4 ring-yellow-400 shadow-2xl" : ""
          }`}
        >
          {/* Header dengan gradient */}
          <div
            className={`bg-gradient-to-r ${bgGradient} ${hoverGradient} p-5 relative overflow-hidden transition-all duration-300`}
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
            <h2 className="text-white text-2xl font-bold text-center relative z-10">
              {label}
            </h2>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16"></div>
          </div>

          {/* Body dengan animasi number */}
          <div className="-mt-4 p-10 bg-gradient-to-br from-gray-50 to-white">
            <div className="text-center">
              <div className="inline-block relative">
                {/* Hilangkan efek blur & glow */}
                <div
                  className={`absolute inset-0 bg-transparent ${
                    isActive ? "" : ""
                  }`}
                ></div>

                <div className="relative bg-white px-0 py-12 rounded-2xl ">
                  <span
                    className={` text-8xl font-black bg-gradient-to-r ${bgGradient} bg-clip-text text-transparent transition-all duration-500 ${
                      isActive ? "animate-pulse" : ""
                    }`}
                  >
                    {prefix} {data ? data.no_antrian : "0"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100">
      <Navbar />

      <main className="flex-grow flex flex-col items-center justify-center py-12 px-4">
        {/* Queue cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 -ml-32 gap-48 max-w-7xl w-full">
          {[
            { label: "Obat Non Racikan", color: "blue", prefix: "A", key: "bpjs/obat-jadi" },
            { label: "Obat Racikan", color: "blue", prefix: "B", key: "bpjs/obat-racikan" },
            { label: "Obat Non Racikan", color: "green", prefix: "C", key: "obat-jadi" },
            { label: "Obat Racikan", color: "green", prefix: "D", key: "obat-racikan" },
          ].map((item, index) => (
            <QueueCard
              key={index}
              label={item.label}
              prefix={item.prefix}
              colorScheme={item.color}
              data={queueData[item.key]}
              isActive={activeQueue === item.prefix}
            />
          ))}
        </div>
      </main>

      <Footer />

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

export default PageView;