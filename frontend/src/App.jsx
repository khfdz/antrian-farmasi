import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AudioProvider } from './context/AudioContext';
import { AntrianProvider} from './context/AntrianContext';
import PageCall from './pages/PageCall';
import PagePrint from './pages/PagePrint';

const App = () => {
  return (
      <AntrianProvider>
    <AudioProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PageCall />} />
          <Route path="/print" element={<PagePrint />} />
        </Routes>
      </Router>
    </AudioProvider>
      </AntrianProvider>
  );
};

export default App;
