import Image from "next/image";
import React from "react";
import QuieroBand from "./QuieroBand";

const LandingComponent = () => {
  return (
    <div className="relative w-full h-auto overflow-x-hidden pb-12">
      {/* Cinta por encima */}
      <div className="absolute bottom-0 left-0 w-full z-10">
        <QuieroBand />
      </div>

      {/* Imágenes */}
      <div className="flex justify-center items-center -gap-x-4 md:gap-x-0 w-full">
        {/* <Image
          src={"/image1.png"}
          alt="tormenta image"
          width={300}
          height={0}
        />
        <Image
          src={"/image2.jpg"}
          alt="tormenta image"
          width={300}
          height={0}
        /> */}
        <Image
          src={"/landingLogo.png"}
          alt="Tormenta Rainwear"
          width={800}
          height={0}
        />
      </div>
    </div>
  );
};

export default LandingComponent;
