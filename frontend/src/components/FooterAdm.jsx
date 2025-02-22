import { motion } from "framer-motion";

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
    <div className="bg-biru1 w-full h-20 flex items-center text-white text-2xl py-8 overflow-hidden fixed bottom-0">
      <motion.div
        className="whitespace-nowrap flex"
        animate={{
          x: ["2500vw", "-100%"],
        }}
        transition={{
          repeat: Infinity,
          duration: 500,
          ease: "linear",
        }}>
        {quotes.map((quote, index) => (
          <motion.span
            key={index}
            className="mr-[1200px] ml-[2000px] inline-block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: index * 2,
              duration: 2,
            }}>
            {quote}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
};

export default Footer;
