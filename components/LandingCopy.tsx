import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import QuieroBand from "./QuieroBand";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import { CiMenuBurger } from "react-icons/ci";

const LandingCopy = () => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className={`transition-opacity duration-500 ${
        loaded ? "opacity-100" : "opacity-0"
      } relative w-full h-svh overflow-x-hidden pb-12 overflow-y-hidden`}
    >
      {/* MENÚ desplegable */}
      <div className="absolute top-15 left-20 z-20">
        <div className="relative">
          <CiMenuBurger
            size={36}
            className="cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          />
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute left-0 mt-2 w-48 bg-white text-black shadow-lg rounded-lg overflow-hidden z-30"
              >
                <motion.div
                  className="flex flex-col gap-y-2 p-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.1 }}
                  style={{ fontFamily: "var(--font-mighty)" }}
                >
                  <a href="#about" className="hover:underline">
                    About Us
                  </a>
                  <a href="#pocket" className="hover:underline">
                    Pocket
                  </a>
                  <a href="#tallas" className="hover:underline">
                    Tabla de tallas
                  </a>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Íconos sociales */}
      <div className="p-4 flex flex-col gap-y-8 absolute top-40 right-10 z-10">
        <FaFacebook size={36} className="cursor-pointer" />
        <FaInstagram size={36} className="cursor-pointer" />
        <TfiEmail size={36} className="cursor-pointer" />
      </div>

      {/* Banda inferior */}
      <div className="absolute bottom-0 left-0 w-full z-20">
        <QuieroBand />
      </div>

      {/* Botón circular central */}
      <div className="absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <button
          className="w-40 h-40 rounded-full bg-yellow-300 border-4 border-black shadow-md hover:scale-105 transition-transform duration-200"
          aria-label="Botón central"
          onClick={() => router.push("/tormenta/colors")}
        />
      </div>

      {/* Imagen central */}
      <div className="flex justify-center items-center w-full h-svh relative">
        <Image
          src="/landingImage2.png"
          alt="Tormenta Rainwear"
          fill
          priority
          onLoad={() => setLoaded(true)}
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default LandingCopy;
