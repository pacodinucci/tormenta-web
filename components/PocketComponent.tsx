import Image from "next/image";
import React from "react";
import ColorCircle from "./ui/ColorCircle";

const pensado = {
  title: "PENSADO",
  paragraphs: [
    "Pensado y diseñado para el clima de México. Donde puedes encontrarte con varias estaciones en tan sólo unas pocas horas.",
    "Por eso su diseño es tan versátil.",
    "Es LIGERO, RESPIRA, ROMPEVIENTO E IMPERMEABLE, además tiene todas las costuras selladas con calor.",
    "Se hace BOLSITA, de ahí su nombre, y puedes adaptar la silueta con sus jaretas.",
  ],
};

export const PocketComponent = () => {
  return (
    <div className="relative flex justify-center">
      <h1
        style={{ fontFamily: "var(--font-franklin)" }}
        className="absolute top-0 left-0 text-7xl md:text-8xl uppercase font-bold"
      >
        Pocket
      </h1>

      <div className="w-full md:w-1/2 h-svh md:h-[65svh] mt-24 md:mt-12 flex flex-col md:flex-row">
        {/* Imagen visible solo en md+ */}
        <div className="hidden md:block relative w-1/2 h-full">
          <Image
            src="/pocketImage.png"
            alt="Tormenta Rainwear"
            fill
            className="object-cover"
          />
        </div>

        {/* Contenedor derecho o fondo completo en mobile */}
        <div
          className="relative w-full md:w-1/2 h-full px-6 py-8 flex flex-col gap-y-8 text-white"
          style={{
            backgroundImage: "url('/pocketImage.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Fondo manchas solo en md+ */}
          <div className="hidden md:block absolute inset-0 z-0 bg-[url('/manchas_invertida.png')] bg-cover bg-center" />

          {/* Contenido textual */}
          <div className="relative z-10">
            <div
              className="flex flex-col gap-y-2 mt-4 p-6 md:py-0 md:px-4 bg-black/80"
              style={{ fontFamily: "var(--font-gill)" }}
            >
              {pensado.paragraphs.map((p, idx) => (
                <p key={idx} className="text-lg md:text-[.90rem]">
                  {p}
                </p>
              ))}
            </div>
          </div>

          {/* Círculos de color */}
          <div className="relative z-10 flex justify-center gap-x-4 mt-6">
            <ColorCircle color="#4b4d3d" position="right" />
            <ColorCircle color="#1e1e1e" position="center" />
            <ColorCircle color="#d100c9" position="left" />
          </div>
        </div>
      </div>
    </div>
  );
};
