"use client";

import { Order } from "@prisma/client";
import DataTable from "@/components/ui/DataTable";
import { useRouter } from "next/navigation";

interface OrderWithCustomer extends Order {
  Customer: {
    name: string;
    email?: string | null;
  };
}

interface OrderTableWrapperProps {
  orders: OrderWithCustomer[];
}

export default function OrderTableWrapper({ orders }: OrderTableWrapperProps) {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("¿Estás seguro de eliminar esta orden?");
    if (!confirm) return;

    try {
      const res = await fetch(`/api/order/${id}`, { method: "DELETE" });
      if (res.ok) {
        router.refresh();
      } else {
        alert("Error al eliminar la orden");
      }
    } catch (err) {
      console.error(err);
      alert("Ocurrió un error al eliminar la orden.");
    }
  };

  const columns = [
    "Cliente",
    "Email",
    "Total",
    "Pagado",
    "Entregado",
    "Fecha de creación",
  ];

  const rows = orders.map((order) => ({
    id: order.id,
    Cliente: order.Customer.name,
    Email: order.Customer.email ?? "—",
    Total: `$${(order.total / 100).toFixed(2)}`,
    Pagado: order.isPaid ? "✅" : "❌",
    Entregado: order.isDelivered ? "✅" : "❌",
    // "Fecha de creación": new Date(order.createdAt).toLocaleDateString(),
    "Fecha de creación": new Date(order.createdAt),
  }));

  return (
    <DataTable
      columns={columns}
      rows={rows}
      actions={{
        editUrl: (id) => `/admin/orders/${id}`,
        onDelete: handleDelete,
      }}
    />
  );
}
