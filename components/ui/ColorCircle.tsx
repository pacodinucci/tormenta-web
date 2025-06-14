import React from "react";

interface ColorCircleProps {
  color: string;
  position?: "center" | "left" | "right";
  className?: string;
}

const getTransform = (position: "center" | "left" | "right") => {
  switch (position) {
    case "left":
      return "translateY(-4px) translateX(-4px)";
    case "right":
      return "translateY(-4px) translateX(4px)";
    case "center":
    default:
      return "translateY(-4px)";
  }
};

const ColorCircle: React.FC<ColorCircleProps> = ({
  color,
  position = "center",
  className = "",
}) => {
  return (
    <div className={`relative w-20 h-20 ${className}`}>
      {/* Círculo blanco de fondo */}
      <div className="absolute inset-0 rounded-full bg-white z-0" />

      {/* Círculo de color desplazado */}
      <div
        className="absolute inset-0 rounded-full z-10 transition-transform duration-200"
        style={{
          backgroundColor: color,
          transform: getTransform(position),
        }}
      />
    </div>
  );
};

export default ColorCircle;
