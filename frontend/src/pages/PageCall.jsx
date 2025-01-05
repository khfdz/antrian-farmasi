import React, { useEffect, useState } from "react";
import { useAudio } from "../context/AudioContext";
import { useAntrian } from "../context/AntrianContext";
import axios from "axios";

const PageCall = () => {
  const { fetchAudioSequence, audioSequence } = useAudio();
  const { fetchAntrianBpjsRacikanByStatus, antrianBpjsRacikan, isLoading } =
    useAntrian();
  const [selectedAntrian, setSelectedAntrian] = useState(null);

  // Ambil data antrian dengan status 0 saat halaman dimuat
  useEffect(() => {
    fetchAntrianBpjsRacikanByStatus();
  }, [fetchAntrianBpjsRacikanByStatus]);

  // Pilih antrian terlama secara otomatis
  useEffect(() => {
    if (antrianBpjsRacikan && antrianBpjsRacikan.length > 0) {
      setSelectedAntrian(antrianBpjsRacikan[0]); // Ambil antrian pertama (terlama)
    } else {
      setSelectedAntrian(null);
    }
  }, [antrianBpjsRacikan]);

  // Fetch audio sequence dan langsung play
  const handleFetchAndPlayAudio = async (loket) => {
    if (selectedAntrian) {
      console.log(`Fetching audio sequence for Loket ${loket}...`);

      // Fetch audio berdasarkan nomor antrian
      await fetchAudioSequence("A", selectedAntrian.no_antrian, loket);

      // Log sequence audio yang akan dimainkan
      console.log("Audio Sequence to Play:", audioSequence);

      // Mainkan audio sequence
      for (const audioFile of audioSequence) {
        const audio = new Audio(audioFile);
        await new Promise((resolve) => {
          audio.play();
          audio.onended = resolve;
        });
      }
    }
  };

  // Update status antrian ke 1 (skip)
  const handleUpdateStatus = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/api/antrian/bpjs/obat-racikan/${id}`, {
        status: 1,
      });
      fetchAntrianBpjsRacikanByStatus(); // Refresh data setelah update
    } catch (error) {
      console.error("Error updating antrian status:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-80 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          BPJS Obat Racikan
        </h1>
        <h2 className="text-lg font-semibold text-gray-600 mb-4">
          Panggil Antrian
        </h2>

        {/* Tampilkan antrian terlama */}
        {selectedAntrian ? (
          <div className="mb-6">
            <p className="text-3xl font-bold text-blue-600 mb-2">
              Nomor Antrian
            </p>
            <p className="text-6xl font-extrabold text-gray-900">
              {selectedAntrian.no_antrian}
            </p>
          </div>
        ) : (
          <p className="text-gray-600 mb-6">Tidak ada antrian</p>
        )}

        {/* Tombol untuk memanggil ke Loket */}
        <div className="mb-4">
          <button
            onClick={() => handleFetchAndPlayAudio(1)}
            disabled={!selectedAntrian || isLoading}
            className={`${
              !selectedAntrian || isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white font-bold py-2 px-4 rounded-lg mb-2 w-full`}
          >
            Loket 1
          </button>
          <button
            onClick={() => handleFetchAndPlayAudio(2)}
            disabled={!selectedAntrian || isLoading}
            className={`${
              !selectedAntrian || isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white font-bold py-2 px-4 rounded-lg w-full`}
          >
            Loket 2
          </button>
        </div>

        {/* Tombol untuk Skip */}
        <button
          onClick={() => handleUpdateStatus(selectedAntrian.id)}
          disabled={!selectedAntrian}
          className={`${
            !selectedAntrian
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-600"
          } text-white font-bold py-2 px-4 rounded-lg w-full`}
        >
          Skip
        </button>
      </div>
    </div>
  );
};

export default PageCall;
