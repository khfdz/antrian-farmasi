import { useState } from 'react'
import audioData from './data/audioData.json'

const App = () => {
  const [currentAudio, setCurrentAudio] = useState(null);

  const handlePlayAudio = (audioId) => {
    setCurrentAudio(audioId);
    const audio = new Audio(audioId);
    audio.play();
  };

  return (
    <>
      <h1>Audio Player</h1>
      <ul>
        {audioData.map((audio) => (
          <li key={audio.id}>
            <button onClick={() => handlePlayAudio(audio.file)}>
              Play {audio.title}
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default App