import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const localAccess = import.meta.env.VITE_NETWORK;
const socket = io(`http://${localAccess}`); // Pastikan menghubungkan ke IP laptop backend

const PageCall = () => {
  const [bpjsRacikanData, setBpjsRacikanData] = useState(null);
  const [bpjsJadiData, setBpjsJadiData] = useState(null);
  const [racikanData, setRacikanData] = useState(null);
  const [jadiData, setJadiData] = useState(null);

  // Fungsi untuk mengambil data antrian dari API
  const fetchQueueData = async (type) => {
    try {
      const response = await axios.get(
        `http://${localAccess}/api/antrian/${type}/0`
      );
      const queueList = response.data;

      if (queueList.length > 0) {
        const oldestQueue = queueList.reduce((oldest, current) => {
          return new Date(current.waktu) < new Date(oldest.waktu)
            ? current
            : oldest;
        });
        return oldestQueue;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching queue data:", error);
      return null;
    }
  };

  // Fungsi untuk memanggil antrian
  const callQueue = (data, section, loket, type) => {
    if (data) {
      const { no_antrian } = data;
      socket.emit("triggerCallAudio", {
        section,
        queueNumber: no_antrian,
        loket,
        type,
      });
      console.log("Panggilan dikirim:", {
        section,
        queueNumber: no_antrian,
        loket,
      });
    }
  };

  // Fungsi untuk mengupdate status antrian
  const updateQueueStatus = async (id, type) => {
    try {
      await axios.patch(
        `http://${localAccess}/api/antrian/${type}/${id}/status`
      );
      console.log(`Status antrian dengan ID ${id} berhasil diperbarui.`);

      // Ambil data terbaru setelah status diperbarui
      const updatedData = await fetchQueueData(type);

      // Update state sesuai data yang diperoleh
      if (type === "bpjs/obat-racikan") setBpjsRacikanData(updatedData);
      if (type === "bpjs/obat-jadi") setBpjsJadiData(updatedData);
      if (type === "obat-racikan") setRacikanData(updatedData);
      if (type === "obat-jadi") setJadiData(updatedData);
    } catch (error) {
      console.error("Error updating queue status:", error);
    }
  };

  // Ambil data antrian saat komponen dimuat
  useEffect(() => {
    const fetchData = async () => {
      setBpjsRacikanData(await fetchQueueData("bpjs/obat-racikan"));
      setBpjsJadiData(await fetchQueueData("bpjs/obat-jadi"));
      setRacikanData(await fetchQueueData("obat-racikan"));
      setJadiData(await fetchQueueData("obat-jadi"));
    };
    fetchData();
  }, []);

  return (
    <div className="bg-gray-100">
      <Navbar />
      <div className="p-4 space-between flex gap-12 mt-[86px] mb-[80px]">
        {[
          {
            label: "BPJS OBAT RACIKAN",
            data: bpjsRacikanData,
            section: "A",
            loket: [1, 2], // Loket 1 dan 2
            type: "bpjs/obat-racikan",
            color: "bg-biru1",
          },
          {
            label: "BPJS OBAT JADI",
            data: bpjsJadiData,
            section: "B",
            loket: [1, 2], // Loket 1 dan 2
            type: "bpjs/obat-jadi",
            color: "bg-biru1",
          },
          {
            label: "OBAT RACIKAN",
            data: racikanData,
            section: "C",
            loket: [1, 2], // Loket 1 dan 2
            type: "obat-racikan",
            color: "bg-hijau1",
          },
          {
            label: "OBAT JADI",
            data: jadiData,
            section: "D",
            loket: [1, 2], // Loket 1 dan 2
            type: "obat-jadi",
            color: "bg-hijau1",
          },
        ].map(({ label, data, section, loket, type, color }, index) => (
          <div
            key={index}
            className={`${color} w-[30%] h-[50%] text-center rounded-md shadow-xl`}>
            <h2 className="bg-white p-2 text-2xl rounded-t-md">{label}</h2>
            <p className="text-6xl text-white w-full py-12 items-center justify-center">
              {data ? `${section} ${data.no_antrian}` : "Tidak Ada Antrian"}
            </p>
            <div className="space-x-4">
              {/* Tombol Panggil Loket 1 */}
              <button
                onClick={() => callQueue(data, section, 1, type)}
                className="p-4 mb-6 bg-white rounded-md text-xl">
                Panggil Loket 1
              </button>

              {/* Tombol Panggil Loket 2 */}
              <button
                onClick={() => callQueue(data, section, 2, type)}
                className="p-4 mb-6 bg-white rounded-md text-xl">
                Panggil Loket 2
              </button>

              {/* Tombol Ubah Status */}
              {data && (
                <button
                  onClick={() => updateQueueStatus(data.id_antrian, type)}
                  className="p-4 mb-6 bg-white rounded-md text-xl">
                  Ubah Status
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default PageCall;
