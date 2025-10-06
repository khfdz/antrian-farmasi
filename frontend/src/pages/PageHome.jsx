import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/FooterAdm";

const PageHome = () => {
  const navigate = useNavigate();

  const cards = [
    { 
      label: "Panggil Antrian", 
      route: "/call", 
      gradient: "from-[#3B82F6] to-[#1D4ED8]",
      icon: "📞",
      description: "Kelola panggilan sistem"
    },
    { 
      label: "Cetak Antrian", 
      route: "/print", 
      gradient: "from-emerald-500 to-teal-600",
      icon: "🖨️",
      description: "Cetak nomor antrian"
    },
    { 
      label: "Tampilan Antrian", 
      route: "/view", 
      gradient: "from-[#3B82F6] to-[#6366F1]",
      icon: "📋",
      description: "Tampilkan data & informasi"
    },
  ];

  return (
<div className="bg-gradient-to-br from-gray-50 via-blue-50 to-gray-100 w-screen min-h-dvh grid grid-rows-[auto_1fr_auto] overflow-hidden">


      <Navbar />

      <div className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="max-w-7xl w-full">
          <div className="text-center mb-16 space-y-4 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
            
            <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] bg-clip-text text-transparent drop-shadow-lg relative z-10">
              Dashboard Admin
            </h1>
            <p className="text-gray-600 text-lg md:text-xl font-bold drop-shadow-sm">
              Pilih menu untuk melanjutkan
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
            {cards.map(({ label, route, gradient, icon, description }, index) => (
              <button
                key={index}
                onClick={() => navigate(route)}
                className="group relative overflow-hidden bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-8 border border-white/50"
              >
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-blue-400/30 rounded-full blur-2xl animate-pulse"></div>
                  <div className="absolute bottom-0 left-0 w-20 h-20 bg-indigo-400/20 rounded-full blur-xl animate-ping"></div>
                </div>

                <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                  <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-4xl shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 border-2 border-white/30`}>
                    {icon}
                  </div>
                  
                  <h3 className="text-2xl font-black text-gray-800 group-hover:text-blue-600 transition-colors duration-300 drop-shadow-sm">
                    {label}
                  </h3>
                  
                  <p className="text-gray-600 text-sm font-bold">
                    {description}
                  </p>
                  
                  <div className={`mt-4 px-6 py-2 rounded-xl bg-gradient-to-r ${gradient} text-white text-sm font-black opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-lg border border-white/20`}>
                    Buka →
                  </div>
                </div>

                <div className={`absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r ${gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 shadow-lg`}></div>
              </button>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-md rounded-full shadow-lg border border-white/50 transform hover:scale-105 transition-all duration-300">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-lg shadow-emerald-500/50"></div>
              <span className="text-gray-700 text-sm font-black drop-shadow-sm">Sistem Aktif</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />

    </div>
  );
};

export default PageHome;