import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import QuieroBand from "./QuieroBand";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import { CiMenuBurger } from "react-icons/ci";

export const MobileLandingComponent = () => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className={`transition-opacity duration-500 ${
        loaded ? "opacity-100" : "opacity-0"
      } relative w-full h-svh overflow-x-hidden pb-12 overflow-y-hidden`}
    >
      {/* Landing Image */}
      <div className="flex justify-center w-full h-svh relative">
        <Image
          src="/landingImage2.png"
          alt="Tormenta Rainwear"
          fill
          priority
          onLoad={() => setLoaded(true)}
          className="object-contain object-top pt-20"
        />
      </div>
      <div className="absolute bottom-30 left-0 w-full z-10">
        <QuieroBand />
      </div>
      {/* MENÚ desplegable */}
      <div className="absolute top-5 left-5 z-20">
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
      <div className="absolute bottom-10 left-23 flex items-center justify-between gap-x-8 p-4">
        <FaFacebook size={36} />
        <FaInstagram size={36} />
        <TfiEmail size={36} />
      </div>
      <div className="absolute z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <button
          className="w-32 h-32 rounded-full bg-yellow-300 border-4 border-black shadow-md hover:scale-105 transition-transform duration-200"
          aria-label="Botón central"
          onClick={() => router.push("/colors")}
        />
      </div>
    </div>
  );
};
