import React from "react";
import ColorComponent from "@/components/ColorComponent";

const colors = [
  {
    title: "Rosa",
    src: "/image2.jpg",
    description: "Bugambilia",
  },
  {
    title: "Negro",
    src: "/black1.jpg",
    description: "Azulado",
  },
  {
    title: "Verde",
    src: "/green1.jpg",
    description: "Navy",
  },
];

const ColorsPage = () => {
  return (
    <div className="md:px-24">
      <div
        className="text-right mr-6 uppercase"
        style={{ fontFamily: "var(--font-gobold)" }}
      >
        <h1 className="text-4xl">$1300 mxn</h1>
        <h3 className="text-2xl">Envío incluído a todo México</h3>
      </div>
      <div>
        {colors.map((color, index) => (
          <ColorComponent
            key={index}
            title={color.title}
            src={color.src}
            description={color.description}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorsPage;
