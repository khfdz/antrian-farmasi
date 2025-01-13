import { createContext, useState, useCallback } from 'react';
import propTypes from 'prop-types';
import {
  fetchLastAntrianBpjsObatRacikanService,
  fetchAntrianBpjsObatRacikanByStatusService,
  fetchAndPrintAntrianBpjsObatRacikanService,

  fetchLastAntrianBpjsObatJadiService,
  fetchAntrianBpjsObatJadiByStatusService,
  fetchAndPrintAntrianBpjsObatJadiService,

  fetchLastAntrianObatJadiService,
  fetchAntrianObatJadiByStatusService,
  fetchAndPrintAntrianObatJadiService,

  fetchLastAntrianObatRacikanService,
  fetchAntrianObatRacikanByStatusService,
  fetchAndPrintAntrianObatRacikanService

} from '../services/AntrianServices';

export const AntrianContext = createContext();

export const AntrianProvider = ({ children }) => {
  const [antrianBpjsObatRacikan, setAntrianBpjsObatRacikan] = useState(null);
  const [antrianListBpjsObatRacikan, setAntrianListBpjsObatRacikan] = useState(null);

  const [antrianBpjsObatJadi, setAntrianBpjsObatJadi] = useState(null);
  const [antrianListBpjsObatJadi, setAntrianListBpjsObatJadi] = useState(null);

  const [antrianObatJadi, setAntrianObatJadi] = useState(null);
  const [antrianListObatJadi, setAntrianListObatJadi] = useState(null);

  const [antrianObatRacikan, setAntrianObatRacikan] = useState(null);
  const [antrianListObatRacikan, setAntrianListObatRacikan] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

//-----------------------------------------------ANTRIAN BPJS OBAT RACIKAN-----------------------------------//
  const fetchLastAntrianBpjsObatRacikan = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchLastAntrianBpjsObatRacikanService();
      setAntrianBpjsObatRacikan(data);
    } catch (error) {
      console.error('Error fetching last antrian BPJS Obat Racikan:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchAntrianBpjsObatRacikanByStatus = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchAntrianBpjsObatRacikanByStatusService();
      setAntrianListBpjsObatRacikan(data);
    } catch (error) {
      console.error('Error fetching antrian BPJS Obat Racikan by status:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchAndPrintAntrianBpjsObatRacikan = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchAndPrintAntrianBpjsObatRacikanService();
      setAntrianBpjsObatRacikan(data);
      setTimeout(() => {
        window.print();
      }, 500);
    } catch (error) {
      console.error('Error fetching and printing antrian BPJS Obat Racikan:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);
//-----------------------------------------------ANTRIAN BPJS OBAT RACIKAN-----------------------------------//



//-----------------------------------------------ANTRIAN BPJS OBAT JADI---------------------------------------//
  const fetchLastAntrianBpjsObatJadi = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchLastAntrianBpjsObatJadiService();
      setAntrianBpjsObatJadi(data);
    } catch (error) {
      console.error('Error fetching last antrian BPJS Obat Jadi:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchAntrianBpjsObatJadiByStatus = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchAntrianBpjsObatJadiByStatusService();
      setAntrianListBpjsObatJadi(data);
    } catch (error) {
      console.error('Error fetching antrian BPJS Obat Jadi by status:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchAndPrintAntrianBpjsObatJadi = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchAndPrintAntrianBpjsObatJadiService();
      setAntrianBpjsObatJadi(data);
      setTimeout(() => {
        window.print();
      }, 500);
    } catch (error) {
      console.error('Error fetching and printing antrian BPJS Obat Jadi:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);
//-----------------------------------------------ANTRIAN BPJS OBAT JADI---------------------------------------//

//-----------------------------------------------ANTRIAN OBAT JADI---------------------------------------//
  const fetchLastAntrianObatJadi = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchLastAntrianObatJadiService();
      setAntrianObatJadi(data);
    } catch (error) {
      console.error('Error fetching last antrian Obat Jadi:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchAntrianObatJadiByStatus = useCallback(async () => {
    setIsLoading(true);
    try { 
      const data = await fetchAntrianObatJadiByStatusService();
      setAntrianListObatJadi(data);
    } catch (error) {
      console.error('Error fetching antrian Obat Jadi by status:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchAndPrintAntrianObatJadi = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchAndPrintAntrianObatJadiService();
      setAntrianObatJadi(data);
      setTimeout(() => {
        window.print();
      }, 500);
    } catch (error) {
      console.error('Error fetching and printing antrian Obat Jadi:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);
//-----------------------------------------------ANTRIAN OBAT JADI---------------------------------------//

//-----------------------------------------------ANTRIAN OBAT RACIKAN---------------------------------------//
  const fetchLastAntrianObatRacikan = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchLastAntrianObatRacikanService();
      setAntrianObatRacikan(data);
    } catch (error) {
      console.error('Error fetching last antrian Obat Racikan:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchAntrianObatRacikanByStatus = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchAntrianObatRacikanByStatusService();
      setAntrianListObatRacikan(data);
    } catch (error) {
      console.error('Error fetching antrian Obat Racikan by status:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);
    
  const fetchAndPrintAntrianObatRacikan = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchAndPrintAntrianObatRacikanService();
      setAntrianObatRacikan(data);
      setTimeout(() => {
        window.print();
      }, 500);
    } catch (error) {
      console.error('Error fetching and printing antrian Obat Racikan:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);
//-----------------------------------------------ANTRIAN OBAT RACIKAN---------------------------------------//  

  return (
    <AntrianContext.Provider
      value={{
        antrianBpjsObatRacikan,
        antrianListBpjsObatRacikan,
        fetchLastAntrianBpjsObatRacikan,
        fetchAntrianBpjsObatRacikanByStatus,
        fetchAndPrintAntrianBpjsObatRacikan,

        antrianBpjsObatJadi,
        antrianListBpjsObatJadi,
        fetchLastAntrianBpjsObatJadi,
        fetchAntrianBpjsObatJadiByStatus,
        fetchAndPrintAntrianBpjsObatJadi,

        antrianObatJadi,
        antrianListObatJadi,
        fetchLastAntrianObatJadi,
        fetchAntrianObatJadiByStatus,
        fetchAndPrintAntrianObatJadi,

        antrianObatRacikan,
        antrianListObatRacikan,
        fetchLastAntrianObatRacikan,
        fetchAntrianObatRacikanByStatus,
        fetchAndPrintAntrianObatRacikan,

        isLoading,
      }}
    >
      {children}
    </AntrianContext.Provider>
  );
};

AntrianProvider.propTypes = {
  children: propTypes.node.isRequired,
};