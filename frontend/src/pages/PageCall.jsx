// import { useState, useEffect } from "react";
// import io from "socket.io-client";
// import axios from "axios";
// import Swal from "sweetalert2";
// import Navbar from "../components/Navbar";
// import Footer from "../components/FooterAdm";

// const localAccess = import.meta.env.VITE_NETWORK;
// const socket = io(`http://${localAccess}`);

// const PageCall = () => {
//   const [bpjsRacikanData, setBpjsRacikanData] = useState(null);
//   const [bpjsJadiData, setBpjsJadiData] = useState(null);
//   const [racikanData, setRacikanData] = useState(null);
//   const [jadiData, setJadiData] = useState(null);
//   const [lastQueueNumber, setLastQueueNumber] = useState(null);


//   const [disabledButtons, setDisabledButtons] = useState({
//     loket1: false,
//     loket2: false,
//     nextQueue: false,
//   });

//   const fetchQueueData = async (type) => {
//     try {
//       const response = await axios.get(`http://${localAccess}/api/antrian/${type}/0`);
//       const queueList = response.data;
  
//       console.log(`🔍 Data yang diterima (${type}):`, queueList);
  
//       if (queueList.length > 0) {
//         // Ambil antrian dengan waktu tertua
//         const oldestQueue = queueList.reduce((oldest, current) => 
//           new Date(current.waktu) < new Date(oldest.waktu) ? current : oldest
//         );
  
//         // ✅ Ambil nomor antrian terbesar dalam list
//         const maxQueueNumber = Math.max(...queueList.map(q => parseInt(q.no_antrian, 10)));
  
//         setLastQueueNumber(prevState => ({
//           ...prevState,
//           [type]: maxQueueNumber, // Simpan berdasarkan kategori
//         }));
  
//         console.log(`✅ Data antrian terpilih (${type}):`, oldestQueue);
//         return oldestQueue;
//       } else {
//         console.log(`🚨 Tidak ada antrian tersisa untuk ${type}`);
  
//         // Jika kosong, set antrian terakhir sebagai 0 untuk kategori ini
//         setLastQueueNumber(prevState => ({
//           ...prevState,
//           [type]: 0, 
//         }));
//         return null;
//       }
//     } catch (error) {
//       console.error("❌ Error fetching queue data:", error);
//       return null;
//     }
//   };
  


//   const callQueue = (data, section, loket, category, type) => {
//     if (data) {
//       const { no_antrian } = data;

//       socket.emit("triggerCallAudio", {
//         letter: section,
//         number: no_antrian,
//         loket,
//         category,
//         type,
//       });
//     }
//   };

//   const updateCallQueue = (data, section) => {
//     if (data) {
//       const { no_antrian } = data;

//       socket.emit("updateQueueView", {
//         no_antrian,
//         section,
//       });
//     }
//   };

//   const updateQueueStatus = async (id, type) => {
//     try {
//       await axios.patch(
//         `http://${localAccess}/api/antrian/${type}/${id}/status`
//       );

//       const updatedData = await fetchQueueData(type);

//       if (type === "bpjs/obat-racikan") setBpjsRacikanData(updatedData);
//       if (type === "bpjs/obat-jadi") setBpjsJadiData(updatedData);
//       if (type === "obat-racikan") setRacikanData(updatedData);
//       if (type === "obat-jadi") setJadiData(updatedData);
//     } catch (error) {
//       console.error("Error updating queue status:", error);
//     }
//   };

//   const disableButtonsTemporarily = () => {
//     setDisabledButtons({
//       loket1: true,
//       loket2: true,
//       nextQueue: true,
//     });

//     setTimeout(() => {
//       setDisabledButtons({
//         loket1: false,
//         loket2: false,
//         nextQueue: false,
//       });
//     }, 2000);
//   };

//   const showNotification = (data, section, loket, category, type) => {
//     callQueue(data, section, loket, category, type);

//     Swal.fire({
//       title: "Menunggu Panggilan Antrian...",
//       text: `Antrian ${data.no_antrian} sedang dipanggil di loket ${loket}`,
//       icon: "info",
//       showConfirmButton: false,
//       allowOutsideClick: false,
//       timer: 16000,
//     }).then(() => {
//       Swal.fire({
//         title: "Antrian Selesai Dipanggil!",
//         text: `Antrian ${data.no_antrian} telah dipanggil di loket ${loket}`,
//         icon: "success",
//         confirmButtonText: "Tutup",
//         timer: 2000,
//       });
//     });

//     disableButtonsTemporarily();
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       setBpjsRacikanData(await fetchQueueData("bpjs/obat-racikan"));
//       setBpjsJadiData(await fetchQueueData("bpjs/obat-jadi"));
//       setRacikanData(await fetchQueueData("obat-racikan"));
//       setJadiData(await fetchQueueData("obat-jadi"));
//     };
//     fetchData();
//   }, []);

//   socket.on("refreshQueue", async () => {
//     console.log("🔄 Event refreshQueue diterima, memperbarui data antrian...");
    
//     // Ambil ulang data antrian
//     setBpjsRacikanData(await fetchQueueData("bpjs/obat-racikan"));
//     setBpjsJadiData(await fetchQueueData("bpjs/obat-jadi"));
//     setRacikanData(await fetchQueueData("obat-racikan"));
//     setJadiData(await fetchQueueData("obat-jadi"));
//   });
  

//   useEffect(() => {
//     socket.on("updateCallQueue", async () => {
//       setBpjsRacikanData(await fetchQueueData("bpjs/obat-racikan"));
//       setBpjsJadiData(await fetchQueueData("bpjs/obat-jadi"));
//       setRacikanData(await fetchQueueData("obat-racikan"));
//       setJadiData(await fetchQueueData("obat-jadi"));
//     });

//     return () => {
//       socket.off("updateCallQueue");
//     };
//   }, []);

//   useEffect(() => {
//     socket.on("queueReset", () => {
//       Swal.fire({
//         title: "Antrian Direset!",
//         text: "Seluruh antrian telah direset oleh sistem.",
//         icon: "info",
//         confirmButtonText: "OK",
//       });

//       const fetchData = async () => {
//         setBpjsRacikanData(await fetchQueueData("bpjs/obat-racikan"));
//         setBpjsJadiData(await fetchQueueData("bpjs/obat-jadi"));
//         setRacikanData(await fetchQueueData("obat-racikan"));
//         setJadiData(await fetchQueueData("obat-jadi"));
//       };
//       fetchData();
//     });

//     return () => {
//       socket.off("queueReset");
//     };
//   }, []);

//   return (
//     <div className="bg-gray-200 w-screen min-h-screen flex flex-col items-center justify-center">
//       <Navbar />
//       <div className="md:mt-22 mt-24 mb-28 px-12 py-4 flex flex-wrap gap-6 w-full justify-center items-cente">
//         {[
//           {
//             label: "Obat Non Racikan",
//             data: bpjsJadiData,
//             section: "A",
//             loket: [1, 2],
//             category: "bpjs/obat-jadi",
//             type: "non-racikan",
//             color: "bg-biru1",
//           },
//           {
//             label: "Obat Racikan",
//             data: bpjsRacikanData,
//             section: "B",
//             loket: [1, 2],
//             category: "bpjs/obat-racikan",
//             type: "racikan",
//             color: "bg-biru1",
//           },
//           {
//             label: "Obat Non Racikan",
//             data: jadiData,
//             section: "C",
//             loket: [1, 2],
//             category: "obat-jadi",
//             type: "non-racikan",
//             color: "bg-hijau1",
//           },
//           {
//             label: "Obat Racikan",
//             data: racikanData,
//             section: "D",
//             loket: [1, 2],
//             category: "obat-racikan",
//             type: "racikan",
//             color: "bg-hijau1",
//           },
//         ].map(
//           ({ label, data, section, loket, category, type, color }, index) => (
//             <div
//               key={index}
//               className={`${color} w-[250px] h-full text-center rounded-md shadow-xl`}
//             >
//               <h2 className="bg-white p-2 text-2xl rounded-t-md">{label}</h2>
//               <p className="text-6xl text-white w-full py-4 items-center justify-center">
//               {section} {data ? ` ${data.no_antrian}` : "0"}
//               </p>
//               <div className="flex flex-col space-y-2 p-4 mb-2 text-black text-sm">
//                 <button
//                   onClick={() =>
//                     showNotification(data, section, 1, category, type)
//                   }
//                   disabled={disabledButtons.loket1}
//                   className={`hover:bg-red-500 hover:text-white bg-white p-2 rounded-md ${
//                     disabledButtons.loket1
//                       ? "cursor-not-allowed"
//                       : "cursor-pointer"
//                   }`}
//                 >
//                   Panggil Loket 1
//                 </button>
//                 <button
//                   onClick={() =>
//                     showNotification(data, section, 2, category, type)
//                   }
//                   disabled={disabledButtons.loket2}
//                   className={`hover:bg-red-500 hover:text-white bg-white p-2 rounded-md ${
//                     disabledButtons.loket2
//                       ? "cursor-not-allowed"
//                       : "cursor-pointer"
//                   }`}
//                 >
//                   Panggil Loket 2
//                 </button>
//                 {data && (
// <button
//   onClick={() => {
//     const maxNumber = lastQueueNumber?.[category] || 0; // Ambil batas max berdasarkan kategori
//     const currentNumber = parseInt(data?.no_antrian, 10);

//     if (currentNumber >= maxNumber) {
//       Swal.fire({
//         title: "Antrian Sudah Habis!",
//         text: "Tidak ada antrian berikutnya.",
//         icon: "warning",
//         confirmButtonText: "OK",
//       });
//       return; // ⛔ Stop di sini
//     }

//     updateQueueStatus(data.id_antrian, category);
//     disableButtonsTemporarily();
//     updateCallQueue(data, section);
//   }}
//   disabled={!data?.no_antrian}
//   className={`bg-red-500 p-2 text-white rounded-md ${
//     !data?.no_antrian ? "cursor-not-allowed" : "cursor-pointer"
//   }`}
// >
//   Antrian Berikutnya
// </button>


//                 )}
//               </div>
//             </div>
//           )
//         )}
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default PageCall;

import { useState, useEffect, useCallback } from "react";
import io from "socket.io-client";
import axios from "axios";
import Swal from "sweetalert2";
import Navbar from "../components/Navbar";
import Footer from "../components/FooterAdm";

const localAccess = import.meta.env.VITE_NETWORK;
const socket = io(`http://${localAccess}`);

const PageCall = () => {
  const [bpjsRacikanData, setBpjsRacikanData] = useState(null);
  const [bpjsJadiData, setBpjsJadiData] = useState(null);
  const [racikanData, setRacikanData] = useState(null);
  const [jadiData, setJadiData] = useState(null);
  const [lastQueueNumber, setLastQueueNumber] = useState({});

  const [disabledButtons, setDisabledButtons] = useState({
    loket1: false,
    loket2: false,
    nextQueue: false,
  });

  // Fetch queue data
  const fetchQueueData = useCallback(async (type) => {
    try {
      const response = await axios.get(`http://${localAccess}/api/antrian/${type}/0`);
      const queueList = response.data;

      if (queueList.length > 0) {
        const oldestQueue = queueList.reduce((oldest, current) =>
          new Date(current.waktu) < new Date(oldest.waktu) ? current : oldest
        );

        const maxQueueNumber = Math.max(...queueList.map(q => parseInt(q.no_antrian, 10)));

        setLastQueueNumber(prevState => ({ ...prevState, [type]: maxQueueNumber }));
        return oldestQueue;
      } else {
        setLastQueueNumber(prevState => ({ ...prevState, [type]: 0 }));
        return null;
      }
    } catch (error) {
      console.error("❌ Error fetching queue data:", error);
      return null;
    }
  }, []);

  // Function untuk memanggil audio antrian
  const callQueue = (data, section, loket, category, type) => {
    if (data) {
      socket.emit("triggerCallAudio", {
        letter: section,
        number: data.no_antrian,
        loket,
        category,
        type,
      });
    }
  };

  // Update tampilan antrian
  const updateCallQueue = (data, section) => {
    if (data) {
      socket.emit("updateQueueView", { no_antrian: data.no_antrian, section });
    }
  };

  // Update status antrian
  const updateQueueStatus = async (id, type) => {
    try {
      await axios.patch(`http://${localAccess}/api/antrian/${type}/${id}/status`);
      const updatedData = await fetchQueueData(type);

      switch (type) {
        case "bpjs/obat-racikan": setBpjsRacikanData(updatedData); break;
        case "bpjs/obat-jadi": setBpjsJadiData(updatedData); break;
        case "obat-racikan": setRacikanData(updatedData); break;
        case "obat-jadi": setJadiData(updatedData); break;
        default: break;
      }
    } catch (error) {
      console.error("Error updating queue status:", error);
    }
  };

  const disableButtonsTemporarily = () => {
    setDisabledButtons({ loket1: true, loket2: true, nextQueue: true });
    setTimeout(() => {
      setDisabledButtons({ loket1: false, loket2: false, nextQueue: false });
    }, 2000);
  };

  // Notifikasi Swal saat memanggil antrian
  const showNotification = (data, section, loket, category, type) => {
    callQueue(data, section, loket, category, type);
    Swal.fire({
      title: "Menunggu Panggilan Antrian...",
      text: `Antrian ${data.no_antrian} sedang dipanggil di loket ${loket}`,
      icon: "info",
      showConfirmButton: false,
      allowOutsideClick: false,
      timer: 16000,
    }).then(() => {
      Swal.fire({
        title: "Antrian Selesai Dipanggil!",
        text: `Antrian ${data.no_antrian} telah dipanggil di loket ${loket}`,
        icon: "success",
        confirmButtonText: "Tutup",
        timer: 2000,
      });
    });

    disableButtonsTemporarily();
  };

  // Load data antrian saat pertama kali render
  useEffect(() => {
    const fetchData = async () => {
      setBpjsRacikanData(await fetchQueueData("bpjs/obat-racikan"));
      setBpjsJadiData(await fetchQueueData("bpjs/obat-jadi"));
      setRacikanData(await fetchQueueData("obat-racikan"));
      setJadiData(await fetchQueueData("obat-jadi"));
    };
    fetchData();
  }, [fetchQueueData]);

  // Listen untuk socket events
  useEffect(() => {
    socket.on("refreshQueue", async () => {
      console.log("🔄 Event refreshQueue diterima, memperbarui data antrian...");
      setBpjsRacikanData(await fetchQueueData("bpjs/obat-racikan"));
      setBpjsJadiData(await fetchQueueData("bpjs/obat-jadi"));
      setRacikanData(await fetchQueueData("obat-racikan"));
      setJadiData(await fetchQueueData("obat-jadi"));
    });

    socket.on("queueReset", async () => {
      Swal.fire({
        title: "Antrian Direset!",
        text: "Seluruh antrian telah direset oleh sistem.",
        icon: "info",
        confirmButtonText: "OK",
      });

      setBpjsRacikanData(await fetchQueueData("bpjs/obat-racikan"));
      setBpjsJadiData(await fetchQueueData("bpjs/obat-jadi"));
      setRacikanData(await fetchQueueData("obat-racikan"));
      setJadiData(await fetchQueueData("obat-jadi"));
    });

    return () => {
      socket.off("refreshQueue");
      socket.off("queueReset");
    };
  }, [fetchQueueData]);

  return (
        <div className="bg-gray-200 w-screen min-h-screen flex flex-col items-center justify-center">
          <Navbar />
          <div className="md:mt-22 mt-24 mb-28 px-12 py-4 flex flex-wrap gap-6 w-full justify-center items-cente">
            {[
              {
                label: "Obat Non Racikan",
                data: bpjsJadiData,
                section: "A",
                loket: [1, 2],
                category: "bpjs/obat-jadi",
                type: "non-racikan",
                color: "bg-biru1",
              },
              {
                label: "Obat Racikan",
                data: bpjsRacikanData,
                section: "B",
                loket: [1, 2],
                category: "bpjs/obat-racikan",
                type: "racikan",
                color: "bg-biru1",
              },
              {
                label: "Obat Non Racikan",
                data: jadiData,
                section: "C",
                loket: [1, 2],
                category: "obat-jadi",
                type: "non-racikan",
                color: "bg-hijau1",
              },
              {
                label: "Obat Racikan",
                data: racikanData,
                section: "D",
                loket: [1, 2],
                category: "obat-racikan",
                type: "racikan",
                color: "bg-hijau1",
              },
            ].map(
              ({ label, data, section, loket, category, type, color }, index) => (
                <div
                  key={index}
                  className={`${color} w-[250px] h-full text-center rounded-md shadow-xl`}
                >
                  <h2 className="bg-white p-2 text-2xl rounded-t-md">{label}</h2>
                  <p className="text-6xl text-white w-full py-4 items-center justify-center">
                  {section} {data ? ` ${data.no_antrian}` : "0"}
                  </p>
                  <div className="flex flex-col space-y-2 p-4 mb-2 text-black text-sm">
                    <button
                      onClick={() =>
                        showNotification(data, section, 1, category, type)
                      }
                      disabled={disabledButtons.loket1}
                      className={`hover:bg-red-500 hover:text-white bg-white p-2 rounded-md ${
                        disabledButtons.loket1
                          ? "cursor-not-allowed"
                          : "cursor-pointer"
                      }`}
                    >
                      Panggil Loket 1
                    </button>
                    <button
                      onClick={() =>
                        showNotification(data, section, 2, category, type)
                      }
                      disabled={disabledButtons.loket2}
                      className={`hover:bg-red-500 hover:text-white bg-white p-2 rounded-md ${
                        disabledButtons.loket2
                          ? "cursor-not-allowed"
                          : "cursor-pointer"
                      }`}
                    >
                      Panggil Loket 2
                    </button>
                    {data && (
    <button
      onClick={() => {
        const maxNumber = lastQueueNumber?.[category] || 0; // Ambil batas max berdasarkan kategori
        const currentNumber = parseInt(data?.no_antrian, 10);
    
        if (currentNumber >= maxNumber) {
          Swal.fire({
            title: "Antrian Sudah Habis!",
            text: "Tidak ada antrian berikutnya.",
            icon: "warning",
            confirmButtonText: "OK",
          });
          return; // ⛔ Stop di sini
        }
    
        updateQueueStatus(data.id_antrian, category);
        disableButtonsTemporarily();
        updateCallQueue(data, section);
      }}
      disabled={!data?.no_antrian}
      className={`bg-red-500 p-2 text-white rounded-md ${
        !data?.no_antrian ? "cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      Antrian Berikutnya
    </button>
    
    
                    )}
                  </div>
                </div>
              )
            )}
          </div>
          <Footer />
        </div>
      );
};

export default PageCall;
