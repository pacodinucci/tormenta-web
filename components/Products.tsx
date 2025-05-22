import React from "react";
import ImageGallery from "./ImageGallery";
import OutlineShadowButton from "./OutlineShadowButton";

const images = [
  {
    src: "/image2.jpg",
    alt: "Product 1",
  },
  {
    src: "/rosa2.jpg",
    alt: "Product 1",
  },
  {
    src: "/rosa3.jpg",
    alt: "Product 1",
  },
  {
    src: "/rosa4.png",
    alt: "Product 1",
  },
  {
    src: "/rosa5.jpg",
    alt: "Product 1",
  },
  {
    src: "/rosa6.png",
    alt: "Product 1",
  },
];

const Products = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-y-4 pb-24">
      <div className="min-w-[75%] md:min-w-[600px] flex items-center gap-2">
        <h1
          style={{ fontFamily: "var(--font-baron)" }}
          className="text-7xl uppercase"
        >
          rosa
        </h1>
        <h3
          style={{ fontFamily: "var(--font-baron)" }}
          className="pt-3 text-2xl"
        >
          bugambilia
        </h3>
      </div>
      <ImageGallery images={images} />
      <div className="flex flex-col min-w-[75%] md:min-w-[600px] justify-center md:items-center gap-y-6 w-full pl-8 pt-6">
        <div className="flex gap-x-4">
          <OutlineShadowButton>s</OutlineShadowButton>
          <OutlineShadowButton>m</OutlineShadowButton>
          <OutlineShadowButton>l</OutlineShadowButton>
        </div>
        <div>
          <OutlineShadowButton>Agregar al carrito</OutlineShadowButton>
        </div>
      </div>
    </div>
  );
};

export default Products;
