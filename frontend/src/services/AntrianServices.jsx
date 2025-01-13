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

//-----------------------------------------------ANTRIAN OBAT RACIKAN---------------------------------------//
export const fetchLastAntrianObatRacikanService = async () => {
  const response = await axios.get(
    'http://localhost:5000/api/antrian/obat-racikan/latest'
  );
  return response.data;
}

export const fetchAntrianObatRacikanByStatusService = async () => {
  const response = await axios.get(
    'http://localhost:5000/api/antrian/obat-racikan/0'
  );
  return response.data;
}

export const fetchAndPrintAntrianObatRacikanService = async () => {
  const response = await axios.post(
    'http://localhost:5000/api/antrian/obat-racikan'
  );
  return response.data;
}
//-----------------------------------------------ANTRIAN OBAT RACIKAN---------------------------------------//

//-----------------------------------------------ANTRIAN OBAT JADI---------------------------------------//
export const fetchLastAntrianObatJadiService = async () => {
  const response = await axios.get(
    'http://localhost:5000/api/antrian/obat-jadi/latest'
  );
  return response.data;
}

export const fetchAntrianObatJadiByStatusService = async () => {
  const response = await axios.get(
    'http://localhost:5000/api/antrian/obat-jadi/0'
  );
  return response.data;
}

export const fetchAndPrintAntrianObatJadiService = async () => {
  const response = await axios.post(
    'http://localhost:5000/api/antrian/obat-jadi'
  );
  return response.data;
}
//-----------------------------------------------ANTRIAN OBAT JADI---------------------------------------//