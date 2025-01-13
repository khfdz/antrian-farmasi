import { useEffect, useState } from "react";
import { useAudio } from "../context/AudioContext";
import { useAntrian } from "../hooks/UseAntrian";
import axios from "axios";

const PageCall = () => {
  const { fetchAudioSequence, playAudioSequence, isLoading } = useAudio();
  const {
    fetchAntrianBpjsObatRacikanByStatus,
    fetchAntrianBpjsObatJadiByStatus,
    fetchAntrianObatJadiByStatus,
    fetchAntrianObatRacikanByStatus,

    antrianListBpjsObatRacikan,
    antrianListBpjsObatJadi,
    antrianListObatRacikan,
    antrianListObatJadi,
  } = useAntrian();

  const [selectedAntrianBpjsObatRacikan, setSelectedAntrianBpjsObatRacikan] = useState(null);
  const [selectedAntrianBpjsObatJadi, setSelectedAntrianBpjsObatJadi] = useState(null);
  const [selectedAntrianObatRacikan, setSelectedAntrianObatRacikan] = useState(null);
  const [selectedAntrianObatJadi, setSelectedAntrianObatJadi] = useState(null);

  useEffect(() => {
    fetchAntrianBpjsObatRacikanByStatus();
    fetchAntrianBpjsObatJadiByStatus();
    fetchAntrianObatRacikanByStatus();
    fetchAntrianObatJadiByStatus();
  }, []);

  useEffect(() => {
    if (antrianListBpjsObatRacikan && antrianListBpjsObatRacikan.length > 0) {
      setSelectedAntrianBpjsObatRacikan(antrianListBpjsObatRacikan[0]);
    } else {
      setSelectedAntrianBpjsObatRacikan(null);
    }
  }, [antrianListBpjsObatRacikan]);

  useEffect(() => {
    if (antrianListBpjsObatJadi && antrianListBpjsObatJadi.length > 0) {
      setSelectedAntrianBpjsObatJadi(antrianListBpjsObatJadi[0]);
    } else {
      setSelectedAntrianBpjsObatJadi(null);
    }
  }, [antrianListBpjsObatJadi]);

  useEffect(() => {
    if (antrianListObatRacikan && antrianListObatRacikan.length > 0) {
      setSelectedAntrianObatRacikan(antrianListObatRacikan[0]);
    } else {
      setSelectedAntrianObatRacikan(null);
    }
  }, [antrianListObatRacikan]);

  useEffect(() => {
    if (antrianListObatJadi && antrianListObatJadi.length > 0) {
      setSelectedAntrianObatJadi(antrianListObatJadi[0]);
    } else {
      setSelectedAntrianObatJadi(null);
    }
  }, [antrianListObatJadi]);

  const handleFetchAndPlayAudio = async (loket, antrian) => {
    if (antrian) {
      console.log(`Fetching audio sequence for Loket ${loket}...`);
      await fetchAudioSequence("A", antrian.no_antrian, loket);
      await playAudioSequence();
    }
  };

  const handleUpdateStatus = async (id, url) => {
    try {
      await axios.patch(url, { status: 1 });
      fetchAntrianBpjsObatRacikanByStatus();
      fetchAntrianBpjsObatJadiByStatus();
      fetchAntrianObatRacikanByStatus();
      fetchAntrianObatJadiByStatus();
    } catch (error) {
      console.error("Error updating antrian status:", error);
    }
  };

  const renderSection = (title, selectedAntrian, loketType, url) => {
    return (
      <div className="bg-white shadow-md rounded-lg p-6 w-80 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">{title}</h1>
        <h2 className="text-lg font-semibold text-gray-600 mb-4">Panggil Antrian</h2>

        {selectedAntrian ? (
          <div className="mb-6">
            <p className="text-3xl font-bold text-blue-600 mb-2">Nomor Antrian</p>
            <p className="text-6xl font-extrabold text-gray-900">{selectedAntrian.no_antrian}</p>
          </div>
        ) : (
          <p className="text-gray-600 mb-6">Tidak ada antrian</p>
        )}

        <div className="mb-4">
          <button
            onClick={() => handleFetchAndPlayAudio(1, selectedAntrian)}
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
            onClick={() => handleFetchAndPlayAudio(2, selectedAntrian)}
            disabled={!selectedAntrian || isLoading}
            className={`${
              !selectedAntrian || isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } text-white font-bold py-2 px-4 rounded-lg mb-2 w-full`}
          >
            Loket 2
          </button>
        </div>
        <button
          onClick={() => handleUpdateStatus(selectedAntrian.id, url)}
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
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-row space-x-8">
        {renderSection(
          "BPJS Obat Racikan",
          selectedAntrianBpjsObatRacikan,
          "bpjsRacikan",
          `http://localhost:5000/api/antrian/bpjs/obat-racikan/${selectedAntrianBpjsObatRacikan?.id}`
        )}
        {renderSection(
          "BPJS Obat Jadi",
          selectedAntrianBpjsObatJadi,
          "bpjsJadi",
          `http://localhost:5000/api/antrian/bpjs/obat-jadi/${selectedAntrianBpjsObatJadi?.id}`
        )}
        {renderSection(
          "Obat Racikan",
          selectedAntrianObatRacikan,
          "racikan",
          `http://localhost:5000/api/antrian/obat-racikan/${selectedAntrianObatRacikan?.id}`
        )}
        {renderSection(
          "Obat Jadi",
          selectedAntrianObatJadi,
          "jadi",
          `http://localhost:5000/api/antrian/obat-jadi/${selectedAntrianObatJadi?.id}`
        )}
      </div>
    </div>
  );
};

export default PageCall;
