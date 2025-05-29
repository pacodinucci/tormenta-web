"use client";

import { Products } from "@prisma/client";
import DataTable from "@/components/ui/DataTable";
import { useRouter } from "next/navigation";

interface ProductsTableWrapperProps {
  products: Products[];
}

export default function ProductsTableWrapper({
  products,
}: ProductsTableWrapperProps) {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("¿Estás seguro de eliminar este producto?");
    if (!confirm) return;

    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (res.ok) {
        router.refresh();
      } else {
        alert("Error al eliminar el producto");
      }
    } catch (err) {
      console.error(err);
      alert("Ocurrió un error");
    }
  };

  const columns = ["name", "price", "colors", "createdAt"];
  const rows = products.map((p) => ({
    id: p.id,
    name: p.name,
    price: `$${p.price}`,
    colors: p.colors,
    createdAt: new Date(p.createdAt),
  }));

  return (
    <DataTable
      columns={columns}
      rows={rows}
      actions={{
        editUrl: (id) => `/admin/products/${id}`,
        onDelete: handleDelete,
      }}
    />
  );
}
