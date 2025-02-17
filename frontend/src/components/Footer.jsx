import { motion } from "framer-motion";

const Footer = () => {
  return (
    <div className="bg-biru1 h-20 flex items-center text-white text-2xl py-8 overflow-hidden fixed bottom-0">
      <motion.div
        className="whitespace-nowrap"
        animate={{
          x: ["63%", "-100%"],
        }}
        transition={{
          repeat: Infinity,
          duration: 300,
          ease: "linear",
        }}
      >
        <span>
          Visi kami adalah menjadi rumah sakit yang mengutamakan pelayanan
          kepada semua lapisan masyarakat melalui tenaga kerja yang terlatih dan
          profesional.
        </span>
        <span className="inline-block w-28"></span>
        <span>
          Misi kami adalah mengembangkan potensi kerja secara keseluruhan demi
          tercapainya pelayanan kesehatan yang terbaik, menyediakan dan
          mengembangkan secara terus menerus seluruh sarana dan prasarana
          penunjang pelayanan, serta bekerja dengan berbagai pihak agar dapat
          lebih meluaskan jaringan pelayanan.
        </span>
      </motion.div>
    </div>
  );
};

export default Footer;
