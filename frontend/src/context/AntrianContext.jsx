import { createContext, useState, useCallback } from 'react';
import propTypes from 'prop-types';
import {
  fetchLastAntrianBpjsObatRacikanService,
  fetchAntrianBpjsObatRacikanByStatusService,
  fetchAndPrintAntrianBpjsObatRacikanService,

  fetchLastAntrianBpjsObatJadiService,
  fetchAntrianBpjsObatJadiByStatusService,
  fetchAndPrintAntrianBpjsObatJadiService


} from '../services/AntrianServices';

export const AntrianContext = createContext();

export const AntrianProvider = ({ children }) => {
  const [antrianBpjsObatRacikan, setAntrianBpjsObatRacikan] = useState(null);
  const [antrianListBpjsObatRacikan, setAntrianListBpjsObatRacikan] = useState(null);

  const [antrianBpjsObatJadi, setAntrianBpjsObatJadi] = useState(null);
  const [antrianListBpjsObatJadi, setAntrianListBpjsObatJadi] = useState(null);

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