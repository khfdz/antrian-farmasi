import React from "react";
import logo from "../../public/image/logoPanjangAlamat.png";

const Navbar = () => {
  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      // Jika belum fullscreen, maka aktifkan fullscreen
      document.documentElement.requestFullscreen().catch((err) => {
        console.error("Gagal memasuki mode fullscreen:", err);
      });
    } else {
      // Jika sudah fullscreen, maka keluar dari fullscreen
      document.exitFullscreen().catch((err) => {
        console.error("Gagal keluar dari fullscreen:", err);
      });
    }
  };

  return (
    <nav className="bg-hijau1 border-gray-200 shadow-xl fixed top-0 w-full">
      <div className="container flex flex-wrap justify-between items-center">
        <a href="/" className="flex items-center">
          <img src={logo} className="h-20 mr-3 bg-white p-2" alt="Logo" />
        </a>

        <button
          onClick={handleFullscreen}
          className="absolute right-12 bg-hijau1 text-hijau1 p-2 hover:bg-biru1 hover:text-white rounded-md">
          {document.fullscreenElement
            ? "Keluar dari Fullscreen"
            : "Masuk ke Fullscreen"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
