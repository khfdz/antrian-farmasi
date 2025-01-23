import { useEffect, useState } from "react";
import io from "socket.io-client";

const useAntrian = (room, initialUrl) => {
  const [queue, setQueue] = useState(null); // Menyimpan data antrian
  const [loading, setLoading] = useState(true); // State untuk loading data awal

  useEffect(() => {
    const socket = io("http://localhost:5000");

    const fetchInitialData = async () => {
      try {
        const response = await fetch(initialUrl);
        const data = await response.json();
        setQueue(data.no_antrian || null); // Simpan data awal
      } catch (error) {
        console.error(`Error fetching initial data for ${room}:`, error);
      } finally {
        setLoading(false); // Loading selesai
      }
    };

    fetchInitialData();

    socket.emit("joinRoom", room);

    socket.on(`queueUpdated-${room}`, (data) => {
      console.log(`WebSocket Update (${room}):`, data);
      setQueue(data.queueNumber); // Perbarui data dari WebSocket
    });

    return () => {
      socket.disconnect();
    };
  }, [room, initialUrl]);

  return { queue, loading };
};

export default useAntrian;
