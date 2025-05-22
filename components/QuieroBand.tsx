"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const fuentes = [
  { font: "var(--font-franklin)", size: "2rem" },
  { font: "var(--font-baron)", size: "2rem" },
  { font: "var(--font-gobold)", size: "2rem", spacing: "0.2em" },
  { font: "var(--font-cinzel)", size: "1.5rem", weight: 700 },
  { font: "var(--font-flowers)", size: "1.75rem" },
  { font: "var(--font-mighty)", size: "2.5rem", weight: 300 },
];

const QuieroBand = () => {
  const router = useRouter();
  const palabras = Array.from({ length: 30 }).map((_, i) => {
    const f = fuentes[i % fuentes.length];

    const isFlowers = f.font === "var(--font-flowers)";

    return (
      <span
        key={i}
        className={isFlowers ? "text-sm md:text-xl pt-1 md:pt-0" : ""}
        style={{
          fontFamily: f.font,
          fontSize: isFlowers ? undefined : f.size,
          fontWeight: f.weight ?? "normal",
          letterSpacing: f.spacing ?? "normal",
          marginRight: "1rem",
          lineHeight: "1",
          display: "inline-block",
        }}
      >
        QUIERO
      </span>
    );
  });

  return (
    <motion.div
      className="w-screen md:w-full bg-black text-white overflow-hidden py-4 whitespace-nowrap cursor-pointer hover:scale-105 transition duration-300 ease-in-out"
      initial={{ scale: 1 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.9 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 15,
        mass: 0.5,
      }}
      onClick={() => router.push("/colors")}
    >
      <div className="marquee flex items-center">
        {palabras}
        {palabras}
      </div>
    </motion.div>
  );
};

export default QuieroBand;
