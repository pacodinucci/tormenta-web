"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ShoppingBasket } from "lucide-react";
import { useCart } from "@/store/cart";
import ImageGallery from "./ImageGallery";
import OutlineShadowButton from "./OutlineShadowButton";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

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

const baseProduct = {
  id: "rosa-bugambilia",
  name: "Raincoat",
  color: "Bugambilia",
  image: "/image2.jpg",
};

const Products = () => {
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const addItem = useCart((state) => state.addItem);
  const items = useCart((state) => state.items);
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddProduct = () => {
    console.log("agregar producto!");
    if (!selectedSize) {
      toast.error("Por favor selecciona una talla.");
      return;
    }

    addItem({
      id: `${baseProduct.id}-${selectedSize}`,
      name: baseProduct.name,
      color: baseProduct.color,
      size: selectedSize,
      quantity: 1,
      image: baseProduct.image,
    });

    setSelectedSize(null);
    toast.success("Producto agregado al carrito.");
  };

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
      <div className="flex flex-col min-w-[75%] md:min-w-[600px] justify-center md:items-center gap-y-6 w-full px-8 pt-6">
        <div className="flex gap-x-4">
          <OutlineShadowButton
            onClick={() => setSelectedSize("small")}
            className={selectedSize === "small" ? "bg-slate-600" : ""}
          >
            s
          </OutlineShadowButton>
          <OutlineShadowButton
            onClick={() => setSelectedSize("medium")}
            className={selectedSize === "medium" ? "bg-slate-600" : ""}
          >
            m
          </OutlineShadowButton>
          <OutlineShadowButton
            onClick={() => setSelectedSize("large")}
            className={selectedSize === "large" ? "bg-slate-600" : ""}
          >
            l
          </OutlineShadowButton>
        </div>
        <div className="flex items-center justify-between">
          <OutlineShadowButton onClick={handleAddProduct}>
            Agregar al carrito
          </OutlineShadowButton>

          <AnimatePresence>
            {totalQuantity > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, x: 10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <OutlineShadowButton
                  onClick={() => router.push("/cart")}
                  className="bg-emerald-700"
                >
                  <div className="flex items-center gap-2">
                    <ShoppingBasket />
                    <span>{totalQuantity}</span>
                  </div>
                </OutlineShadowButton>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Products;
