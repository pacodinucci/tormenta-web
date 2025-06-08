"use client";

import { Customer } from "@prisma/client";
import DataTable from "@/components/ui/DataTable";
import { useRouter } from "next/navigation";

interface CustomerTableWrapperProps {
  customers: Customer[];
}

export default function CustomerTableWrapper({
  customers,
}: CustomerTableWrapperProps) {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("¿Estás seguro de eliminar este cliente?");
    if (!confirm) return;

    try {
      const res = await fetch(`/api/customer/${id}`, { method: "DELETE" });
      if (res.ok) {
        router.refresh();
      } else {
        alert("Error al eliminar el cliente");
      }
    } catch (err) {
      console.error(err);
      alert("Ocurrió un error");
    }
  };

  const columns = [
    "Nombre",
    "Email",
    "Teléfono",
    "Dirección",
    "Código Postal",
    "Creado",
  ];

  const rows = customers.map((c) => ({
    id: c.id,
    Nombre: c.name,
    Email: c.email,
    Teléfono: c.phone,
    Dirección: c.address,
    "Código Postal": c.zipCode,
    Creado: new Date(c.createdAt),
  }));

  return (
    <DataTable
      columns={columns}
      rows={rows}
      actions={{
        editUrl: (id) => `/admin/customers/${id}`,
        onDelete: handleDelete,
      }}
    />
  );
}
