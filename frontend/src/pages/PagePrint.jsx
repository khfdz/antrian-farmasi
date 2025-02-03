import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const localAccess = import.meta.env.VITE_NETWORK;
const socket = io(`http://${localAccess}`);

const PagePrint = () => {
  const [latestBpjsRacikan, setLatestBpjsRacikan] = useState(null);
  const [latestBpjsJadi, setLatestBpjsJadi] = useState(null);
  const [latestRacikan, setLatestRacikan] = useState(null);
  const [latestJadi, setLatestJadi] = useState(null);

  // Fetch initial data
  const fetchInitialData = async () => {
    try {
      const urls = [
        "bpjs/obat-racikan/latest",
        "bpjs/obat-jadi/latest",
        "obat-racikan/latest",
        "obat-jadi/latest",
      ];

      const responses = await Promise.all(
        urls.map((url) => axios.get(`http://${localAccess}/api/antrian/${url}`))
      );

      setLatestBpjsRacikan(responses[0].data.no_antrian);
      setLatestBpjsJadi(responses[1].data.no_antrian);
      setLatestRacikan(responses[2].data.no_antrian);
      setLatestJadi(responses[3].data.no_antrian);

      console.log(
        "Data awal diambil:",
        responses.map((res) => res.data)
      );
    } catch (error) {
      console.error("Error loading initial data:", error);
    }
  };

  // Handle antrian update
  const handleAntrian = async (jenis) => {
    try {
      const endpoint = `http://${localAccess}/api/antrian/${jenis}`;

      const response = await axios.post(
        endpoint,
        {},
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = response.data; // Respons data akan berada di response.data
      console.log(`Antrian ditambahkan untuk ${jenis}:`, data);

      // Tentukan room berdasarkan jenis
      let roomName;
      if (jenis === "bpjs/obat-racikan") {
        roomName = "bpjs-obat-racikan";
      } else if (jenis === "bpjs/obat-jadi") {
        roomName = "bpjs-obat-jadi";
      } else if (jenis === "obat-racikan") {
        roomName = "obat-racikan";
      } else if (jenis === "obat-jadi") {
        roomName = "obat-jadi";
      }

      // Kirim ke room yang tepat
      socket.emit("sendAntrianUpdate", {
        room: roomName,
        antrianNumber: data.no_antrian,
      });

      switch (jenis) {
        case "bpjs/obat-racikan":
          setLatestBpjsRacikan(data.no_antrian);
          break;
        case "bpjs/obat-jadi":
          setLatestBpjsJadi(data.no_antrian);
          break;
        case "obat-racikan":
          setLatestRacikan(data.no_antrian);
          break;
        case "obat-jadi":
          setLatestJadi(data.no_antrian);
          break;
        default:
          console.error("Jenis tidak dikenali");
          break;
      }

      fetchInitialData();
    } catch (error) {
      console.error(`Error adding antrian for ${jenis}:`, error);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  return (
    <div className="bg-gray-100">
      <Navbar />

      <div className="p-4 space-between flex gap-12 mt-[86px] mb-[80px]">
        {[
          {
            label: "Obat Non Racikan",
            color: "bg-biru1",
            prefix: "A",
            button: () => handleAntrian("bpjs/obat-racikan"),
          },
          {
            label: "Obat Racikan",
            color: "bg-biru1",
            prefix: "B",
            button: () => handleAntrian("bpjs/obat-jadi"),
          },
          {
            label: "Obat Non Racikan",
            color: "bg-hijau1",
            prefix: "C",
            button: () => handleAntrian("obat-racikan"),
          },
          {
            label: "Obat Racikan",
            color: "bg-hijau1",
            prefix: "D",
            button: () => handleAntrian("obat-jadi"),
          },
        ].map(({ label, color, prefix, button }, index) => (
          <div
            key={index}
            className={`${color} w-[30%] h-[50%] text-center rounded-md shadow-xl`}>
            <h2 className="bg-white p-2 text-2xl rounded-t-md">{label}</h2>
            <p className="text-6xl text-white w-full py-12 items-center justify-center">
              {prefix}{" "}
              {
                // Menampilkan nomor antrian jika ada, atau teks loading jika belum ada
                latestBpjsRacikan ||
                latestBpjsJadi ||
                latestRacikan ||
                latestJadi
                  ? prefix === "A"
                    ? latestBpjsRacikan
                    : prefix === "B"
                    ? latestBpjsJadi
                    : prefix === "C"
                    ? latestRacikan
                    : prefix === "D"
                    ? latestJadi
                    : "Memuat..."
                  : "Memuat..."
              }
            </p>
            <button
              onClick={button}
              className="p-4 mb-6 bg-white rounded-md text-xl">
              Cetak Antrian
            </button>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default PagePrint;
