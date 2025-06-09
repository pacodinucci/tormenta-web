"use client";

import React, { useEffect, useState } from "react";

const TormentaLayout = ({ children }: { children: React.ReactNode }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkSize = () => {
      setIsMobile(window.innerWidth < 640); // sm breakpoint de Tailwind
    };

    checkSize(); // check inicial
    window.addEventListener("resize", checkSize);

    return () => window.removeEventListener("resize", checkSize);
  }, []);

  useEffect(() => {
    console.log(isMobile);
  }, [isMobile]);

  return (
    <div
      className="bg-no-repeat bg-cover bg-center w-full min-h-screen"
      style={{
        backgroundImage: !isMobile ? "url('/manchas.png')" : "none",
      }}
    >
      {children}
    </div>
  );
};

export default TormentaLayout;
