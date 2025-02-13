import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Swal from "sweetalert2";

const localAccess = import.meta.env.VITE_NETWORK;
const socket = io(`http://${localAccess}`);

const PageView = () => {
  const [bpjsRacikanData, setBpjsRacikanData] = useState(null);
  const [bpjsJadiData, setBpjsJadiData] = useState(null);
  const [racikanData, setRacikanData] = useState(null);
  const [jadiData, setJadiData] = useState(null);
  const [audioQueue, setAudioQueue] = useState([]); // Menyimpan antrian audio
  const [isPlaying, setIsPlaying] = useState(false); // Status apakah audio sedang diputar

  const playAudioSequence = async () => {
    if (isPlaying || audioQueue.length === 0) return;

    setIsPlaying(true);

    let queue = [...audioQueue]; // Ambil snapshot awal antrian
    setAudioQueue([]); // Kosongkan antrian di state untuk menghindari loop

    for (const audioPath of queue) {
      if (!audioPath) continue; // Lewati jika audioPath kosong

      const audio = new Audio(audioPath);
      audio.preload = "auto";

      try {
        await audio.play();
        await new Promise((resolve) => {
          audio.onended = resolve;
        });

        // Tambahkan delay 500ms sebelum memutar audio berikutnya
        await new Promise((resolve) => setTimeout(resolve, 5));
      } catch (error) {
        console.error("Gagal memutar audio:", error);
      }
    }

    setIsPlaying(false);
  };

  useEffect(() => {
    playAudioSequence();
  }, [audioQueue]);

  const handlePlayCallAudio = async (data) => {
    console.log("Menerima data untuk memutar audio:", data);

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
      console.log("Audio sequence diterima:", audioSequence); // Log untuk cek apakah sequence benar

      if (audioSequence && Array.isArray(audioSequence)) {
        setAudioQueue((prevQueue) => [...prevQueue, ...audioSequence]);

        const colorClass =
          data.letter === "A" || data.letter === "B" ? "bg-biru1" : "bg-hijau1";

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
          showConfirmButton: false, // Menghilangkan tombol "OK"
          timer: 19000, // Swal akan otomatis tertutup setelah 5 detik
          customClass: {
            popup: "bg-white shadow-lg rounded-lg p-6", // Styling box alert
          },
        });

        console.log("Antrian audio sekarang:", [
          ...audioQueue,
          ...audioSequence,
        ]); // Debugging
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

  useEffect(() => {
    // Tangkap event updateCallQueue dari server
    socket.on("updateCallQueue", (data) => {
      console.log("📥 [PageView] Menerima updateCallQueue:", data);

      // Kirimkan kembali ke PagePrint
      socket.emit("forwardCallQueue", data);
      console.log("📤 [PageView] Meneruskan updateCallQueue ke PageCall", data);
    });

    return () => {
      socket.off("updateCallQueue");
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

      console.log(
        "Data awal diambil:",
        responses.map((res) => res.data)
      );
    } catch (error) {
      console.error("Error loading initial data:", error);
    }
  };

  useEffect(() => {
    fetchInitialData();

    socket.emit("joinRoom", "bpjs-obat-racikan");
    socket.emit("joinRoom", "bpjs-obat-jadi");
    socket.emit("joinRoom", "obat-racikan");
    socket.emit("joinRoom", "obat-jadi");

    const socketEvents = [
      { event: "antrianUpdated-bpjs-obat-racikan", setter: setBpjsRacikanData },
      { event: "antrianUpdated-bpjs-obat-jadi", setter: setBpjsJadiData },
      { event: "antrianUpdated-obat-racikan", setter: setRacikanData },
      { event: "antrianUpdated-obat-jadi", setter: setJadiData },
    ];

    socketEvents.forEach(({ event, setter }) => {
      socket.on(event, (data) => {
        console.log(
          `📡 [PageView] Menerima update dari server (${event}):`,
          data
        );
        setter(data.antrianNumber);

        // Kirim update ke semua PagePrint
        socket.emit("updatePagePrint", {
          room: event.replace("antrianUpdated-", ""), // Ambil nama room dari event
          antrianNumber: data.antrianNumber,
        });

        console.log(
          `📤 [PageView] Mengirim update ke PagePrint: ${event.replace(
            "antrianUpdated-",
            ""
          )} - ${data.antrianNumber}`
        );
      });
    });

    // Tambahkan event listener untuk receiveQueueUpdate
    // Tambahkan event listener untuk receiveQueueUpdate
    socket.on("receiveQueueUpdate", ({ section, queueNumber }) => {
      console.log(`📥 [PageView] Update diterima: ${section} - ${queueNumber}`);

      if (section === "bpjs-obat-jadi") {
        setBpjsJadiData(queueNumber);
      } else if (section === "bpjs-obat-racikan") {
        setBpjsRacikanData(queueNumber);
      } else if (section === "obat-jadi") {
        setJadiData(queueNumber);
      } else if (section === "obat-racikan") {
        setRacikanData(queueNumber);
      }
    });

    // Tambahkan event listener untuk queueUpdate
    socket.on("queueUpdate", ({ section, queueNumber }) => {
      console.log(`📥 [PageView] Update diterima: ${section} - ${queueNumber}`);

      if (section === "bpjs-obat-jadi") {
        setBpjsJadiData(queueNumber);
      } else if (section === "bpjs-obat-racikan") {
        setBpjsRacikanData(queueNumber);
      } else if (section === "obat-jadi") {
        setJadiData(queueNumber);
      } else if (section === "obat-racikan") {
        setRacikanData(queueNumber);
      }

      socket.on("refreshQueueView", ({ no_antrian, section }) => {
        console.log(
          `📥 [PageView] Menerima refreshQueueView: ${section} - ${no_antrian}`
        );

        if (section === "bpjs-obat-jadi") {
          setBpjsJadiData(no_antrian);
        } else if (section === "bpjs-obat-racikan") {
          setBpjsRacikanData(no_antrian);
        } else if (section === "obat-jadi") {
          setJadiData(no_antrian);
        } else if (section === "obat-racikan") {
          setRacikanData(no_antrian);
        }

        // Kirim update ke PagePrint.js
        socket.emit("updatePagePrint", {
          room: section,
          antrianNumber: no_antrian,
        });

        console.log(
          `📤 [PageView] Mengirim update ke PagePrint: ${section} - ${no_antrian}`
        );
      });

      // Kirim update balik ke PagePrint
      socket.emit("updatePagePrint", {
        room: section,
        antrianNumber: queueNumber,
      });

      console.log(
        `📤 [PageView] Mengirim update ke PagePrint: ${section} - ${queueNumber}`
      );
    });

    return () => {
      socketEvents.forEach(({ event }) => socket.off(event));
      socket.off("receiveQueueUpdate"); // Hapus listener saat komponen di-unmount
      socket.off("refreshQueueView");
    };
  }, []);

  return (
    <div className="bg-gray-200 w-screen h-screen items-center justify-center flex">
      <Navbar />

      <div className="pr-4 pl-4 space-between flex gap-12 ">
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
            className={`${color} w-[250px] h-full text-center rounded-md shadow-xl`}>
            <h2 className="bg-white p-2 text-2xl rounded-t-md">{label}</h2>
            <p className="text-6xl text-white w-full py-12 items-center justify-center shadow-xl">
              {prefix} {data !== null ? data : "Memuat..."}
            </p>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default PageView;
