import { motion } from "framer-motion";

const Footer = () => {
  return (
    <div className="bg-biru1 w-full h-20 flex items-center text-white text-2xl py-8 overflow-hidden fixed bottom-0">
      <motion.div
        className="whitespace-nowrap"
        animate={{
          x: ["480%", "-100%"],
        }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "linear",
        }}>
        <span>Kalo cape istirahat dulu yaa</span>
      </motion.div>
    </div>
  );
};

export default Footer;
