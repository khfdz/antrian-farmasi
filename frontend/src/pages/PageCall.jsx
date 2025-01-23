// import { useEffect, useState } from "react";
// import { useAudio } from "../context/AudioContext";
// import { AntrianContext } from "../hooks/UseAntrian";

// const PageCall = () => {
//   const { fetchAudioSequence, playAudioSequence, isLoading } = useAudio();
//   const {
//     fetchAntrianBpjsObatRacikanByStatus,
//     fetchAntrianBpjsObatJadiByStatus,
//     fetchAntrianObatJadiByStatus,
//     fetchAntrianObatRacikanByStatus,
//     updateAntrianBpjsObatRacikanStatus,
//     updateAntrianBpjsObatJadiStatus,
//     updateAntrianObatJadiStatus,
//     updateAntrianObatRacikanStatus,
//     antrianListBpjsObatRacikan,
//     antrianListBpjsObatJadi,
//     antrianListObatRacikan,
//     antrianListObatJadi,
//   } = AntrianContext();

//   const [selectedAntrianBpjsObatRacikan, setSelectedAntrianBpjsObatRacikan] = useState(null);
//   const [selectedAntrianBpjsObatJadi, setSelectedAntrianBpjsObatJadi] = useState(null);
//   const [selectedAntrianObatRacikan, setSelectedAntrianObatRacikan] = useState(null);
//   const [selectedAntrianObatJadi, setSelectedAntrianObatJadi] = useState(null);

//   useEffect(() => {
//     fetchAntrianBpjsObatRacikanByStatus();
//     fetchAntrianBpjsObatJadiByStatus();
//     fetchAntrianObatRacikanByStatus();
//     fetchAntrianObatJadiByStatus();
//   }, []);

//   // Effect handlers for each antrianList
//   useEffect(() => {
//     if (antrianListBpjsObatRacikan && antrianListBpjsObatRacikan.length > 0) {
//       setSelectedAntrianBpjsObatRacikan(antrianListBpjsObatRacikan[0]);
//     } else {
//       setSelectedAntrianBpjsObatRacikan(null);
//     }
//   }, [antrianListBpjsObatRacikan]);

//   useEffect(() => {
//     if (antrianListBpjsObatJadi && antrianListBpjsObatJadi.length > 0) {
//       setSelectedAntrianBpjsObatJadi(antrianListBpjsObatJadi[0]);
//     } else {
//       setSelectedAntrianBpjsObatJadi(null);
//     }
//   }, [antrianListBpjsObatJadi]);

//   useEffect(() => {
//     if (antrianListObatRacikan && antrianListObatRacikan.length > 0) {
//       setSelectedAntrianObatRacikan(antrianListObatRacikan[0]);
//     } else {
//       setSelectedAntrianObatRacikan(null);
//     }
//   }, [antrianListObatRacikan]);

//   useEffect(() => {
//     if (antrianListObatJadi && antrianListObatJadi.length > 0) {
//       setSelectedAntrianObatJadi(antrianListObatJadi[0]);
//     } else {
//       setSelectedAntrianObatJadi(null);
//     }
//   }, [antrianListObatJadi]);

//   const handleFetchAndPlayAudio = async (loket, antrian) => {
//     if (antrian) {
//       console.log(`Fetching audio sequence for Loket ${loket}...`);
//       await fetchAudioSequence("A", antrian.no_antrian, loket);
//       await playAudioSequence();
//     }
//   };

//   const handleUpdateStatus = async (id, status, type) => {
//     try {
//       // Update status based on the type
//       if (type === "bpjsRacikan") {
//         await updateAntrianBpjsObatRacikanStatus(id, status);
//       } else if (type === "bpjsJadi") {
//         await updateAntrianBpjsObatJadiStatus(id, status);
//       } else if (type === "obatRacikan") {
//         await updateAntrianObatRacikanStatus(id, status);
//       } else if (type === "obatJadi") {
//         await updateAntrianObatJadiStatus(id, status);
//       }
      
//       // Fetch updated data
//       fetchAntrianBpjsObatRacikanByStatus();
//       fetchAntrianBpjsObatJadiByStatus();
//       fetchAntrianObatRacikanByStatus();
//       fetchAntrianObatJadiByStatus();
      
//       console.log('Status updated successfully');
//     } catch (error) {
//       console.error('Error updating status:', error);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <div className="flex flex-row space-x-8">
//         {/* BPJS Obat Racikan Section */}
//         <div className="bg-white shadow-md rounded-lg p-6 w-80 text-center">
//           <h1 className="text-2xl font-bold text-gray-800 mb-6">BPJS Obat Racikan</h1>
//           <h2 className="text-lg font-semibold text-gray-600 mb-4">Panggil Antrian</h2>

//           {selectedAntrianBpjsObatRacikan ? (
//             <div className="mb-6">
//               <p className="text-3xl font-bold text-blue-600 mb-2">Nomor Antrian</p>
//               <p className="text-6xl font-extrabold text-gray-900">{selectedAntrianBpjsObatRacikan.no_antrian}</p>
//             </div>
//           ) : (
//             <p className="text-gray-600 mb-6">Tidak ada antrian</p>
//           )}

//           <div className="mb-4">
//             <button
//               onClick={() => handleFetchAndPlayAudio(1, selectedAntrianBpjsObatRacikan)}
//               disabled={!selectedAntrianBpjsObatRacikan || isLoading}
//               className={`${
//                 !selectedAntrianBpjsObatRacikan || isLoading
//                   ? "bg-gray-400 cursor-not-allowed"
//                   : "bg-blue-500 hover:bg-blue-600"
//               } text-white font-bold py-2 px-4 rounded-lg mb-2 w-full`}
//             >
//               Loket 1
//             </button>
//             <button
//               onClick={() => handleFetchAndPlayAudio(2, selectedAntrianBpjsObatRacikan)}
//               disabled={!selectedAntrianBpjsObatRacikan || isLoading}
//               className={`${
//                 !selectedAntrianBpjsObatRacikan || isLoading
//                   ? "bg-gray-400 cursor-not-allowed"
//                   : "bg-blue-500 hover:bg-blue-600"
//               } text-white font-bold py-2 px-4 rounded-lg mb-2 w-full`}
//             >
//               Loket 2
//             </button>
//           </div>

//           {selectedAntrianBpjsObatRacikan ? (
//             <button
//               onClick={() => handleUpdateStatus(selectedAntrianBpjsObatRacikan.id_antrian, selectedAntrianBpjsObatRacikan.status, "bpjsRacikan")}
//               disabled={!selectedAntrianBpjsObatRacikan}
//               className={`${
//                 !selectedAntrianBpjsObatRacikan
//                   ? "bg-gray-400 cursor-not-allowed"
//                   : "bg-red-500 hover:bg-red-600"
//               } text-white font-bold py-2 px-4 rounded-lg w-full`}
//             >
//               Skip
//             </button>
//           ) : (
//             <p className="text-gray-600 mb-6">Tidak ada antrian</p>
//           )}
//         </div>

//         {/* BPJS Obat Jadi Section */}
//         <div className="bg-white shadow-md rounded-lg p-6 w-80 text-center">
//           <h1 className="text-2xl font-bold text-gray-800 mb-6">BPJS Obat Jadi</h1>
//           <h2 className="text-lg font-semibold text-gray-600 mb-4">Panggil Antrian</h2>

//           {selectedAntrianBpjsObatJadi ? (
//             <div className="mb-6">
//               <p className="text-3xl font-bold text-blue-600 mb-2">Nomor Antrian</p>
//               <p className="text-6xl font-extrabold text-gray-900">{selectedAntrianBpjsObatJadi.no_antrian}</p>
//             </div>
//           ) : (
//             <p className="text-gray-600 mb-6">Tidak ada antrian</p>
//           )}

//           <div className="mb-4">
//             <button
//               onClick={() => handleFetchAndPlayAudio(1, selectedAntrianBpjsObatJadi)}
//               disabled={!selectedAntrianBpjsObatJadi || isLoading}
//               className={`${
//                 !selectedAntrianBpjsObatJadi || isLoading
//                   ? "bg-gray-400 cursor-not-allowed"
//                   : "bg-blue-500 hover:bg-blue-600"
//               } text-white font-bold py-2 px-4 rounded-lg mb-2 w-full`}
//             >
//               Loket 1
//             </button>
//             <button
//               onClick={() => handleFetchAndPlayAudio(2, selectedAntrianBpjsObatJadi)}
//               disabled={!selectedAntrianBpjsObatJadi || isLoading}
//               className={`${
//                 !selectedAntrianBpjsObatJadi || isLoading
//                   ? "bg-gray-400 cursor-not-allowed"
//                   : "bg-blue-500 hover:bg-blue-600"
//               } text-white font-bold py-2 px-4 rounded-lg mb-2 w-full`}
//             >
//               Loket 2
//             </button>
//           </div>

//           {selectedAntrianBpjsObatJadi ? (
//             <button
//               onClick={() => handleUpdateStatus(selectedAntrianBpjsObatJadi.id_antrian, selectedAntrianBpjsObatJadi.status, "bpjsJadi")}
//               disabled={!selectedAntrianBpjsObatJadi}
//               className={`${
//                 !selectedAntrianBpjsObatJadi
//                   ? "bg-gray-400 cursor-not-allowed"
//                   : "bg-red-500 hover:bg-red-600"
//               } text-white font-bold py-2 px-4 rounded-lg w-full`}
//             >
//               Skip
//             </button>
//           ) : (
//             <p className="text-gray-600 mb-6">Tidak ada antrian</p>
//           )}
//         </div>

//         {/* Obat Racikan Section */}
//         <div className="bg-white shadow-md rounded-lg p-6 w-80 text-center">
//           <h1 className="text-2xl font-bold text-gray-800 mb-6">Obat Racikan</h1>
//           <h2 className="text-lg font-semibold text-gray-600 mb-4">Panggil Antrian</h2>

//           {selectedAntrianObatRacikan ? (
//             <div className="mb-6">
//               <p className="text-3xl font-bold text-blue-600 mb-2">Nomor Antrian</p>
//               <p className="text-6xl font-extrabold text-gray-900">{selectedAntrianObatRacikan.no_antrian}</p>
//             </div>
//           ) : (
//             <p className="text-gray-600 mb-6">Tidak ada antrian</p>
//           )}

//           <div className="mb-4">
//             <button
//               onClick={() => handleFetchAndPlayAudio(1, selectedAntrianObatRacikan)}
//               disabled={!selectedAntrianObatRacikan || isLoading}
//               className={`${
//                 !selectedAntrianObatRacikan || isLoading
//                   ? "bg-gray-400 cursor-not-allowed"
//                   : "bg-blue-500 hover:bg-blue-600"
//               } text-white font-bold py-2 px-4 rounded-lg mb-2 w-full`}
//             >
//               Loket 1
//             </button>
//             <button
//               onClick={() => handleFetchAndPlayAudio(2, selectedAntrianObatRacikan)}
//               disabled={!selectedAntrianObatRacikan || isLoading}
//               className={`${
//                 !selectedAntrianObatRacikan || isLoading
//                   ? "bg-gray-400 cursor-not-allowed"
//                   : "bg-blue-500 hover:bg-blue-600"
//               } text-white font-bold py-2 px-4 rounded-lg mb-2 w-full`}
//             >
//               Loket 2
//             </button>
//           </div>

//           {selectedAntrianObatRacikan ? (
//             <button
//               onClick={() => handleUpdateStatus(selectedAntrianObatRacikan.id_antrian, selectedAntrianObatRacikan.status, "obatRacikan")}
//               disabled={!selectedAntrianObatRacikan}
//               className={`${
//                 !selectedAntrianObatRacikan
//                   ? "bg-gray-400 cursor-not-allowed"
//                   : "bg-red-500 hover:bg-red-600"
//               } text-white font-bold py-2 px-4 rounded-lg w-full`}
//             >
//               Skip
//             </button>
//           ) : (
//             <p className="text-gray-600 mb-6">Tidak ada antrian</p>
//           )}
//         </div>

//         {/* Obat Jadi Section */}
//         <div className="bg-white shadow-md rounded-lg p-6 w-80 text-center">
//           <h1 className="text-2xl font-bold text-gray-800 mb-6">Obat Jadi</h1>
//           <h2 className="text-lg font-semibold text-gray-600 mb-4">Panggil Antrian</h2>

//           {selectedAntrianObatJadi ? (
//             <div className="mb-6">
//               <p className="text-3xl font-bold text-blue-600 mb-2">Nomor Antrian</p>
//               <p className="text-6xl font-extrabold text-gray-900">{selectedAntrianObatJadi.no_antrian}</p>
//             </div>
//           ) : (
//             <p className="text-gray-600 mb-6">Tidak ada antrian</p>
//           )}

//           <div className="mb-4">
//             <button
//               onClick={() => handleFetchAndPlayAudio(1, selectedAntrianObatJadi)}
//               disabled={!selectedAntrianObatJadi || isLoading}
//               className={`${
//                 !selectedAntrianObatJadi || isLoading
//                   ? "bg-gray-400 cursor-not-allowed"
//                   : "bg-blue-500 hover:bg-blue-600"
//               } text-white font-bold py-2 px-4 rounded-lg mb-2 w-full`}
//             >
//               Loket 1
//             </button>
//             <button
//               onClick={() => handleFetchAndPlayAudio(2, selectedAntrianObatJadi)}
//               disabled={!selectedAntrianObatJadi || isLoading}
//               className={`${
//                 !selectedAntrianObatJadi || isLoading
//                   ? "bg-gray-400 cursor-not-allowed"
//                   : "bg-blue-500 hover:bg-blue-600"
//               } text-white font-bold py-2 px-4 rounded-lg mb-2 w-full`}
//             >
//               Loket 2
//             </button>
//           </div>

//           {selectedAntrianObatJadi ? (
//             <button
//               onClick={() => handleUpdateStatus(selectedAntrianObatJadi.id_antrian, selectedAntrianObatJadi.status, "obatJadi")}
//               disabled={!selectedAntrianObatJadi}
//               className={`${
//                 !selectedAntrianObatJadi
//                   ? "bg-gray-400 cursor-not-allowed"
//                   : "bg-red-500 hover:bg-red-600"
//               } text-white font-bold py-2 px-4 rounded-lg w-full`}
//             >
//               Skip
//             </button>
//           ) : (
//             <p className="text-gray-600 mb-6">Tidak ada antrian</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PageCall;
