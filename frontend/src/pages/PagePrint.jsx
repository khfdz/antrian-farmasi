import React, { useEffect } from 'react';
import { useAntrian } from '../context/AntrianContext';

const PagePrint = () => {
  const { antrian, isLoading, fetchLastAntrian, fetchAndPrintAntrian } = useAntrian();

  // Ambil data antrian terakhir saat halaman dimuat
  useEffect(() => {
    fetchLastAntrian();
  }, [fetchLastAntrian]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-80 text-center">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">BPJS Obat Racikan</h1>
        <h2 className="text-lg font-semibold text-gray-600 mb-2">Antrian</h2>
        <p className="text-3xl font-bold text-blue-600 mb-4">A</p>
        <p className="text-6xl font-extrabold text-gray-900 mb-6">
          {antrian ? antrian.no_antrian : '-'}
        </p>
        <button
          onClick={fetchAndPrintAntrian}
          disabled={isLoading}
          className={`${
            isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
          } text-white font-bold py-2 px-4 rounded-lg w-full`}
        >
          {isLoading ? 'Processing...' : 'Ambil & Cetak Antrian'}
        </button>
      </div>
    </div>
  );
};

export default PagePrint;
