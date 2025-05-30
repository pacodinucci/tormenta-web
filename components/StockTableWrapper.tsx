"use client";

import { Stock } from "@prisma/client";
import DataTable from "@/components/ui/DataTable";
import { useRouter } from "next/navigation";

interface StockWithProduct extends Stock {
  Products: {
    name: string;
  };
}

interface StockTableWrapperProps {
  stock: StockWithProduct[];
}

export default function StockTableWrapper({ stock }: StockTableWrapperProps) {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("¿Estás seguro de eliminar este stock?");
    if (!confirm) return;

    try {
      const res = await fetch(`/api/stock/${id}`, { method: "DELETE" });
      if (res.ok) {
        router.refresh();
      } else {
        alert("Error al eliminar el stock");
      }
    } catch (err) {
      console.error(err);
      alert("Ocurrió un error");
    }
  };

  const columns = ["Producto", "Color", "Talla", "Stock", "Creado"];
  const rows = stock.map((s) => ({
    id: s.id,
    Producto: s.Products.name,
    Color: s.color,
    Talla: s.size,
    Stock: s.quantity,
    Creado: new Date(s.createdAt),
  }));

  return (
    <DataTable
      columns={columns}
      rows={rows}
      actions={{
        editUrl: (id) => `/admin/stock/${id}`,
        onDelete: handleDelete,
      }}
    />
  );
}
