"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ShoppingBasket } from "lucide-react";
import { useCart } from "@/store/cart";
import ImageGallery from "./ImageGallery";
import OutlineShadowButton from "./OutlineShadowButton";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { useProductStore } from "@/store/product";
import Image from "next/image";
import { formatNumber } from "@/lib/formatNumber";
import { useStockStore } from "@/store/stock";
import ColorCircle from "./ui/ColorCircle";

const ProductsCopy = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const color = searchParams.get("color");
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const addItem = useCart((state) => state.addItem);
  const items = useCart((state) => state.items);
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
  const { fetchProducts, products, loading, error } = useProductStore();
  const { fetchStocksByColor, stocks } = useStockStore();
  const [matchingImages, setMatchingImages] = useState<
    { src: string; alt: string }[]
  >([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (!color || products.length === 0) return;

    const result = products
      .flatMap((product) => product.images)
      .filter(
        (img) =>
          typeof img.color === "string" &&
          img.color.toLowerCase().includes(color.toLowerCase())
      )
      .map((img) => ({
        src: img.url,
        alt: `Imagen de ${img.color}`,
      }));

    setMatchingImages(result);

    console.log(product.id, color);
    fetchStocksByColor(product.id, color);
  }, [products, color]);

  useEffect(() => {
    console.log("STOCKS CARGADOS:", stocks);
  }, [stocks]);

  if (loading)
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center pb-24">
        <Image
          src={"/logo.png"}
          alt="logo tormenta rainwear"
          width={200}
          height={0}
        />
        <p>Cargando productos...</p>
      </div>
    );
  if (error) return <p>{error}</p>;
  if (!products || products.length === 0) return null;

  const product = products[0]; // Usamos el primer producto cargado (ajustar si es necesario)

  const getMatchedStock = (size: string) => {
    return stocks.find(
      (s) => s.size.toLowerCase() === size.toLowerCase() && s.quantity > 0
    );
  };

  const handleAddProduct = () => {
    if (!selectedSize) {
      toast.error("Por favor selecciona una talla.");
      return;
    }

    const matchedStock = getMatchedStock(selectedSize);
    if (!matchedStock) {
      toast.error("No hay stock disponible para esta combinación.");
      return;
    }

    addItem({
      id: product.id,
      stockId: matchedStock.id,
      name: product.name,
      color: color || "",
      size: selectedSize,
      quantity: 1,
      price: product.price,
      image: matchingImages[0]?.src || "/fallback.jpg",
    });

    setSelectedSize(null);
    toast.success("Producto agregado al carrito.");
  };

  const tituloColor = color?.toLowerCase() || "";
  let subtitulo = "";

  if (tituloColor === "negro") {
    subtitulo = "azulado";
  } else if (tituloColor === "verde") {
    subtitulo = "navy";
  } else if (tituloColor === "rosa") {
    subtitulo = "rosa";
  }

  const isSizeAvailable = (size: string): boolean => {
    return stocks.some(
      (s) => s.size.toLowerCase() === size.toLowerCase() && s.quantity > 0
    );
  };

  return (
    <div className="min-h-screen flex flex-col justify-center md:items-center gap-y-4 pb-24">
      <div className="min-w-[75%] md:min-w-[600px] flex items-center gap-2 pl-4">
        <h1
          style={{ fontFamily: "var(--font-baron)" }}
          className="text-7xl uppercase"
        >
          {tituloColor}
        </h1>
        {subtitulo && (
          <h3
            style={{ fontFamily: "var(--font-baron)" }}
            className="pt-3 text-2xl"
          >
            {subtitulo}
          </h3>
        )}
      </div>

      <div className="flex flex-col md:flex-row w-[100vw] md:w-auto md:mt-8">
        <ImageGallery images={matchingImages} />

        <div className="flex flex-col justify-center md:justify-start md:pr-12 gap-y-6 w-full pl-6 pr-2 pt-6">
          <div>
            <p
              className="text-3xl"
              style={{ fontFamily: "var(--font-impact)" }}
            >
              {product.name}
            </p>
            <p
              className="text-lg"
              style={{ fontFamily: "var(--font-franklin)" }}
            >
              {product.description}
            </p>
            <p
              className="text-3xl mt-2"
              style={{ fontFamily: "var(--font-impact)" }}
            >
              {formatNumber(product.price)}
            </p>
          </div>

          <div className="flex gap-x-4">
            {["S", "M", "L"].map((size) => {
              const disabled = !isSizeAvailable(size);
              return (
                <OutlineShadowButton
                  key={size}
                  onClick={() => !disabled && setSelectedSize(size)}
                  className={
                    (selectedSize === size ? "bg-slate-600 " : "") +
                    (disabled ? "opacity-50 cursor-not-allowed" : "")
                  }
                  disabled={disabled}
                >
                  {size[0]}
                </OutlineShadowButton>
              );
            })}
          </div>

          <div className="flex md:flex-col gap-y-4 items-center gap-x-4">
            <OutlineShadowButton
              onClick={handleAddProduct}
              className="whitespace-nowrap"
            >
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
                    className="bg-emerald-700 md:w-60"
                  >
                    <div className="flex items-center gap-2">
                      <ShoppingBasket />
                      <span>{totalQuantity}</span>
                      <p className="hidden md:block">Ver carrito</p>
                    </div>
                  </OutlineShadowButton>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <div className="w-full px-4 flex flex-col md:flex-row md:items-center justify-between">
        <div
          className="flex flex-col gap-x-2"
          style={{ fontFamily: "var(--font-mighty)" }}
        >
          <p className="hover:underline cursor-pointer">
            + Info sobre el producto
          </p>
          <p className="hover:underline cursor-pointer">Tabla de tallas</p>
        </div>
        <div className="relative z-10 flex md:justify-center gap-x-4 mt-6 md:mt-0">
          <ColorCircle
            color="#4b4d3d"
            position="right"
            className="cursor-pointer scale-75"
          />
          <ColorCircle
            color="#1e1e1e"
            position="center"
            className="cursor-pointer scale-75"
          />
          <ColorCircle
            color="#d100c9"
            position="left"
            className="cursor-pointer scale-75"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductsCopy;
