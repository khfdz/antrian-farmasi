import { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import Swal from "sweetalert2";
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
    } catch (error) {
      console.error("Error loading initial data:", error);
    }
  };

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

      const data = response.data;

      let roomName;
      if (jenis === "bpjs/obat-racikan") {
        setLatestBpjsRacikan(data.no_antrian);
        roomName = "bpjs-obat-racikan";
      } else if (jenis === "bpjs/obat-jadi") {
        setLatestBpjsJadi(data.no_antrian);
        roomName = "bpjs-obat-jadi";
      } else if (jenis === "obat-racikan") {
        setLatestRacikan(data.no_antrian);
        roomName = "obat-racikan";
      } else if (jenis === "obat-jadi") {
        setLatestJadi(data.no_antrian);
        roomName = "obat-jadi";
      }

      socket.emit("sendQueueUpdate", {
        section: roomName,
        queueNumber: data.no_antrian,
      });

      return data.no_antrian;
    } catch (error) {
      console.error(
        `❌ [handleAntrian] Error menambah antrian untuk ${jenis}:`,
        error
      );
    }
  };

  useEffect(() => {
    fetchInitialData();

    socket.emit("joinRoom", "printRoom");

    socket.on("updatePagePrint", ({ room, antrianNumber }) => {
      if (room === "bpjs-obat-jadi") {
        setLatestBpjsJadi(antrianNumber);
      } else if (room === "bpjs-obat-racikan") {
        setLatestBpjsRacikan(antrianNumber);
      } else if (room === "obat-jadi") {
        setLatestJadi(antrianNumber);
      } else if (room === "obat-racikan") {
        setLatestRacikan(antrianNumber);
      }
    });

    return () => {
      socket.off("updatePagePrint");
    };
  }, []);

  useEffect(() => {
    socket.on("queueReset", () => {
      Swal.fire({
        title: "Antrian Direset!",
        text: "Seluruh antrian telah direset oleh sistem.",
        icon: "info",
        confirmButtonText: "OK",
        timer: "5000",
      });

      const fetchData = async () => {
        latestBpjsRacikan(await fetchInitialData("bpjs/obat-racikan"));
        latestBpjsJadi(await fetchInitialData("bpjs/obat-jadi"));
        latestRacikan(await fetchInitialData("obat-racikan"));
        latestJadi(await fetchInitialData("obat-jadi"));
      };
      fetchData();
    });

    return () => {
      socket.off("queueReset");
    };
  });

  const formatWIBTime = () => {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes} WIB`;
  };

  const handlePrint = (data, sectionTitle) => {
    const timeWIB = formatWIBTime();
    socket.emit("refreshQueue");

    socket.emit("sendQueueUpdate", {
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
            <h3>RUMAH SAKIT</h3>
            <h3>PERMATA KELUARGA KARAWANG</h3>
            <div class="line"></div>
            <h2>${sectionTitle}</h2>
            <h1>${data.prefix} ${data.queueNumber}</h1>
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

  const handleButtonClick = async (jenis, sectionTitle, prefix) => {
    const result = await Swal.fire({
      title: "Konfirmasi",
      text: "Apakah Anda yakin ingin melanjutkan?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Iya",
      cancelButtonText: "Tidak",
    });
  
    if (result.isConfirmed) {
      const newQueue = await handleAntrian(jenis);
      handlePrint(
        {
          prefix,
          section: sectionTitle,
          queueNumber: newQueue,
        },
        sectionTitle
      );
    } else {
      Swal.fire("Dibatalkan", "Proses antrian dibatalkan", "info");
    }
  };

  return (
    <>
      <Navbar />
    <div className="bg-gray-200 w-screen min-h-screen flex flex-col items-center justify-center">
  
      <div className="md:mt-22 mt-28 mb-28 px-12 py-4 flex flex-wrap gap-12 w-full justify-center items-center">
        {[
          {
            label: "Obat Non Racikan",
            color: "bg-biru1",
            prefix: "A",
            jenis: "bpjs/obat-jadi",
            sectionTitle: "Obat Non Racikan",
          },
          {
            label: "Obat Racikan",
            color: "bg-biru1",
            prefix: "B",
            jenis: "bpjs/obat-racikan",
            sectionTitle: "Obat Racikan",
          },
          {
            label: "Obat Non Racikan",
            color: "bg-hijau1",
            prefix: "C",
            jenis: "obat-jadi",
            sectionTitle: "Obat Non Racikan",
          },
          {
            label: "Obat Racikan",
            color: "bg-hijau1",
            prefix: "D",
            jenis: "obat-racikan",
            sectionTitle: "Obat Racikan",
          },
        ].map(({ label, color, prefix, jenis, sectionTitle }, index) => (
          <div
            key={index}
            className={`${color} w-[250px] h-full text-center rounded-md shadow-xl`}
          >
            <h2 className="bg-white p-2 text-2xl rounded-t-md">{label}</h2>
            <p className="text-6xl text-white w-full py-12 items-center justify-center">
              {prefix}{" "}
              {
                latestBpjsJadi ||
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
                    : "0"
                  : "0"
              }
            </p>
            <button
              onClick={() => handleButtonClick(jenis, sectionTitle, prefix)}
              className="hover:bg-red-500 hover:text-white p-2 mb-6 bg-white rounded-md text-xl"
            >
              Cetak Antrian
            </button>
          </div>
        ))}
      </div>
  
    </div>
      <Footer />
    </>
  );
};

export default PagePrint;
