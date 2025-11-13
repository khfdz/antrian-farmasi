import React from "react";

const quotes = [
  "Tetap semangat! Jangan lupa istirahat yaa 😊",
  "Kerja keras itu penting, tapi jangan lupa jaga kesehatan!",
  "Capek? Istirahat dulu, jangan dipaksa yaa!",
  "Kamu hebat! Jangan lupa kasih waktu buat diri sendiri.",
  "Hari ini berat? Tenang, besok bisa lebih baik!",
  "Rehat sejenak, lalu gas lagi! 🔥",
  "Kamu sudah berusaha, jangan lupa apresiasi diri sendiri!",
];

const Footer = () => {
  return (
    <footer className="relative w-full h-20 bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] flex items-center text-white overflow-hidden shadow-2xl ">
      {/* ✨ Background Glow */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-32 h-32 bg-white/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-2 right-24 w-24 h-24 bg-white/10 rounded-full blur-lg animate-ping"></div>
        <div
          className="absolute bottom-0 right-0 w-40 h-40 bg-white/15 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      {/* 💬 Scrolling Quotes */}
      <div className="relative z-10 w-full overflow-hidden">
        <div className="marquee whitespace-nowrap flex items-center">
          {quotes.map((quote, index) => (
            <span
              key={index}
              className="mx-[400px] inline-block text-lg font-semibold drop-shadow-md"
            >
              {quote}
            </span>
          ))}
          {/* Duplikat untuk loop halus */}
          {quotes.map((quote, index) => (
            <span
              key={`copy-${index}`}
              className="mx-[400px] inline-block text-lg font-semibold drop-shadow-md"
            >
              {quote}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee {
          display: flex;
          width: 200%;
          animation: marquee 60s linear infinite;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
