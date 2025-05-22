"use client";

import { useState } from "react";
import Image from "next/image";

interface ImageGalleryProps {
  images: { src: string; alt: string }[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <div className="flex gap-4 w-full max-w-[600px] mx-auto">
      {/* Imagen principal */}
      <div className="relative w-[50%] md:w-[400px] h-[300px] md:h-[400px] shrink-0">
        <Image
          src={images[selectedIndex].src}
          alt={images[selectedIndex].alt}
          fill
          style={{ objectFit: "contain" }}
        />
      </div>

      {/* Carrete con altura fija y scroll */}
      <div
        className="overflow-y-auto shrink-0 no-scrollbar h-[300px] md:h-[400px] w-[100px] md:w-[127px]"
        // style={{
        //   height: "300px", // misma altura que la imagen
        //   width: "100px", // ancho fijo para las miniaturas
        // }}
      >
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
