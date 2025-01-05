import React, { createContext, useContext, useState, useCallback } from 'react';
import axios from 'axios';

const AntrianContext = createContext();

export const AntrianProvider = ({ children }) => {
  const [antrian, setAntrian] = useState(null);
  const [antrianBpjsRacikan, setAntrianBpjsRacikan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Ambil antrian terakhir dari backend
  const fetchLastAntrian = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/antrian/bpjs/obat-racikan/latest');
      if (response.data && response.data.no_antrian) {
        setAntrian(response.data);
      } else {
        console.error('No antrian found in response');
      }
    } catch (error) {
      console.error('Error fetching last antrian:', error);
    } finally {
      setIsLoading(false);
    }
  }, []); // Tidak memiliki dependensi sehingga hanya dibuat sekali

  const fetchAntrianBpjsRacikanByStatus = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/antrian/bpjs/obat-racikan/0`);
      if (response.data) {
        setAntrianBpjsRacikan(response.data);
      } else {
        console.error('No antrian found in response');
      }
    } catch (error) {
      console.error('Error fetching last antrian:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Ambil antrian baru dari backend dan cetak tiket
  const fetchAndPrintAntrian = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/antrian/bpjs/obat-racikan');
      if (response.data.no_antrian) {
        setAntrian(response.data);

        // Tunggu hingga data diperbarui sebelum mencetak
        setTimeout(() => {
          window.print();
        }, 500);
      } else {
        console.error('Failed to fetch antrian');
      }
    } catch (error) {
      console.error('Error fetching antrian:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  

  return (
    <AntrianContext.Provider value={{ 
      antrian, 
      fetchLastAntrian,
       
      isLoading, 
      
      fetchAndPrintAntrian,
      antrianBpjsRacikan,
      fetchAntrianBpjsRacikanByStatus
       }}>
      {children}
    </AntrianContext.Provider>
  );
};

export const useAntrian = () => useContext(AntrianContext);
