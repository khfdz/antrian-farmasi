import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert2
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const localAccess = import.meta.env.VITE_NETWORK;
const socket = io(`http://${localAccess}`); // Pastikan menghubungkan ke IP laptop backend

const PageCall = () => {
  const [bpjsRacikanData, setBpjsRacikanData] = useState(null);
  const [bpjsJadiData, setBpjsJadiData] = useState(null);
  const [racikanData, setRacikanData] = useState(null);
  const [jadiData, setJadiData] = useState(null);

  const [disabledButtons, setDisabledButtons] = useState({
    loket1: false,
    loket2: false,
    nextQueue: false,
  });

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

  const callQueue = (data, section, loket, category, type) => {
    if (data) {
      const { no_antrian } = data;

      // Kirim data ke socket dengan category dan type racikan/non-racikan
      socket.emit("triggerCallAudio", {
        letter: section, // Ganti section dengan letter
        number: no_antrian, // Ganti queueNumber dengan number
        loket,
        category, // Kategori yang diterima (misalnya bpjs/obat-racikan)
        type, // Hanya 'racikan' atau 'non-racikan'
      });
      console.log("Panggilan dikirim:", {
        letter: section, // Ganti section dengan letter
        number: no_antrian, // Ganti queueNumber dengan number
        loket,
        category,
        type,
      });
    }
  };

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

  // Mengupdate status tombol disable untuk mencegah klik ganda
  const disableButtonsTemporarily = () => {
    setDisabledButtons({
      loket1: true,
      loket2: true,
      nextQueue: true,
    });

    // Mengaktifkan tombol kembali setelah 2 detik
    setTimeout(() => {
      setDisabledButtons({
        loket1: false,
        loket2: false,
        nextQueue: false,
      });
    }, 2000);
  };

  // Fungsi untuk menampilkan notifikasi dan menonaktifkan tombol sementara
  const showNotification = (data, section, loket, category, type) => {
    // Kirim panggilan antrian terlebih dahulu
    callQueue(data, section, loket, category, type);

    // Tampilkan animasi menunggu
    Swal.fire({
      title: "Menunggu Panggilan Antrian...",
      text: `Antrian ${data.no_antrian} sedang dipanggil di loket ${loket}`,
      icon: "info",
      showConfirmButton: false,
      allowOutsideClick: false,
      timer: 16000, // Waktu animasi 3 detik
    }).then(() => {
      // Setelah animasi selesai, tampilkan notifikasi sukses
      Swal.fire({
        title: "Antrian Selesai Dipanggil!",
        text: `Antrian ${data.no_antrian} telah dipanggil di loket ${loket}`,
        icon: "success",
        confirmButtonText: "Tutup",
        timer: 2000,
      });
    });

    // Menonaktifkan tombol sementara
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
  }, []);

  return (
    <div className="bg-gray-200 w-screen h-screen items-center justify-center flex">
      <Navbar />
      <div className="pr-4 pl-4 space-between flex gap-12 ">
        {[
          {
            label: "Obat Non Racikan",
            data: bpjsJadiData,
            section: "A",
            loket: [1, 2], // Loket 1 dan 2
            category: "bpjs/obat-jadi", // Ini category yang sesuai
            type: "non-racikan", // Tipe untuk non-racikan
            color: "bg-biru1",
          },
          {
            label: "Obat Racikan",
            data: bpjsRacikanData,
            section: "B",
            loket: [1, 2], // Loket 1 dan 2
            category: "bpjs/obat-racikan", // Ini category yang sesuai
            type: "racikan", // Tipe untuk racikan
            color: "bg-biru1",
          },
          {
            label: "Obat Non Racikan",
            data: jadiData,
            section: "C",
            loket: [1, 2], // Loket 1 dan 2
            category: "obat-jadi", // Ini category yang sesuai
            type: "non-racikan", // Tipe untuk non-racikan
            color: "bg-hijau1",
          },
          {
            label: "Obat Racikan",
            data: racikanData,
            section: "D",
            loket: [1, 2], // Loket 1 dan 2
            category: "obat-racikan", // Ini category yang sesuai
            type: "racikan", // Tipe untuk racikan
            color: "bg-hijau1",
          },
        ].map(
          ({ label, data, section, loket, category, type, color }, index) => (
            <div
              key={index}
              className={`${color} w-[250px] h-full text-center rounded-md shadow-xl`}>
              <h2 className="bg-white p-2 text-2xl rounded-t-md">{label}</h2>
              <p className="text-6xl text-white w-full py-4 items-center justify-center">
                {data ? `${section} ${data.no_antrian}` : "Tidak Ada Antrian"}
              </p>
              <div className="flex flex-col space-y-2 p-4 mb-2 text-black text-sm">
                {/* Tombol Panggil Loket 1 */}
                <button
                  onClick={() =>
                    showNotification(data, section, 1, category, type)
                  }
                  disabled={disabledButtons.loket1}
                  className={`hover:bg-red-500 hover:text-white bg-white p-2 rounded-md ${
                    disabledButtons.loket1
                      ? "cursor-not-allowed"
                      : "cursor-pointer"
                  }`}>
                  Panggil Loket 1
                </button>

                {/* Tombol Panggil Loket 2 */}
                <button
                  onClick={() =>
                    showNotification(data, section, 2, category, type)
                  }
                  disabled={disabledButtons.loket2}
                  className={`hover:bg-red-500 hover:text-white bg-white p-2 rounded-md ${
                    disabledButtons.loket2
                      ? "cursor-not-allowed"
                      : "cursor-pointer"
                  }`}>
                  Panggil Loket 2
                </button>

                {/* Tombol Ubah Status */}
                {data && (
                  <button
                    onClick={() => {
                      updateQueueStatus(data.id_antrian, category);
                      disableButtonsTemporarily(); // Menonaktifkan tombol sementara
                    }}
                    disabled={disabledButtons.nextQueue}
                    className={`bg-red-500 p-2 text-white rounded-md ${
                      disabledButtons.nextQueue
                        ? "cursor-not-allowed"
                        : "cursor-pointer"
                    }`}>
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
