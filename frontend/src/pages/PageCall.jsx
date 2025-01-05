import { useEffect, useState } from "react";
import { useAudio } from "../context/AudioContext";
import { useAntrian } from "../hooks/UseAntrian";
import axios from "axios";

const PageCall = () => {
  const { fetchAudioSequence, playAudioSequence, audioSequence, isLoading } = useAudio();
  const {
    fetchAntrianBpjsObatRacikanByStatus,
    fetchAntrianBpjsObatJadiByStatus,
    antrianListBpjsObatRacikan,
    antrianListBpjsObatJadi,
  } = useAntrian();

  const [selectedAntrianRacikan, setSelectedAntrianRacikan] = useState(null);
  const [selectedAntrianJadi, setSelectedAntrianJadi] = useState(null);

  // Ambil data antrian Racikan
  useEffect(() => {
    fetchAntrianBpjsObatRacikanByStatus();
  }, [fetchAntrianBpjsObatRacikanByStatus]);

  // Ambil data antrian Jadi
  useEffect(() => {
    fetchAntrianBpjsObatJadiByStatus();
  }, [fetchAntrianBpjsObatJadiByStatus]);

  // Pilih antrian terlama untuk Racikan
  useEffect(() => {
    if (antrianListBpjsObatRacikan && antrianListBpjsObatRacikan.length > 0) {
      setSelectedAntrianRacikan(antrianListBpjsObatRacikan[0]);
    } else {
      setSelectedAntrianRacikan(null);
    }
  }, [antrianListBpjsObatRacikan]);

  // Pilih antrian terlama untuk Jadi
  useEffect(() => {
    if (antrianListBpjsObatJadi && antrianListBpjsObatJadi.length > 0) {
      setSelectedAntrianJadi(antrianListBpjsObatJadi[0]);
    } else {
      setSelectedAntrianJadi(null);
    }
  }, [antrianListBpjsObatJadi]);

  // Ambil dan mainkan audio
  const handleFetchAndPlayAudio = async (loket, type) => {
    const selectedAntrian =
      type === "racikan" ? selectedAntrianRacikan : selectedAntrianJadi;

    if (selectedAntrian) {
      console.log(`Fetching audio sequence for Loket ${loket} (${type})...`);

      await fetchAudioSequence("A", selectedAntrian.no_antrian, loket);
      await playAudioSequence();
    }
  };

  const handleUpdateStatus = async (id, type) => {
    try {
      const url =
        type === "racikan"
          ? `http://localhost:5000/api/antrian/bpjs/obat-racikan/${id}`
          : `http://localhost:5000/api/antrian/bpjs/obat-jadi/${id}`;

      await axios.patch(url, { status: 1 });
      if (type === "racikan") {
        fetchAntrianBpjsObatRacikanByStatus();
      } else {
        fetchAntrianBpjsObatJadiByStatus();
      }
    } catch (error) {
      console.error("Error updating antrian status:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-row space-x-8">
        {/* Section Racikan */}
        <div className="bg-white shadow-md rounded-lg p-6 w-80 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            BPJS Obat Racikan
          </h1>
          <h2 className="text-lg font-semibold text-gray-600 mb-4">
            Panggil Antrian
          </h2>

          {selectedAntrianRacikan ? (
            <div className="mb-6">
              <p className="text-3xl font-bold text-blue-600 mb-2">
                Nomor Antrian
              </p>
              <p className="text-6xl font-extrabold text-gray-900">
                {selectedAntrianRacikan.no_antrian}
              </p>
            </div>
          ) : (
            <p className="text-gray-600 mb-6">Tidak ada antrian</p>
          )}

          <div className="mb-4">
            <button
              onClick={() => handleFetchAndPlayAudio(1, "racikan")}
              disabled={!selectedAntrianRacikan || isLoading}
              className={`${
                !selectedAntrianRacikan || isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white font-bold py-2 px-4 rounded-lg mb-2 w-full`}
            >
              Loket 1
            </button>
          </div>
          <button
            onClick={() =>
              handleUpdateStatus(selectedAntrianRacikan.id, "racikan")
            }
            disabled={!selectedAntrianRacikan}
            className={`${
              !selectedAntrianRacikan
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600"
            } text-white font-bold py-2 px-4 rounded-lg w-full`}
          >
            Skip
          </button>
        </div>

        {/* Section Jadi */}
        <div className="bg-white shadow-md rounded-lg p-6 w-80 text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            BPJS Obat Jadi
          </h1>
          <h2 className="text-lg font-semibold text-gray-600 mb-4">
            Panggil Antrian
          </h2>

          {selectedAntrianJadi ? (
            <div className="mb-6">
              <p className="text-3xl font-bold text-blue-600 mb-2">
                Nomor Antrian
              </p>
              <p className="text-6xl font-extrabold text-gray-900">
                {selectedAntrianJadi.no_antrian}
              </p>
            </div>
          ) : (
            <p className="text-gray-600 mb-6">Tidak ada antrian</p>
          )}

          <div className="mb-4">
            <button
              onClick={() => handleFetchAndPlayAudio(1, "jadi")}
              disabled={!selectedAntrianJadi || isLoading}
              className={`${
                !selectedAntrianJadi || isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white font-bold py-2 px-4 rounded-lg mb-2 w-full`}
            >
              Loket 1
            </button>
          </div>
          <button
            onClick={() => handleUpdateStatus(selectedAntrianJadi.id, "jadi")}
            disabled={!selectedAntrianJadi}
            className={`${
              !selectedAntrianJadi
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600"
            } text-white font-bold py-2 px-4 rounded-lg w-full`}
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageCall;
