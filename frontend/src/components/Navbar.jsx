import logo from "../../public/image/logoPanjangAlamat.png";

const Navbar = () => {
  return (
    <nav className="bg-hijau1 border-gray-200 shadow-xl">
      <div className="container flex flex-wrap ">
        <a href="/" className="flex items-center">
          <img
            src={logo}
            className="h-24  mr-3 bg-white p-2"
            alt="Flowbite Logo"
          />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
