"use client";

import Image from "next/image";
import { useState } from "react";
import QuieroBand from "./QuieroBand";

const LandingComponent = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`transition-opacity duration-500 ${
        loaded ? "opacity-100" : "opacity-0"
      } relative w-full h-auto overflow-x-hidden pb-12 overflow-y-hidden`}
    >
      <div className="absolute bottom-0 left-0 w-full z-10">
        <QuieroBand />
      </div>

      <div className="flex justify-center items-center w-full">
        <Image
          src="/landingLogo.png"
          alt="Tormenta Rainwear"
          width={800}
          height={600}
          priority
          onLoad={() => setLoaded(true)}
        />
      </div>
    </div>
  );
};

export default LandingComponent;
