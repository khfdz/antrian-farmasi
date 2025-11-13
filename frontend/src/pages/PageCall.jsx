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

  const fetchQueueData = useCallback(async (type) => {
    try {
      const response = await axios.get(`http://${localAccess}/api/antrian/${type}/0`);
      const queueList = response.data;

      if (queueList.length > 0) {
        const oldestQueue = queueList.reduce((oldest, current) =>
          new Date(current.waktu) < new Date(oldest.waktu) ? current : oldest
        );

        const maxQueueNumber = Math.max(...queueList.map((q) => parseInt(q.no_antrian, 10)));

        setLastQueueNumber((prev) => ({ ...prev, [type]: maxQueueNumber }));
        return oldestQueue;
      } else {
        setLastQueueNumber((prev) => ({ ...prev, [type]: 0 }));
        return null;
      }
    } catch (error) {
      console.error("❌ Error fetching queue data:", error);
      return null;
    }
  }, []);

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

  const updateCallQueue = (data, section) => {
    if (data) {
      socket.emit("updateQueueView", { no_antrian: data.no_antrian, section });
    }
  };

  const updateQueueStatus = async (id, type) => {
    try {
      await axios.patch(`http://${localAccess}/api/antrian/${type}/${id}/status`);
      const updatedData = await fetchQueueData(type);

      switch (type) {
        case "bpjs/obat-racikan":
          setBpjsRacikanData(updatedData);
          break;
        case "bpjs/obat-jadi":
          setBpjsJadiData(updatedData);
          break;
        case "obat-racikan":
          setRacikanData(updatedData);
          break;
        case "obat-jadi":
          setJadiData(updatedData);
          break;
        default:
          break;
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

  const showNotification = (data, section, loket, category, type) => {
    callQueue(data, section, loket, category, type);
    Swal.fire({
      title: "Menunggu Panggilan Antrian...",
      text: `Antrian ${data.no_antrian} sedang dipanggil di loket ${loket}`,
      icon: "info",
      showConfirmButton: false,
      allowOutsideClick: false,
      timer: 13000,
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

  useEffect(() => {
    const fetchData = async () => {
      setBpjsRacikanData(await fetchQueueData("bpjs/obat-racikan"));
      setBpjsJadiData(await fetchQueueData("bpjs/obat-jadi"));
      setRacikanData(await fetchQueueData("obat-racikan"));
      setJadiData(await fetchQueueData("obat-jadi"));
    };
    fetchData();
  }, [fetchQueueData]);

  useEffect(() => {
    socket.on("refreshQueue", async () => {
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

  const Card = ({ label, data, section, category, type, color }) => {
    const gradient =
      color === "blue"
        ? "from-blue-500 via-blue-600 to-blue-700"
        : "from-emerald-500 via-emerald-600 to-emerald-700";

    return (
      <div
        className={`relative bg-white rounded-3xl shadow-xl overflow-hidden w-[320px] transition-all duration-500 hover:scale-105`}
      >
        <div
          className={`bg-gradient-to-r ${gradient} p-5 relative text-center text-white text-2xl font-bold`}
        >
          {label}
        </div>

        <div className="p-8 flex flex-col items-center">
          <div
            className={`text-8xl font-black bg-gradient-to-r ${gradient} bg-clip-text text-transparent mb-6`}
          >
            {section} {data ? data.no_antrian : "0"}
          </div>

          {[1, 2].map((loket) => (
            <button
              key={loket}
              onClick={() => showNotification(data, section, loket, category, type)}
              disabled={disabledButtons[`loket${loket}`]}
              className={`w-full py-3 mb-3 rounded-xl text-lg font-semibold transition-all ${
                disabledButtons[`loket${loket}`]
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                  : "bg-gray-100 border-2 border-transparent hover:border-red-500 hover:bg-red-500 hover:text-white shadow-md"
              }`}
            >
              Panggil Loket {loket}
            </button>
          ))}

          {data && (
            <button
              onClick={() => {
                const maxNumber = lastQueueNumber?.[category] || 0;
                const currentNumber = parseInt(data?.no_antrian, 10);

                if (currentNumber >= maxNumber) {
                  Swal.fire({
                    title: "Antrian Sudah Habis!",
                    text: "Tidak ada antrian berikutnya.",
                    icon: "warning",
                    confirmButtonText: "OK",
                  });
                  return;
                }
                updateQueueStatus(data.id_antrian, category);
                disableButtonsTemporarily();
                updateCallQueue(data, section);
              }}
              className="w-full py-3 mt-1 rounded-xl text-white font-semibold bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-md"
            >
              Antrian Berikutnya
            </button>
          )}
        </div>
      </div>
    );
  };

return (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100">
    <Navbar />

    {/* Bagian utama grow otomatis isi layar */}
    <main className="flex-grow flex flex-col items-center justify-center py-16 -ml-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-32 max-w-7xl w-full justify-center">
        {[
          { label: "Obat Non Racikan", data: bpjsJadiData, section: "A", category: "bpjs/obat-jadi", type: "non-racikan", color: "blue" },
          { label: "Obat Racikan", data: bpjsRacikanData, section: "B", category: "bpjs/obat-racikan", type: "racikan", color: "blue" },
          { label: "Obat Non Racikan", data: jadiData, section: "C", category: "obat-jadi", type: "non-racikan", color: "green" },
          { label: "Obat Racikan", data: racikanData, section: "D", category: "obat-racikan", type: "racikan", color: "green" },
        ].map((props, i) => (
          <Card key={i} {...props} />
        ))}
      </div>
    </main>

    {/* 🧷 Footer otomatis nempel di bawah */}
    <Footer />
  </div>
);

};

export default PageCall;
