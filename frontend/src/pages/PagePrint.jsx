import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/FooterAdm";

const localAccess = import.meta.env.VITE_NETWORK;
const socket = io(`http://${localAccess}`);

const PagePrint = () => {
  const [latestBpjsRacikan, setLatestBpjsRacikan] = useState(null);
  const [latestBpjsJadi, setLatestBpjsJadi] = useState(null);
  const [latestRacikan, setLatestRacikan] = useState(null);
  const [latestJadi, setLatestJadi] = useState(null);

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
    fetchInitialData(); // Ambil data awal saat komponen mount

    socket.emit("joinRoom", "antrian-room");

    socket.on("receiveQueueUpdate", ({ section, queueNumber }) => {
      console.log(`Update antrian diterima untuk ${section}: ${queueNumber}`);

      // Pastikan hanya update jika queueNumber baru berbeda
      if (
        section === "bpjs-obat-racikan" &&
        queueNumber !== latestBpjsRacikan
      ) {
        setLatestBpjsRacikan(queueNumber);
      } else if (
        section === "bpjs-obat-jadi" &&
        queueNumber !== latestBpjsJadi
      ) {
        setLatestBpjsJadi(queueNumber);
      } else if (section === "obat-racikan" && queueNumber !== latestRacikan) {
        setLatestRacikan(queueNumber);
      } else if (section === "obat-jadi" && queueNumber !== latestJadi) {
        setLatestJadi(queueNumber);
      }
    });

    return () => {
      socket.off("receiveQueueUpdate"); // Bersihkan listener saat unmount
    };
  }, [latestBpjsRacikan, latestBpjsJadi, latestRacikan, latestJadi]);

  const formatWIBTime = () => {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes} WIB`;
  };

  const handlePrint = (data, sectionTitle) => {
    const timeWIB = formatWIBTime();

    // Emit update lebih dulu biar cepat sampai ke socket
    socket.emit("sendQueueUpdate", {
      section: data.section,
      queueNumber: data.queueNumber,
    });

    console.log("Nomor antrian dikirim ke socket:", {
      section: data.section,
      queueNumber: data.queueNumber,
    });

    const newWindow = window.open("", "_blank", "width=800, height=600");

    newWindow.document.write(`
      <html>
        <head>
          <style>
            @media print {
              @page {
                size: 80mm auto;
                margin: 0;
              }
              body {
                margin: 0;
                padding: 0;
                font-family: Arial, sans-serif;
                text-align: center;
              }
              .print-container {
                padding: 10px;
                margin: 0;
                width: 100%;
              }
              h1, h2, h3, p {
                margin: 5px 0;
              }
              .line {
                border-top: 1px dashed #000;
                margin: 10px 0;
              }
            }
          </style>
        </head>
        <body>
          <div class="print-container">
            <h1>RUMAH SAKIT</h1>
            <h2>PERMATA KELUARGA KARAWANG</h2>
            <div class="line"></div>
            <h3>${sectionTitle}</h3>
            <h2>${data.section} ${data.queueNumber}</h2>
            <div class="line"></div>
            <p>Silakan menunggu sampai dipanggil</p>
            <p>Terima kasih telah memilih kami</p>
            <p>
              Tanggal ${new Date().toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
              <br />
              ${timeWIB}
            </p>
          </div>
        </body>
      </html>
    `);

    newWindow.document.close();
    newWindow.focus();
    newWindow.print();
    newWindow.close();
  };

  return (
    <div className="bg-gray-200 w-screen h-screen items-center justify-center flex">
      <Navbar />

      <div className="pr-4 pl-4 space-between flex gap-12 ">
        {[
          {
            label: "Obat Non Racikan",
            color: "bg-biru1",
            prefix: "A",
            button: () => {
              handleAntrian("bpjs/obat-jadi");
              handlePrint(
                {
                  section: "A",
                  queueNumber: latestBpjsJadi,
                },
                "Obat Non Racikan"
              );
            },
          },
          {
            label: "Obat Racikan",
            color: "bg-biru1",
            prefix: "B",
            button: () => {
              handleAntrian("bpjs/obat-racikan");
              handlePrint(
                {
                  section: "B",
                  queueNumber: latestBpjsRacikan,
                },
                "Obat Racikan"
              );
            },
          },
          {
            label: "Obat Non Racikan",
            color: "bg-hijau1",
            prefix: "C",
            button: () => {
              handleAntrian("obat-jadi");
              handlePrint(
                {
                  section: "C",
                  queueNumber: latestJadi,
                },
                "Obat Non Racikan"
              );
            },
          },
          {
            label: "Obat Racikan",
            color: "bg-hijau1",
            prefix: "D",
            button: () => {
              handleAntrian("obat-racikan");
              handlePrint(
                {
                  section: "D",
                  queueNumber: latestRacikan,
                },
                "Obat Racikan"
              );
            },
          },
        ].map(({ label, color, prefix, button }, index) => (
          <div
            key={index}
            className={`${color} w-[250px] h-full text-center rounded-md shadow-xl`}>
            <h2 className="bg-white p-2 text-2xl rounded-t-md">{label}</h2>
            <p className="text-6xl text-white w-full py-12 items-center justify-center">
              {prefix}{" "}
              {latestBpjsJadi ||
              latestBpjsRacikan ||
              latestJadi ||
              latestRacikan
                ? prefix === "A"
                  ? latestBpjsJadi
                  : prefix === "B"
                  ? latestBpjsRacikan
                  : prefix === "C"
                  ? latestJadi
                  : prefix === "D"
                  ? latestRacikan
                  : "Memuat..."
                : "Memuat..."}
            </p>
            <button
              onClick={button}
              className="hover:bg-red-500 hover:text-white p-2 mb-6 bg-white rounded-md text-xl">
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
