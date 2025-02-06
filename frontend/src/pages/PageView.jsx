// import React, { useState, useEffect } from "react";
// import io from "socket.io-client";
// import axios from "axios";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

// const localAccess = import.meta.env.VITE_NETWORK;
// const socket = io(`http://${localAccess}`);

// const PageView = () => {
//   const [bpjsRacikanData, setBpjsRacikanData] = useState(null);
//   const [bpjsJadiData, setBpjsJadiData] = useState(null);
//   const [racikanData, setRacikanData] = useState(null);
//   const [jadiData, setJadiData] = useState(null);

//   const playAudioSequence = async (audioSequence) => {
//     for (const audioPath of audioSequence) {
//       const audio = new Audio(audioPath);
//       try {
//         await audio.play();
//         await new Promise((resolve) => {
//           audio.onended = resolve;
//         });
//       } catch (error) {
//         console.error("Gagal memutar audio:", error);
//       }
//     }
//   };

//   const handlePlayCallAudio = async (data) => {
//     console.log("Menerima data untuk memutar audio:", data);

//     // Pastikan data berisi nilai yang diperlukan untuk letter, number, loket, dan type
//     try {
//       const response = await axios.get(`http://${localAccess}/api/audio/call`, {
//         params: {
//           letter: data.letter, // Kirimkan letter
//           number: data.number, // Kirimkan number
//           loket: data.loket, // Kirimkan loket
//           type: data.type, // Kirimkan type (non_racikan atau racikan)
//         },
//       });

//       const audioSequence = response.data?.sequence;

//       if (audioSequence && Array.isArray(audioSequence)) {
//         console.log("Memutar urutan audio:", audioSequence);
//         await playAudioSequence(audioSequence);
//       } else {
//         console.error(
//           "Audio sequence tidak ditemukan atau tidak valid:",
//           audioSequence
//         );
//       }
//     } catch (error) {
//       console.error("Error saat memanggil API atau memutar audio:", error);
//     }
//   };

//   useEffect(() => {
//     socket.emit("joinRoom", "callRoom");
//     socket.on("playCallAudio", handlePlayCallAudio);
//     return () => {
//       socket.off("playCallAudio", handlePlayCallAudio);
//     };
//   }, []);

//   const fetchInitialData = async () => {
//     try {
//       const urls = [
//         "bpjs/obat-racikan/latest",
//         "bpjs/obat-jadi/latest",
//         "obat-racikan/latest",
//         "obat-jadi/latest",
//       ];
//       const responses = await Promise.all(
//         urls.map((url) => axios.get(`http://${localAccess}/api/antrian/${url}`))
//       );

//       setBpjsRacikanData(responses[0].data.no_antrian);
//       setBpjsJadiData(responses[1].data.no_antrian);
//       setRacikanData(responses[2].data.no_antrian);
//       setJadiData(responses[3].data.no_antrian);

//       console.log(
//         "Data awal diambil:",
//         responses.map((res) => res.data)
//       );
//     } catch (error) {
//       console.error("Error loading initial data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchInitialData();

//     socket.emit("joinRoom", "bpjs-obat-racikan");
//     socket.emit("joinRoom", "bpjs-obat-jadi");
//     socket.emit("joinRoom", "obat-racikan");
//     socket.emit("joinRoom", "obat-jadi");

//     const socketEvents = [
//       { event: "antrianUpdated-bpjs-obat-racikan", setter: setBpjsRacikanData },
//       { event: "antrianUpdated-bpjs-obat-jadi", setter: setBpjsJadiData },
//       { event: "antrianUpdated-obat-racikan", setter: setRacikanData },
//       { event: "antrianUpdated-obat-jadi", setter: setJadiData },
//     ];

//     socketEvents.forEach(({ event, setter }) => {
//       socket.on(event, (data) => {
//         console.log(`Pembaruan dari Socket.IO (${event}):`, data);
//         setter(data.antrianNumber);
//       });
//     });

//     return () => {
//       socketEvents.forEach(({ event }) => socket.off(event));
//     };
//   }, []);

//   return (
//     <div className="bg-gray-200 w-screen h-screen items-center justify-center flex">
//       <Navbar />

//       <div className="pr-4 pl-4 space-between flex gap-12 ">
//         {[
//           {
//             label: "Obat Non Racikan",
//             data: bpjsJadiData,
//             color: "bg-biru1",
//             prefix: "A",
//           },
//           {
//             label: "Obat Racikan",
//             data: bpjsRacikanData,
//             color: "bg-biru1",
//             prefix: "B",
//           },
//           {
//             label: "Obat Non Racikan",
//             data: jadiData,
//             color: "bg-hijau1",
//             prefix: "C",
//           },
//           {
//             label: "Obat Racikan",
//             data: racikanData,
//             color: "bg-hijau1",
//             prefix: "D",
//           },
//         ].map(({ label, data, color, prefix }, index) => (
//           <div
//             key={index}
//             className={`${color} w-[250px] h-full text-center rounded-md shadow-xl`}>
//             <h2 className="bg-white p-2 text-2xl rounded-t-md">{label}</h2>
//             <p className="text-6xl text-white w-full py-12 items-center justify-center shadow-xl">
//               {prefix} {data !== null ? data : "Memuat..."}
//             </p>
//           </div>
//         ))}
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default PageView;
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const localAccess = import.meta.env.VITE_NETWORK;
const socket = io(`http://${localAccess}`);

const PageView = () => {
  const [bpjsRacikanData, setBpjsRacikanData] = useState(null);
  const [bpjsJadiData, setBpjsJadiData] = useState(null);
  const [racikanData, setRacikanData] = useState(null);
  const [jadiData, setJadiData] = useState(null);
  const [audioQueue, setAudioQueue] = useState([]); // Menyimpan antrian audio
  const [isPlaying, setIsPlaying] = useState(false); // Status apakah audio sedang diputar

  // Fungsi untuk memutar urutan audio
  const playAudioSequence = async () => {
    // Jika sudah ada audio yang sedang diputar, jangan lakukan apa-apa
    if (isPlaying || audioQueue.length === 0) return;

    // Tandai bahwa audio sedang diputar
    setIsPlaying(true);

    const audioPath = audioQueue[0];
    const audio = new Audio(audioPath);
    try {
      await audio.play();
      // Tunggu sampai audio selesai, kemudian hapus dari antrian dan putar audio berikutnya
      await new Promise((resolve) => {
        audio.onended = resolve;
      });

      // Hapus audio yang telah diputar dari antrian dan lanjutkan memutar
      setAudioQueue((prevQueue) => prevQueue.slice(1));
    } catch (error) {
      console.error("Gagal memutar audio:", error);
    } finally {
      // Setelah selesai memutar, periksa lagi apakah ada audio dalam antrian
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    // Pastikan audio diputar setiap kali antrian berubah
    playAudioSequence();
  }, [audioQueue]); // Berubah jika antrian berubah

  const handlePlayCallAudio = async (data) => {
    console.log("Menerima data untuk memutar audio:", data);

    // Pastikan data berisi nilai yang diperlukan untuk letter, number, loket, dan type
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
        console.log("Menambah audio ke antrian:", audioSequence);
        setAudioQueue((prevQueue) => [...prevQueue, ...audioSequence]); // Tambahkan audio ke antrian
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
        console.log(`Pembaruan dari Socket.IO (${event}):`, data);
        setter(data.antrianNumber);
      });
    });

    return () => {
      socketEvents.forEach(({ event }) => socket.off(event));
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
