"use client";

import { SquarePen, Trash2 } from "lucide-react";
import Link from "next/link";

interface DataTableProps {
  columns: string[];
  rows: Record<string, unknown>[];
  rowIdKey?: string;
  actions?: {
    editUrl?: (id: string) => string;
    onDelete?: (id: string) => void;
  };
}

export default function DataTable({
  columns,
  rows,
  rowIdKey = "id",
  actions,
}: DataTableProps) {
  const hasActions = !!actions;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col) => (
              <th key={col} className="text-left px-4 py-2 border-b">
                {col}
              </th>
            ))}
            {hasActions && <th className="px-4 py-2 border-b">Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (hasActions ? 1 : 0)}
                className="px-4 py-2 text-center"
              >
                Sin datos disponibles
              </td>
            </tr>
          ) : (
            rows.map((row, idx) => {
              const id = row[rowIdKey]?.toString();
              return (
                <tr key={id || idx} className="hover:bg-gray-50 h-10">
                  {columns.map((col) => (
                    <td
                      key={col}
                      className="px-4 py-2 border-b max-w-[200px] truncate whitespace-nowrap overflow-hidden"
                    >
                      {formatCell(row[col], col)}
                    </td>
                  ))}
                  {hasActions && (
                    <td className="px-4 py-2 border-b space-x-2 flex justify-center">
                      {actions?.editUrl && id && (
                        <Link
                          href={actions.editUrl(id)}
                          className="text-blue-600 hover:underline"
                        >
                          <SquarePen />
                        </Link>
                      )}
                      {actions?.onDelete && id && (
                        <button
                          onClick={() => actions.onDelete?.(id)}
                          className="text-red-600 hover:underline cursor-pointer"
                        >
                          <Trash2 />
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

// function formatCell(value: any) {
//   if (Array.isArray(value)) return value.join(", ");
//   if (value instanceof Date) return value.toLocaleDateString("es-AR");
//   return value?.toString() ?? "";
// }

function formatCell(value: unknown, column: string) {
  if (column === "colors" && Array.isArray(value)) {
    return (
      <div className="flex gap-1">
        {value.map((color: string, index: number) => (
          <span
            key={index}
            className="inline-block bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-full"
          >
            {color}
          </span>
        ))}
      </div>
    );
  }

  if (value instanceof Date) return value.toLocaleDateString("es-AR");
  return value?.toString() ?? "";
}
