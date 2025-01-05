import { useContext } from 'react';
import { AntrianContext } from '../context/AntrianContext';

export const useAntrian = () => {
  const context = useContext(AntrianContext);

  if (!context) {
    throw new Error('useAntrian harus digunakan di dalam AntrianProvider');
  }

  return context;
};
