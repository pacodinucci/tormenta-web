import Image from "next/image";
import React from "react";

const adn = {
  title: "ADN",
  paragraphs: [
    "Tormenta es un proyecto que nace en el 2014, primeramente de observar una ciudad lluviosa, explosiva y apasionada como la Ciudad de México.",
    "Nació con la intención de ser una marca urbana, pero nuestra historia nos ha demostrado que somos también de campo y de montaña. Que más que un lugar, lo que nos define es un estilo rebelde y funcional. Queremos simplificarle la vida a nuestros clientes.",
    "Marca diseñada en México. Abierta al mundo.",
  ],
};

const solDiNucci = {
  title: "SOL DI NUCCI",
  paragraphs: [
    "Nacida en Buenos Aires y crecida en México. Enamorada de este país y sus tempestades. Estudió diseño de moda en la UBA.",
    "Creó y desarrolló la marca Excuse Me & Paraguas en el 2008 que le dio base a lo que hoy es Tormenta.",
  ],
};

export const About = () => {
  return (
    <div className="relative flex justify-center">
      <h1
        style={{ fontFamily: "var(--font-franklin)" }}
        className="absolute top-0 left-0 text-8xl uppercase font-bold"
      >
        About
      </h1>

      <div
        className={`
      w-full md:w-1/2 h-[65svh] mt-12 flex flex-col md:flex-row 
      bg-no-repeat bg-cover bg-center
    `}
      >
        {/* Imagen izquierda solo visible en md+ */}
        <div className="hidden md:block relative w-1/2 h-full">
          <Image
            src="/aboutImage.png"
            alt="Tormenta Rainwear"
            fill
            className="object-cover"
          />
        </div>

        {/* Texto a la derecha (mobile usa la imagen como fondo) */}
        <div
          className="w-full md:w-1/2 h-svh md:h-full px-6 py-8 mt-24 md:mt-0 flex flex-col gap-y-8 text-white relative"
          style={{
            backgroundImage: "url('/aboutImage.png')", // ← SIEMPRE está este fondo
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Capa de manchas solo visible en md+ */}
          <div className="hidden md:block absolute inset-0 z-0 bg-[url('/manchas_invertida.png')] bg-cover bg-center" />

          {/* Capa negra translúcida para mejorar contraste (solo en mobile) */}
          <div className="md:hidden absolute inset-0 bg-black/60 z-0" />

          {/* Contenido textual (siempre visible encima de todo) */}
          <div className="relative z-10 md:bg-black/60">
            <h4
              style={{ fontFamily: "var(--font-franklin)" }}
              className="font-semibold text-lg tracking-wider"
            >
              {adn.title}
            </h4>
            <div
              className="flex flex-col gap-y-2 mt-4 px-4"
              style={{ fontFamily: "var(--font-gill)" }}
            >
              {adn.paragraphs.map((p, idx) => (
                <p key={idx} className="text-[.77rem]">
                  {p}
                </p>
              ))}
            </div>
          </div>

          <div className="relative z-10 md:bg-black/60">
            <h4
              style={{ fontFamily: "var(--font-franklin)" }}
              className="font-semibold text-lg tracking-wider"
            >
              {solDiNucci.title}
            </h4>
            <div
              className="flex flex-col gap-y-2 mt-4 px-4"
              style={{ fontFamily: "var(--font-gill)" }}
            >
              {solDiNucci.paragraphs.map((p, idx) => (
                <p key={idx} className="text-[.77rem]">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
