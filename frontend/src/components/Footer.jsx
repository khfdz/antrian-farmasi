const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] h-20 flex items-center text-white overflow-hidden relative shadow-2xl w-full">
      {/* Background Glow */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-32 h-32 bg-white/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-2 right-24 w-24 h-24 bg-white/10 rounded-full blur-lg animate-ping"></div>
        <div
          className="absolute bottom-0 right-0 w-40 h-40 bg-white/15 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* Running Text */}
      <div className="relative z-10 w-full overflow-hidden">
        <div className="marquee whitespace-nowrap flex items-center">
          <span className="text-2xl font-semibold drop-shadow-md mx-20">
            Visi kami adalah menjadi rumah sakit yang mengutamakan pelayanan kepada semua lapisan masyarakat melalui tenaga kerja yang terlatih dan profesional.
          </span>

          <span className="text-2xl font-semibold drop-shadow-md mx-20">
            Misi kami adalah mengembangkan potensi kerja secara keseluruhan demi tercapainya pelayanan kesehatan terbaik, menyediakan sarana dan prasarana penunjang, serta memperluas jaringan pelayanan.
          </span>

          {/* Duplikat untuk looping halus */}
          <span className="text-2xl font-semibold drop-shadow-md mx-20">
            Visi kami adalah menjadi rumah sakit yang mengutamakan pelayanan kepada semua lapisan masyarakat melalui tenaga kerja yang terlatih dan profesional.
          </span>

          <span className="text-2xl font-semibold drop-shadow-md mx-20">
            Misi kami adalah mengembangkan potensi kerja secara keseluruhan demi tercapainya pelayanan kesehatan terbaik, menyediakan sarana dan prasarana penunjang, serta memperluas jaringan pelayanan.
          </span>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .marquee {
          display: flex;
          width: 200%; /* bikin ruang jalan */
          animation: marquee 290s linear infinite;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
