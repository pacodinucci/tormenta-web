"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useMediaQuery } from "@/hooks/use-media-query";
import { X } from "lucide-react";

const links = [
  { href: "/admin", label: "Inicio" },
  { href: "/admin/products", label: "Productos" },
  { href: "/admin/stock", label: "Stock" },
  { href: "/admin/orders", label: "Órdenes" },
  { href: "/admin/customers", label: "Clientes" },
];

interface Props {
  isOpen: boolean;
  onClose?: () => void;
}

export default function AdminSidebar({ isOpen, onClose }: Props) {
  const pathname = usePathname();
  const isMobile = useMediaQuery("(max-width: 768px)");

  if (isMobile) {
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Fondo oscuro clickeable */}
            <motion.div
              className="fixed inset-0 bg-black/30 z-40"
              onClick={onClose}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Sidebar móvil */}
            <motion.aside
              className="fixed left-0 top-0 z-50 w-64 h-full bg-slate-100 text-neutral-800 shadow-lg"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.2 }}
            >
              {/* Botón de cerrar */}
              <div className="flex justify-end p-2">
                <button
                  onClick={onClose}
                  className="text-2xl font-bold text-neutral-600 hover:text-neutral-900 p-2"
                >
                  <X />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <Image
                  src={"/isologo.png"}
                  alt="Tormenta Rainwear"
                  width={150}
                  height={0}
                />
                <nav className="flex flex-col gap-4">
                  {links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={onClose}
                      style={{ fontFamily: "var(--font-cinzel)" }}
                      className={`hover:text-neutral-500 transition ${
                        pathname === link.href
                          ? "font-bold text-neutral-700"
                          : ""
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    );
  }

  // Versión escritorio
  return (
    <motion.aside
      initial={false}
      animate={{ width: isOpen ? "16rem" : "0rem" }}
      transition={{ duration: 0.1 }}
      className="overflow-hidden bg-slate-100 text-neutral-800 h-screen transition-all duration-300"
    >
      <div className="p-6 space-y-6">
        <Image
          src={"/isologo.png"}
          alt="Tormenta Rainwear"
          width={150}
          height={0}
        />
        <nav className="flex flex-col gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{ fontFamily: "var(--font-cinzel)" }}
              className={`hover:text-neutral-500 transition ${
                pathname === link.href ? "font-bold text-neutral-700" : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </motion.aside>
  );
}
