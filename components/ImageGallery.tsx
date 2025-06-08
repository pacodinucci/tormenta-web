"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface ImageGalleryProps {
  images: { src: string; alt: string }[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showLens, setShowLens] = useState(false);
  const lensRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const container = containerRef.current;
    const lens = lensRef.current;
    if (!container || !lens) return;

    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;

    lens.style.left = `${x - lens.offsetWidth / 2}px`;
    lens.style.top = `${y - lens.offsetHeight / 2}px`;
    lens.style.backgroundPosition = `${percentX}% ${percentY}%`;
  };

  return (
    <div className="flex gap-4 w-full max-w-[600px] mx-auto">
      {/* Imagen principal con lupa */}
      <div
        className="relative w-[70%] md:w-[400px] h-[300px] md:h-[400px] shrink-0 overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setShowLens(true)}
        onMouseLeave={() => setShowLens(false)}
        ref={containerRef}
      >
        <Image
          src={images[selectedIndex]?.src}
          alt={images[selectedIndex]?.alt}
          fill
          style={{ objectFit: "contain" }}
          className="pointer-events-none"
        />
        {showLens && (
          <div
            ref={lensRef}
            className="absolute w-32 h-32 rounded-full border-2 border-black pointer-events-none"
            style={{
              backgroundImage: `url(${images[selectedIndex]?.src})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "600%",
              zIndex: 20,
            }}
          />
        )}
      </div>

      {/* Carrete con miniaturas */}
      <div className="overflow-y-auto shrink-0 no-scrollbar h-[300px] md:h-[400px] w-[100px] md:w-[127px]">
        <div className="flex flex-col gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`relative w-[95px] md:w-[127px] h-[95px] md:h-[127px] shrink-0 overflow-hidden border-2 ${
                index === selectedIndex ? "border-black" : "border-transparent"
              } hover:border-gray-400 transition`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                style={{ objectFit: "contain" }}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
