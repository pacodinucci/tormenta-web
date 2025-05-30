"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProductImage, Products } from "@prisma/client";
import Image from "next/image";
import { ImageUpload } from "./ImageUpload";
import { X } from "lucide-react";
import toast from "react-hot-toast";

interface ProductWithImages extends Products {
  images: ProductImage[];
}

interface AddProductFormProps {
  initialData: ProductWithImages | null;
}

export default function AddProductForm({ initialData }: AddProductFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    price: initialData?.price || "",
    colors: initialData?.colors?.join(", ") || "",
    images:
      initialData?.images?.map((img) => ({
        url: img.url,
        color: img.color,
      })) || [],
  });

  const [loading, setLoading] = useState(false);

  const isEditMode = !!initialData;

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

    try {
      const endpoint = isEditMode
        ? `/api/products/${initialData.id}`
        : "/api/products";

      const method = isEditMode ? "PATCH" : "POST";

      const res = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          colors: formData.colors.split(",").map((c) => c.trim()),
        }),
      });

      if (res.ok) {
        toast.success(
          isEditMode
            ? "Producto actualizado correctamente."
            : "Producto agregado correctamente."
        );

        if (!isEditMode) {
          setFormData({
            name: "",
            description: "",
            price: "",
            colors: "",
            images: [] as { url: string; color: string }[],
          });
        }
        router.push("/admin/products");
      } else {
        toast.error(
          isEditMode
            ? "Error al actualizar el producto."
            : "Error al crear el producto."
        );
      }
    } catch (error) {
      console.error(error);
      toast.error("Error al enviar los datos.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddImageByColor = (url: string, color: string) => {
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, { url, color }],
    }));
  };

  const handleRemoveImage = (url: string, color: string) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter(
        (img) => !(img.url === url && img.color === color)
      ),
    }));
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
        {initialData ? "Editar Producto" : "Agregar Producto"}
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

      {formData.colors
        .split(",")
        .map((color) => color.trim())
        .filter((color) => color !== "")
        .map((color) => {
          const imagesForColor = formData.images.filter(
            (img) => img.color === color
          );

          return (
            <div key={color} className="mb-4">
              <h4 className="text-sm font-semibold mb-1 capitalize">{color}</h4>
              <div className="flex flex-wrap gap-2">
                {imagesForColor.map((img, idx) => (
                  <div
                    key={idx}
                    className="relative w-20 h-20 border border-gray-300 rounded"
                  >
                    <Image
                      src={img.url}
                      alt={`Imagen ${idx + 1}`}
                      fill
                      className="rounded object-cover"
                    />

                    <button
                      type="button"
                      onClick={() => handleRemoveImage(img.url, img.color)}
                      className="absolute -top-1 -right-1 bg-gray-300 text-white text-xs rounded-full w-3 h-3 flex items-center justify-center hover:bg-gray-400"
                      title="Eliminar imagen"
                    >
                      <X />
                    </button>
                  </div>
                ))}

                <div className="relative w-20 h-20 border border-dashed border-gray-400 rounded flex items-center justify-center hover:opacity-70 transition">
                  <ImageUpload
                    value=""
                    onChange={(url) => handleAddImageByColor(url, color)}
                  />
                </div>
              </div>
            </div>
          );
        })}

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
    </form>
  );
}
