// import React, { createContext, useState, useContext } from "react";

// const AudioContext = createContext();

// export const AudioProvider = ({ children }) => {
//   const [audioSequence, setAudioSequence] = useState([]);

//   const fetchAudioSequence = async (letter, number, loket) => {
//     try {
//       const response = await fetch(
//         `http://localhost:5000/api/audio/call?letter=${letter}&number=${number}&loket=${loket}`
//       );
//       const data = await response.json();
//       if (data.sequence) {
//         setAudioSequence(data.sequence);
//       } else {
//         console.error("No audio sequence found in response");
//       }
//     } catch (error) {
//       console.error("Error fetching audio sequence:", error);
//     }
//   };

//   const playAudioSequence = async () => {
//     if (audioSequence.length === 0) {
//       console.error("Audio sequence is empty");
//       return;
//     }

//     for (const audioUrl of audioSequence) {
//       try {
//         const audio = new Audio(audioUrl);
//         await audio.play();
//         // Tunggu hingga audio selesai diputar sebelum melanjutkan ke audio berikutnya
//         await new Promise((resolve) => {
//           audio.onended = resolve;
//           audio.onerror = resolve; // Jika error, lanjut ke audio berikutnya
//         });
//       } catch (error) {
//         console.error("Error playing audio:", error);
//       }
//     }
//   };

//   return (
//     <AudioContext.Provider
//       value={{ audioSequence, fetchAudioSequence, playAudioSequence }}
//     >
//       {children}
//     </AudioContext.Provider>
//   );
// };

// export const useAudio = () => useContext(AudioContext);
