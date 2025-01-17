import { useEffect } from "react";
import { useAntrian } from "../hooks/UseAntrian";

const PagePrint = () => {
  const {
    antrianBpjsObatRacikan,
    antrianBpjsObatJadi,
    antrianObatRacikan,
    antrianObatJadi,

    isLoading,

    fetchLastAntrianBpjsObatRacikan,
    fetchAndPrintAntrianBpjsObatRacikan,

    fetchLastAntrianBpjsObatJadi,
    fetchAndPrintAntrianBpjsObatJadi,

    fetchLastAntrianObatRacikan,
    fetchAndPrintAntrianObatRacikan,

    fetchLastAntrianObatJadi,
    fetchAndPrintAntrianObatJadi,

    resetAntrianBpjsObatRacikan,
    resetAntrianBpjsObatJadi,
    resetAntrianObatRacikan,
    resetAntrianObatJadi
  } = useAntrian();

  // Ambil data antrian terakhir saat halaman dimuat
  useEffect(() => {
    fetchLastAntrianBpjsObatRacikan();
    fetchLastAntrianBpjsObatJadi();
    fetchLastAntrianObatRacikan();
    fetchLastAntrianObatJadi();
  }, [
    fetchLastAntrianBpjsObatRacikan, 
    fetchLastAntrianBpjsObatJadi,
    fetchLastAntrianObatRacikan,
    fetchLastAntrianObatJadi
  ]);

  // Fungsi untuk handle pencetakan dan reset data
  const handlePrint = async (type) => {
    try {
      if (type === 'racikan') {
        // Ambil & cetak antrian BPJS Obat Racikan
        await fetchAndPrintAntrianBpjsObatRacikan();
        resetAntrianBpjsObatRacikan(); // Reset setelah print
       
      } else if (type === 'jadi') {
        // Ambil & cetak antrian BPJS Obat Jadi
        await fetchAndPrintAntrianBpjsObatJadi();
        resetAntrianBpjsObatJadi(); // Reset setelah print
       
      } else if (type === 'obat-racikan') {
        // Ambil & cetak antrian Obat Racikan
        await fetchAndPrintAntrianObatRacikan();
        resetAntrianObatRacikan(); // Reset setelah print
       
      } else if (type === 'obat-jadi') {
        // Ambil & cetak antrian Obat Jadi
        await fetchAndPrintAntrianObatJadi();
        resetAntrianObatJadi(); // Reset setelah print
       
      }
    } catch (error) {
      console.error("Terjadi kesalahan saat mencetak antrian:", error);
    }
  };

  return (
    <div className="flex flex-row items-center justify-center min-h-screen bg-gray-100 gap-4">
      {/* Section for BPJS Obat Racikan */}
      <div className="bg-white shadow-md rounded-lg p-6 w-80 text-center " id="racikan-section">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          BPJS Obat Racikan
        </h1>
        <h2 className="text-lg font-semibold text-gray-600 mb-2">Antrian</h2>
        <p className="text-3xl font-bold text-blue-600 mb-4">A</p>
        <p className="text-6xl font-extrabold text-gray-900 mb-6">
          {antrianBpjsObatRacikan ? antrianBpjsObatRacikan.no_antrian : "-"}
        </p>
        <button
          onClick={() => handlePrint('racikan')}
          disabled={isLoading}
          className={`${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white font-bold py-2 px-4 rounded-lg w-full`}
        >
          {isLoading ? "Processing..." : "Ambil & Cetak Antrian"}
        </button>
      </div>

      {/* Section for BPJS Obat Jadi */}
      <div className="bg-white shadow-md rounded-lg p-6 w-80 text-center" id="jadi-section">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          BPJS Obat Jadi
        </h1>
        <h2 className="text-lg font-semibold text-gray-600 mb-2">Antrian</h2>
        <p className="text-3xl font-bold text-blue-600 mb-4">B</p>
        <p className="text-6xl font-extrabold text-gray-900 mb-6">
          {antrianBpjsObatJadi ? antrianBpjsObatJadi.no_antrian : "-"}
        </p>
        <button
          onClick={() => handlePrint('jadi')}
          disabled={isLoading}
          className={`${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white font-bold py-2 px-4 rounded-lg w-full`}
        >
          {isLoading ? "Processing..." : "Ambil & Cetak Antrian"}
        </button>
      </div>

      {/* Section for Obat Racikan */}
      <div className="bg-white shadow-md rounded-lg p-6 w-80 text-center" id="racikan-section"> 
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Obat Racikan
        </h1>
        <h2 className="text-lg font-semibold text-gray-600 mb-2">Antrian</h2>
        <p className="text-3xl font-bold text-blue-600 mb-4">C</p>
        <p className="text-6xl font-extrabold text-gray-900 mb-6">
          {antrianObatRacikan ? antrianObatRacikan.no_antrian : "-"}
        </p>
        <button
          onClick={() => handlePrint('obat-racikan')}
          disabled={isLoading}
          className={`${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white font-bold py-2 px-4 rounded-lg w-full`}
        >
          {isLoading ? "Processing..." : "Ambil & Cetak Antrian"}
        </button>
      </div>

      {/* Section for Obat Jadi */}
      <div className="bg-white shadow-md rounded-lg p-6 w-80 text-center" id="jadi-section">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Obat Jadi
        </h1> 
        <h2 className="text-lg font-semibold text-gray-600 mb-2">Antrian</h2>
        <p className="text-3xl font-bold text-blue-600 mb-4">D</p>
        <p className="text-6xl font-extrabold text-gray-900 mb-6">
          {antrianObatJadi ? antrianObatJadi.no_antrian : "-"}
        </p>
        <button
          onClick={() => handlePrint('obat-jadi')}
          disabled={isLoading}  
          className={`${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white font-bold py-2 px-4 rounded-lg w-full`}
        >
          {isLoading ? "Processing..." : "Ambil & Cetak Antrian"}
        </button>
      </div>
          

    </div>
  );
};

export default PagePrint;
