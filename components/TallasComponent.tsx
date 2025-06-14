import Image from "next/image";
import React from "react";

export const TallasComponent = () => {
  return (
    <div className="relative flex justify-center">
      <h1
        style={{ fontFamily: "var(--font-franklin)" }}
        className="absolute top-0 left-0 text-4xl md:text-8xl text-white uppercase font-bold"
      >
        Tallas y medidas
      </h1>
      <div
        className="w-full md:w-1/2 bg-black h-[65svh] mt-12 md:mt-24 flex bg-no-repeat bg-cover bg-center relative"
        style={{ backgroundImage: "url('/manchas_invertida.png')" }}
      >
        <Image
          src="/tallas.png"
          alt="Tormenta Rainwear"
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
};
