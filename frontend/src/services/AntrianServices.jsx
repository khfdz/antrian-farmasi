// AntrianServices.js
import axios from 'axios';


//-----------------------------------------------ANTRIAN BPJS OBAT RACIKAN-----------------------------------//
export const fetchLastAntrianBpjsObatRacikanService = async () => {
  const response = await axios.get(
    'http://localhost:5000/api/antrian/bpjs/obat-racikan/latest'
  );
  return response.data;
};

export const fetchAntrianBpjsObatRacikanByStatusService = async () => {
  const response = await axios.get(
    'http://localhost:5000/api/antrian/bpjs/obat-racikan/0'
  );
  return response.data;
};

export const fetchAndPrintAntrianBpjsObatRacikanService = async () => {
  const response = await axios.post(
    'http://localhost:5000/api/antrian/bpjs/obat-racikan'
  );
  return response.data;
};


//-----------------------------------------------ANTRIAN BPJS OBAT RACIKAN-----------------------------------//


//-----------------------------------------------ANTRIAN BPJS OBAT JADI---------------------------------------//
export const fetchLastAntrianBpjsObatJadiService = async () => {
  const response = await axios.get(
    'http://localhost:5000/api/antrian/bpjs/obat-jadi/latest'
  );
  return response.data;
};

export const fetchAntrianBpjsObatJadiByStatusService = async () => {
  const response = await axios.get(
    'http://localhost:5000/api/antrian/bpjs/obat-jadi/0'
  );
  return response.data;
};

export const fetchAndPrintAntrianBpjsObatJadiService = async () => {
  const response = await axios.post(
    'http://localhost:5000/api/antrian/bpjs/obat-jadi'
  );
  return response.data;
};
//-----------------------------------------------ANTRIAN BPJS OBAT JADI---------------------------------------//

