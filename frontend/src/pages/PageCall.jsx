import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";

const localAccess = import.meta.env.VITE_NETWORK;
const socket = io(`http://${localAccess}`); // Pastikan menghubungkan ke IP laptop backend

const PagePrintAndCall = () => {
  const [bpjsRacikanData, setBpjsRacikanData] = useState(null);
  const [bpjsJadiData, setBpjsJadiData] = useState(null);

  const racikanPrintRef = useRef();
  const jadiPrintRef = useRef();

  // Fungsi untuk mengambil data antrian dari API
  const fetchBpjsRacikanData = async () => {
    try {
      const response = await axios.get(
        `http://${localAccess}/api/antrian/bpjs/obat-racikan/0`
      );
      const queueList = response.data;

      if (queueList.length > 0) {
        const oldestQueue = queueList.reduce((oldest, current) => {
          return new Date(current.waktu) < new Date(oldest.waktu)
            ? current
            : oldest;
        });
        setBpjsRacikanData(oldestQueue);
      } else {
        setBpjsRacikanData(null); // Tidak ada antrian yang tersedia
      }
    } catch (error) {
      console.error("Error fetching queue data:", error);
    }
  };

  const fetchBpjsJadiData = async () => {
    try {
      const response = await axios.get(
        `http://${localAccess}/api/antrian/bpjs/obat-jadi/0`
      );
      const queueList = response.data;

      if (queueList.length > 0) {
        const oldestQueue = queueList.reduce((oldest, current) => {
          return new Date(current.waktu) < new Date(oldest.waktu)
            ? current
            : oldest;
        });
        setBpjsJadiData(oldestQueue);
      } else {
        setBpjsJadiData(null); // Tidak ada antrian yang tersedia
      }
    } catch (error) {
      console.error("Error fetching queue data:", error);
    }
  };

  const bpjsRacikanCall = () => {
    if (bpjsRacikanData) {
      const { no_antrian } = bpjsRacikanData;
      const loket = "1"; // Loket yang digunakan
      const section = "A"; // Bagian yang digunakan

      // Emit data ke server menggunakan socket
      socket.emit("triggerCallAudio", {
        section,
        queueNumber: no_antrian,
        loket,
        type: "racikan",
      });
      console.log("Panggilan dikirim:", {
        section,
        queueNumber: no_antrian,
        loket,
      });
    }
  };

  const bpjsJadiCall = () => {
    if (bpjsJadiData) {
      const { no_antrian } = bpjsJadiData;
      const loket = "2"; // Loket yang digunakan
      const section = "B"; // Bagian yang digunakan

      // Emit data ke server menggunakan socket
      socket.emit("triggerCallAudio", {
        section,
        queueNumber: no_antrian,
        loket,
        type: "non_racikan",
      });
      console.log("Panggilan dikirim:", {
        section,
        queueNumber: no_antrian,
        loket,
      });
    }
  };

  // Fungsi untuk memanggil antrian
  const bpjsRacikanUpdateStatus = async (id) => {
    try {
      await axios.patch(
        `http://${localAccess}/api/antrian/bpjs/obat-racikan/${id}/status`
      );
      console.log(`Status antrian dengan ID ${id} berhasil diperbarui.`);

      // Ambil data terbaru setelah status diperbarui
      fetchBpjsRacikanData();
    } catch (error) {
      console.error("Error updating queue status:", error);
    }
  };

  const bpjsJadiUpdateStatus = async (id) => {
    try {
      await axios.patch(
        `http://${localAccess}/api/antrian/bpjs/obat-jadi/${id}/status`
      );
      console.log(`Status antrian dengan ID ${id} berhasil diperbarui.`);

      // Ambil data terbaru setelah status diperbarui
      fetchBpjsJadiData();
    } catch (error) {
      console.error("Error updating queue status:", error);
    }
  };

  const formatWIBTime = () => {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0"); // Menambahkan leading zero jika jam < 10
    const minutes = String(date.getMinutes()).padStart(2, "0"); // Menambahkan leading zero jika menit < 10
    return `${hours}:${minutes} WIB`;
  };

  const handlePrint = (data, sectionTitle) => {
    const newWindow = window.open("", "_blank", "width=800,height=600");
    const timeWIB = formatWIBTime(); // Ambil waktu dalam format 14.00 WIB

    newWindow.document.write(`
      <html>
        <head>
          <style>
            @media print {
              @page {
                size: 80mm auto; /* Ukuran kertas thermal (80mm lebar) */
                margin: 0; /* Hilangkan margin */
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
            <p>Silahkan menunggu sampai dipanggil</p>
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

    // Aktifkan pencetakan
    newWindow.focus();
    newWindow.print();

    // Tutup popup setelah pencetakan selesai
    newWindow.close();
  };

  // Ambil data antrian saat komponen dimuat
  useEffect(() => {
    fetchBpjsRacikanData();
    fetchBpjsJadiData();
  }, []);

  return (
    <div>
      <div ref={racikanPrintRef}>
        <h1>Loket 1</h1>
        <h2>A</h2>
        <h3>BPJS OBAT RACIKAN</h3>
        <h2>
          No ANTRIAN:{" "}
          <span>
            {bpjsRacikanData ? bpjsRacikanData.no_antrian : "Tidak Ada Antrian"}
          </span>
        </h2>
        {bpjsRacikanData && (
          <>
            <button onClick={bpjsRacikanCall}>
              Panggil No Antrian {bpjsRacikanData.no_antrian}
            </button>
            <button
              onClick={() =>
                bpjsRacikanUpdateStatus(bpjsRacikanData.id_antrian)
              }>
              Ubah Status No Antrian {bpjsRacikanData.no_antrian}
            </button>
            <button
              onClick={() =>
                handlePrint(
                  {
                    section: "A",
                    queueNumber: bpjsRacikanData.no_antrian,
                  },
                  "OBAT RACIKAN"
                )
              }>
              Print Loket 1
            </button>
          </>
        )}
      </div>

      <div ref={jadiPrintRef}>
        <h1>Loket 2</h1>
        <h2>B</h2>
        <h3>BPJS OBAT JADI</h3>
        <h2>
          No ANTRIAN:{" "}
          <span>
            {bpjsJadiData ? bpjsJadiData.no_antrian : "Tidak Ada Antrian"}
          </span>
        </h2>
        {bpjsJadiData && (
          <>
            <button onClick={bpjsJadiCall}>
              Panggil No Antrian {bpjsJadiData.no_antrian}
            </button>
            <button
              onClick={() => bpjsJadiUpdateStatus(bpjsJadiData.id_antrian)}>
              Ubah Status No Antrian {bpjsJadiData.no_antrian}
            </button>
            <button
              onClick={() =>
                handlePrint(
                  {
                    section: "B",
                    queueNumber: bpjsJadiData.no_antrian,
                  },
                  "OBAT JADI"
                )
              }>
              Print Loket 2
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PagePrintAndCall;
