"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const TormentaLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkSize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkSize();
    window.addEventListener("resize", checkSize);

    return () => window.removeEventListener("resize", checkSize);
  }, []);

  const showBackground = pathname !== "/tormenta/landing" && !isMobile;

  return (
    <div
      className="bg-no-repeat bg-cover bg-center w-full min-h-screen"
      style={{
        backgroundImage: showBackground ? "url('/manchas.png')" : "none",
      }}
    >
      {children}
    </div>
  );
};

export default TormentaLayout;
