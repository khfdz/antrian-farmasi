import React, { useState, useEffect } from "react";
import io from "socket.io-client";

// const socket = io("http://localhost:5000");
const socket = io("http://192.168.1.200:5000"); // Pastikan menghubungkan ke IP laptop backend


const PageView = () => {
  // Menyimpan data antrian yang terbaru untuk racikan dan jadi
  const [bpjsRacikanData, setBpjsRacikanData] = useState(null);
  const [bpjsJadiData, setBpjsJadiData] = useState(null);

  const [racikanData, setRacikanData] = useState(null);
  const [jadiData, setJadiData] = useState(null);

  // Fetch data awal
  const fetchInitialData = async () => {
    try {
      const responseBpjsRacikan = await fetch("http://localhost:5000/api/antrian/bpjs/obat-racikan/latest");
      const dataBpjsRacikan = await responseBpjsRacikan.json();
      setBpjsRacikanData(dataBpjsRacikan.no_antrian);

      const responseBpjsJadi = await fetch("http://localhost:5000/api/antrian/bpjs/obat-jadi/latest");
      const dataBpjsJadi = await responseBpjsJadi.json();
      setBpjsJadiData(dataBpjsJadi.no_antrian);

      const responseRacikan = await fetch("http://localhost:5000/api/antrian/obat-racikan/latest");
      const dataRacikan = await responseRacikan.json();
      setRacikanData(dataRacikan.no_antrian);

      const responseJadi = await fetch("http://localhost:5000/api/antrian/obat-jadi/latest");
      const dataJadi = await responseJadi.json();
      setJadiData(dataJadi.no_antrian);


      console.log("Data awal diambil:", { dataRacikan, dataJadi, dataBpjsRacikan, dataBpjsJadi });
    } catch (error) {
      console.error("Error loading initial data:", error);
    }
  };

  useEffect(() => {
    // Ambil data awal saat komponen dimuat
    fetchInitialData();

    // Bergabung ke room WebSocket untuk mendengarkan pembaruan
    socket.emit("joinRoom", "bpjs-obat-racikan");
    socket.emit("joinRoom", "bpjs-obat-jadi");
    socket.emit("joinRoom", "obat-racikan");
    socket.emit("joinRoom", "obat-jadi");
    
    socket.on("queueUpdated-bpjs-obat-racikan", (data) => {
          console.log("Pembaruan dari Socket.IO (Racikan):", data);
          // Update data terbaru dengan data yang baru
          setBpjsRacikanData(data.queueNumber);
        });
    
    socket.on("queueUpdated-bpjs-obat-jadi", (data) => {
          console.log("Pembaruan dari Socket.IO (Jadi):", data);
          // Update data terbaru dengan data yang baru
          setBpjsJadiData(data.queueNumber);
        });

    socket.on("queueUpdated-obat-racikan", (data) => {
      console.log("Pembaruan dari Socket.IO (Racikan):", data);
      // Update data terbaru dengan data yang baru
      setRacikanData(data.queueNumber);
    });

    socket.on("queueUpdated-obat-jadi", (data) => {
      console.log("Pembaruan dari Socket.IO (Jadi):", data);
      // Update data terbaru dengan data yang baru
      setJadiData(data.queueNumber);
    });

    // Membersihkan listener saat komponen di-unmount
    return () => {
      socket.off("queueUpdated-bpjs-obat-racikan");
      socket.off("queueUpdated-bpjs-obat-jadi");
      socket.off("queueUpdated-obat-racikan");
      socket.off("queueUpdated-obat-jadi");
    };
  }, []);

  return (
    <div>
      <h1>Page View</h1>

      <div style={{ marginBottom: "20px" }}>
        <h2>BPJS Obat Racikan</h2>
        <p>
          Nomor Antrian: {bpjsRacikanData !== null ? bpjsRacikanData : "Memuat..."}
        </p>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h2>BPJS Obat Jadi</h2>
        <p>
          Nomor Antrian: {bpjsJadiData !== null ? bpjsJadiData : "Memuat..."}
        </p>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h2>Obat Racikan</h2>
        <p>
          Nomor Antrian: {racikanData !== null ? racikanData : "Memuat..."}
        </p>
      </div>

      <div style={{ marginBottom: "20px" }}>
        <h2>Obat Jadi</h2>
        <p>
          Nomor Antrian: {jadiData !== null ? jadiData : "Memuat..."}
        </p>
      </div>



    </div>
  );
};

export default PageView;
