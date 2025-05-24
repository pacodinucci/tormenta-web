"use client";

import React, { useEffect } from "react";
import { useCart } from "@/store/cart";
import OutlineShadowButton from "./OutlineShadowButton";
import { formatNumber } from "@/lib/formatNumber";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";

const CartComponent = () => {
  const cart = useCart((state) => state.items);
  const updateCartItem = useCart((state) => state.updateCartItem);
  const removeFromCart = useCart((state) => state.removeItem);

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  return (
    <div>
      <h1>Revisa tu compra</h1>

      {cart.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          {cart.map((item) => {
            const price = Number(item.price);
            const quantity = item.quantity;

            // const discountedPrice =
            //   discount > 0 ? price * (1 - discount / 100) : price;

            return (
              <div
                key={item.id}
                className="flex flex-col md:flex-row justify-between items-center border-b border-slate-200 pb-4"
              >
                <div className="flex items-center gap-x-4 w-full md:w-auto">
                  <Image
                    src={item.image || ""}
                    alt={item.name}
                    width={60}
                    height={60}
                  />
                  <p className="text-lg font-medium">{item.name}</p>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-4 mt-4 md:mt-0">
                  <div className="flex items-center border border-gray-300 px-2 py-1">
                    <button
                      onClick={() => updateCartItem(item.id, quantity - 1)}
                    >
                      <Minus size={16} />
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      min={0}
                      onChange={(e) =>
                        updateCartItem(item.id, Number(e.target.value))
                      }
                      className="w-10 text-center bg-transparent focus:outline-none"
                    />
                    <button
                      onClick={() => updateCartItem(item.id, quantity + 1)}
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <div className="text-right">
                    {/* {discount > 0 && (
                      <p className="line-through text-sm text-gray-500">
                        {formatNumber(price * boxSize * quantity)}
                      </p>
                    )} */}
                    <p className="text-lg font-semibold">
                      {formatNumber(price * quantity)}
                    </p>
                    {/* {discount > 0 && (
                      <p className="text-green-600 text-sm">
                        Ahorraste{" "}
                        {formatNumber((price - discountedPrice) * quantity)}
                      </p>
                    )} */}
                  </div>

                  <Trash2
                    className="cursor-pointer text-red-600"
                    size={18}
                    onClick={() => removeFromCart(item.id)}
                  />
                </div>
              </div>
            );
          })}

          <div className="flex gap-x-2 mt-6">
            <input
              className="max-w-60 rounded-none"
              placeholder="Código del cupón"
            />
            <OutlineShadowButton className="rounded-none bg-darkCustom hover:bg-darkCustom/90">
              Aplicar el cupón
            </OutlineShadowButton>
          </div>
        </>
      )}
    </div>
  );
};

export default CartComponent;
