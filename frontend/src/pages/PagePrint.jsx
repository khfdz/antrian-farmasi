import React, { useState, useEffect } from "react";
import io from "socket.io-client";

// const socket = io("http://localhost:5000");
const localAccess = import.meta.env.VITE_NETWORK;
const socket = io(`http://${localAccess}`); // Pastikan menghubungkan ke IP laptop backend

const PagePrint = () => {
  const [latestBpjsRacikan, setLatestBpjsRacikan] = useState(null);
  const [latestBpjsJadi, setLatestBpjsJadi] = useState(null);

  const [latestRacikan, setLatestRacikan] = useState(null);
  const [latestJadi, setLatestJadi] = useState(null);

  const fetchInitialData = async () => {
    try {
      const responseBpjsRacikan = await fetch(
        `http://${localAccess}/api/antrian/bpjs/obat-racikan/latest`
      );
      const dataBpjsRacikan = await responseBpjsRacikan.json();
      setLatestBpjsRacikan(dataBpjsRacikan.no_antrian);

      const responseBpjsJadi = await fetch(
        `http://${localAccess}/api/antrian/bpjs/obat-jadi/latest`
      );
      const dataBpjsJadi = await responseBpjsJadi.json();
      setLatestBpjsJadi(dataBpjsJadi.no_antrian);

      const responseRacikan = await fetch(
        `http://${localAccess}/api/antrian/obat-racikan/latest`
      );
      const dataRacikan = await responseRacikan.json();
      setLatestRacikan(dataRacikan.no_antrian);

      const responseJadi = await fetch(
        `http://${localAccess}/api/antrian/obat-jadi/latest`
      );
      const dataJadi = await responseJadi.json();
      setLatestJadi(dataJadi.no_antrian);

      console.log("Data awal diambil:", { dataRacikan, dataJadi });
    } catch (error) {
      console.error("Error loading initial data:", error);
    }
  };

  const handleAddAntrian = async (jenis) => {
    try {
      const endpoint = `http://${localAccess}/api/antrian/${jenis}`;
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      console.log(`Antrian ditambahkan untuk ${jenis}:`, data);

      const roomName = `${jenis}`;
      socket.emit("sendAntrianUpdate", {
        room: roomName,
        antrianNumber: data.no_antrian,
      });

      if (jenis === "obat-racikan") {
        setLatestRacikan(data.no_antrian);
      } else if (jenis === "obat-jadi") {
        setLatestJadi(data.no_antrian);
      }
    } catch (error) {
      console.error(`Error adding antrian for ${jenis}:`, error);
    }
  };

  const handleBpjsAddAntrian = async (jenis) => {
    try {
      const endpoint = `http://${localAccess}/api/antrian/bpjs/${jenis}`;
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      console.log(`Antrian ditambahkan untuk ${jenis}:`, data);

      const roomName = `bpjs-${jenis}`;
      socket.emit("sendAntrianUpdate", {
        room: roomName,
        antrianNumber: data.no_antrian,
      });

      if (jenis === "obat-racikan") {
        setLatestBpjsRacikan(data.no_antrian);
      } else if (jenis === "obat-jadi") {
        setLatestBpjsJadi(data.no_antrian);
      }
    } catch (error) {
      console.error(`Error adding antrian for ${jenis}:`, error);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  return (
    <div>
      <h1>Page Print</h1>

      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => handleBpjsAddAntrian("obat-racikan")}>
          Tambah Antrian
        </button>
        <p>BPJS OBAT RACIKAN: {latestBpjsRacikan || "Belum ada data"}</p>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => handleBpjsAddAntrian("obat-jadi")}>
          Tambah Antrian
        </button>
        <p>BPJS OBAT JADI: {latestBpjsJadi || "Belum ada data"}</p>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => handleAddAntrian("obat-racikan")}>
          Tambah Antrian
        </button>
        <p>OBAT RACIKAN: {latestRacikan || "Belum ada data"}</p>
      </div>

      <div>
        <button onClick={() => handleAddAntrian("obat-jadi")}>
          Tambah Antrian
        </button>
        <p>OBAT JADI: {latestJadi || "Belum ada data"}</p>
      </div>
    </div>
  );
};

export default PagePrint;
