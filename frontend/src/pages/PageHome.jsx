import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/FooterAdm";

const PageHome = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-200 w-screen min-h-screen flex flex-col items-center justify-center">
      <Navbar />

      <div className="mt-28 mb-28 px-12 py-4 flex flex-wrap gap-12 w-full justify-center items-center">
        {[
          { label: "Halaman Call", route: "/call", color: "bg-biru1" },
          { label: "Halaman Print", route: "/print", color: "bg-hijau1" },
          { label: "Halaman View", route: "/view", color: "bg-biru1" },
        ].map(({ label, route, color }, index) => (
          <button
            key={index}
            onClick={() => navigate(route)}
            className={`${color} w-[29.5vh] md:w-[35vh] h-auto text-center rounded-md shadow-xl px-4 py-6 text-white text-2xl font-bold`}>
            {label}
          </button>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default PageHome;
