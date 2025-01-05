import React, { createContext, useState, useContext } from 'react';

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [audioSequence, setAudioSequence] = useState([]);

  const fetchAudioSequence = async (letter, number, loket) => {
    try {
      const response = await fetch(`http://localhost:5000/api/audio/call?letter=${letter}&number=${number}&loket=${loket}`);
      const data = await response.json();
      if (data.sequence) {
        setAudioSequence(data.sequence);
      } else {
        console.error('No audio sequence found in response');
      }
    } catch (error) {
      console.error('Error fetching audio sequence:', error);
    }
  };

  return (
    <AudioContext.Provider value={{ audioSequence, fetchAudioSequence }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);
