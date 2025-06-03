"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

interface ColorComponentProps {
  title: string;
  description: string;
  src: string;
}

const ColorComponent = ({ title, description, src }: ColorComponentProps) => {
  const router = useRouter();
  return (
    <div
      className="flex items-center mt-8 ml-6 cursor-pointer"
      onClick={() => router.push(`/tienda?color=${title}`)}
    >
      <Image src={src} alt={title} width={100} height={0} />
      <div className="flex items-center gap-4">
        <h1
          style={{ fontFamily: "var(--font-baron)" }}
          className="text-4xl uppercase"
        >
          {title}
        </h1>
        <h3 style={{ fontFamily: "var(--font-baron)" }} className="text-base">
          {description}
        </h3>
      </div>
    </div>
  );
};

export default ColorComponent;
