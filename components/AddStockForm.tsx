"use client";

import { Stock } from "@prisma/client";
import { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  colors: string[];
}

interface AddStockFormProps {
  initialData: Stock | null;
}

export default function AddStockForm({ initialData }: AddStockFormProps) {
  const [formData, setFormData] = useState({
    productId: initialData?.productId || "",
    color: initialData?.color || "",
    size: initialData?.size || "",
    quantity: initialData?.quantity || 0,
  });

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const isEditMode = !!initialData;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error al cargar productos:", err);
      }
    };

    fetchProducts();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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
      const endpoint = isEditMode
        ? `/api/stock/${initialData.id}`
        : "/api/stock";

      const method = isEditMode ? "PATCH" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          quantity: Number(formData.quantity),
        }),
      });

      if (res.ok) {
        setSuccess(
          isEditMode
            ? "Stock actualizado correctamente."
            : "Stock agregado correctamente."
        );
        if (!isEditMode) {
          setFormData({
            productId: "",
            color: "",
            size: "",
            quantity: 0,
          });
        }
      } else {
        setError("Error al agregar stock.");
      }
    } catch (error) {
      console.error(error);
      setError("Error al enviar los datos.");
    } finally {
      setLoading(false);
    }
  };

  const selectedProduct = products.find((p) => p.id === formData.productId);

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
        {isEditMode ? "Editar Stock" : "Agregar Stock"}
      </h2>

      {/* Producto */}
      <div>
        <label className="block text-sm font-medium mb-1">Producto</label>
        <select
          name="productId"
          value={formData.productId}
          onChange={handleChange}
          required
          className="w-full border-b border-gray-400 focus:outline-none py-1 bg-white"
        >
          <option value="">Seleccionar producto</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
      </div>

      {/* Color */}
      <div>
        <label className="block text-sm font-medium mb-1">Color</label>
        <select
          name="color"
          value={formData.color}
          onChange={handleChange}
          required
          className="w-full border-b border-gray-400 focus:outline-none py-1 bg-white"
          disabled={!selectedProduct}
        >
          <option value="">Seleccionar color</option>
          {selectedProduct?.colors?.map((color, index) => (
            <option key={index} value={color}>
              {color}
            </option>
          ))}
        </select>
      </div>

      {/* Talle */}
      <div>
        <label className="block text-sm font-medium mb-1">Talla</label>
        <select
          name="size"
          value={formData.size}
          onChange={handleChange}
          required
          className="w-full border-b border-gray-400 focus:outline-none py-1 bg-white"
        >
          <option value="">Seleccionar talle</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
        </select>
      </div>

      {/* Cantidad */}
      <div>
        <label className="block text-sm font-medium mb-1">Cantidad</label>
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
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
          : isEditMode
          ? "Guardar cambios"
          : "Agregar Stock"}
      </button>

      {success && <p className="text-green-600">{success}</p>}
      {error && <p className="text-red-600">{error}</p>}
    </form>
  );
}
