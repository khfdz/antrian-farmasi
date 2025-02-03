import { motion } from "framer-motion";

const Footer = () => {
  return (
    <div className="bg-biru1 text-white text-2xl py-8 overflow-hidden">
      <motion.div
        className="whitespace-nowrap"
        animate={{
          x: ["100%", "-100%"],
        }}
        transition={{
          repeat: Infinity,
          duration: 30,
          ease: "linear",
        }}>
        <span>
          Visi kami adalah menjadi Rumah Sakit yang mengutamakan pelayanan
          kepada semua lapisan masyarakat melalui tenaga kerja yang terlatih dan
          profesional.
        </span>

        {/* Jeda sebelum Misi mulai muncul */}
        <span className="inline-block w-32"></span>

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
