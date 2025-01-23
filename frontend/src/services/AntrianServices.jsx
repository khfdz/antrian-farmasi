import axios from 'axios';

// Base URL untuk API
const BASE_URL = 'http://localhost:5000/api/antrian';

//-----------------------------------------------ANTRIAN BPJS OBAT RACIKAN-----------------------------------//
export const fetchLastAntrianBpjsObatRacikanService = async () => {
  const response = await axios.get(`${BASE_URL}/bpjs/obat-racikan/latest`);
  return response.data;
};

export const fetchAntrianBpjsObatRacikanByStatusService = async () => {
  const response = await axios.get(`${BASE_URL}/bpjs/obat-racikan/0`);
  return response.data;
};

export const fetchAndPrintAntrianBpjsObatRacikanService = async () => {
  const response = await axios.post(`${BASE_URL}/bpjs/obat-racikan`);
  return response.data;
};

export const updateStatusAntrianBpjsObatRacikanService = async (id, status) => {
  const response = await axios.patch(
    `${BASE_URL}/bpjs/obat-racikan/${id}/status`,
    { status }
  );
  return response.data;
};
//-----------------------------------------------ANTRIAN BPJS OBAT RACIKAN-----------------------------------//


//-----------------------------------------------ANTRIAN BPJS OBAT JADI---------------------------------------//
export const fetchLastAntrianBpjsObatJadiService = async () => {
  const response = await axios.get(`${BASE_URL}/bpjs/obat-jadi/latest`);
  return response.data;
};

export const fetchAntrianBpjsObatJadiByStatusService = async () => {
  const response = await axios.get(`${BASE_URL}/bpjs/obat-jadi/0`);
  return response.data;
};

export const fetchAndPrintAntrianBpjsObatJadiService = async () => {
  const response = await axios.post(`${BASE_URL}/bpjs/obat-jadi`);
  return response.data;
};

export const updateStatusAntrianBpjsObatJadiService = async (id, status) => {
  const response = await axios.patch(
    `${BASE_URL}/bpjs/obat-jadi/${id}/status`,
    { status }
  );
  return response.data;
};
//-----------------------------------------------ANTRIAN BPJS OBAT JADI---------------------------------------//

//-----------------------------------------------ANTRIAN OBAT RACIKAN---------------------------------------//
export const fetchLastAntrianObatRacikanService = async () => {
  const response = await axios.get(`${BASE_URL}/obat-racikan/latest`);
  return response.data;
};

export const fetchAntrianObatRacikanByStatusService = async () => {
  const response = await axios.get(`${BASE_URL}/obat-racikan/0`);
  return response.data;
};

export const fetchAndPrintAntrianObatRacikanService = async () => {
  const response = await axios.post(`${BASE_URL}/obat-racikan`);
  return response.data;
};

export const updateStatusAntrianObatRacikanService = async (id, status) => {
  const response = await axios.patch(
    `${BASE_URL}/obat-racikan/${id}/status`,
    { status }
  );
  return response.data;
};
//-----------------------------------------------ANTRIAN OBAT RACIKAN---------------------------------------//

//-----------------------------------------------ANTRIAN OBAT JADI---------------------------------------//
export const fetchLastAntrianObatJadiService = async () => {
  const response = await axios.get(`${BASE_URL}/obat-jadi/latest`);
  return response.data;
};

export const fetchAntrianObatJadiByStatusService = async () => {
  const response = await axios.get(`${BASE_URL}/obat-jadi/0`);
  return response.data;
};

export const fetchAndPrintAntrianObatJadiService = async () => {
  const response = await axios.post(`${BASE_URL}/obat-jadi`);
  return response.data;
};

export const updateStatusAntrianObatJadiService = async (id, status) => {
  const response = await axios.patch(
    `${BASE_URL}/obat-jadi/${id}/status`,
    { status }
  );
  return response.data;
};
//-----------------------------------------------ANTRIAN OBAT JADI---------------------------------------//
