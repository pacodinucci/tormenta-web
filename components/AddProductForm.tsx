"use client";

import { Products } from "@prisma/client";
import { useState } from "react";

interface AddProductFormProps {
  initialData: Products | null;
}

export default function AddProductForm({ initialData }: AddProductFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    price: initialData?.price || "",
    colors: initialData?.colors?.join(", ") || "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          price: initialData?.price?.toString() || "",
          colors: formData.colors.split(",").map((c) => c.trim()),
        }),
      });

      if (res.ok) {
        setSuccess("Producto creado correctamente.");
        setFormData({
          name: "",
          description: "",
          price: "",
          colors: "",
        });
      } else {
        setError("Error al crear el producto.");
      }
    } catch (error) {
      console.error(error);
      setError("Error al enviar los datos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 space-y-4"
      style={{ fontFamily: "var(--font-franklin)" }}
    >
      <h2
        className="text-2xl font-bold tracking-wider"
        style={{ fontFamily: "var(--font-impact)" }}
      >
        Agregar Producto
      </h2>

      <div>
        <label className="block text-sm font-medium mb-1">Nombre</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border-b border-gray-400 focus:outline-none py-1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Descripción</label>
        <input
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full border-b border-gray-400 focus:outline-none py-1 resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Precio</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          className="w-full border-b border-gray-400 focus:outline-none py-1"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Colores (separados por coma)
        </label>
        <input
          type="text"
          name="colors"
          value={formData.colors}
          onChange={handleChange}
          required
          placeholder="negro, gris, verde"
          className="w-full border-b border-gray-400 focus:outline-none py-1"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 bg-black text-white rounded hover:bg-gray-800 transition"
      >
        {loading
          ? "Guardando..."
          : initialData
          ? "Guardar Producto"
          : "Agregar Producto"}
      </button>

      {success && <p className="text-green-600">{success}</p>}
      {error && <p className="text-red-600">{error}</p>}
    </form>
  );
}
