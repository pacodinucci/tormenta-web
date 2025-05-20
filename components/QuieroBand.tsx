import React from "react";

const fuentes = [
  { font: "var(--font-franklin)", size: "2rem" },
  { font: "var(--font-baron)", size: "2rem" },
  { font: "var(--font-gobold)", size: "2rem", spacing: "0.2em" },
  { font: "var(--font-cinzel)", size: "1.5rem", weight: 700 },
  { font: "var(--font-flowers)", size: "1.75rem" },
  { font: "var(--font-mighty)", size: "2.5rem", weight: 300 },
];

const QuieroBand = () => {
  const palabras = Array.from({ length: 30 }).map((_, i) => {
    const f = fuentes[i % fuentes.length];
    return (
      <span
        key={i}
        style={{
          fontFamily: f.font,
          fontSize: f.size,
          fontWeight: f.weight ?? "normal",
          letterSpacing: f.spacing ?? "normal",
          marginRight: "1rem",
          lineHeight: "1", // importante
          display: "inline-block", // previene errores de baseline
        }}
      >
        QUIERO
      </span>
    );
  });

  return (
    <div className="w-screen md:w-full bg-black text-white overflow-hidden py-4 whitespace-nowrap">
      <div className="marquee flex items-center">
        {palabras}
        {palabras}
      </div>
    </div>
  );
};

export default QuieroBand;
