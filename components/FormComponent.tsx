"use client";

import React, { useState } from "react";
import OutlineShadowButton from "./OutlineShadowButton";
import UnderlineInput from "./ui/UnderlineInput";
import {
  createCheckoutSession,
  Metadata,
} from "@/actions/createCheckoutSession";
import { useCart } from "@/store/cart";
import { createCustomer } from "@/actions/createCustomer";
import { createOrder } from "@/actions/createOrder";

const FormComponent = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const cart = useCart((state) => state.items);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckout = async () => {
    setIsLoading(true);

    try {
      const customerId = crypto.randomUUID();
      const orderNumber = crypto.randomUUID();

      const customer = await createCustomer({ ...formData, id: customerId });

      console.log(customer);

      const total = cart.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
      );

      await createOrder({
        id: orderNumber,
        customerId,
        total,
        cart,
      });

      const stockIds = cart.map((item) => item.stockId).join(",");

      const metadata: Metadata = {
        orderNumber,
        customerName: formData.fullName,
        customerEmail: formData.email,
        customerId,
        stockIds,
      };

      const checkoutUrl = await createCheckoutSession(cart, metadata);

      if (checkoutUrl) {
        console.log(checkoutUrl);
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.error("Error creando checkout session.", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleCheckout();
      }}
      className="w-full max-w-md mx-auto flex flex-col gap-8 p-6 bg-white"
    >
      <h2
        style={{ fontFamily: "var(--font-gobold)" }}
        className="text-5xl font-bold mb-4"
      >
        Completa tus datos
      </h2>

      <UnderlineInput
        name="fullName"
        placeholder="Nombre completo"
        value={formData.fullName}
        onChange={handleChange}
        required
      />
      <UnderlineInput
        name="email"
        type="email"
        placeholder="Correo electrónico"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <UnderlineInput
        name="phone"
        type="tel"
        placeholder="Teléfono"
        value={formData.phone}
        onChange={handleChange}
        required
      />
      <UnderlineInput
        name="address"
        placeholder="Dirección"
        value={formData.address}
        onChange={handleChange}
        required
      />
      <UnderlineInput
        name="city"
        placeholder="Ciudad"
        value={formData.city}
        onChange={handleChange}
        required
      />
      <UnderlineInput
        name="state"
        placeholder="Estado / Provincia"
        value={formData.state}
        onChange={handleChange}
        required
      />
      <UnderlineInput
        name="zip"
        className="mb-6"
        placeholder="Código postal"
        value={formData.zip}
        onChange={handleChange}
        required
      />

      <OutlineShadowButton type="submit" className="w-full">
        {isLoading ? "Cargando..." : "Continuar compra"}
      </OutlineShadowButton>
    </form>
  );
};

export default FormComponent;
