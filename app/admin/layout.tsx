"use client";

import React, { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import Image from "next/image";
import { useMediaQuery } from "@/hooks/use-media-query";

const AdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="flex h-screen relative overflow-hidden">
      {/* Sidebar */}
      <AdminSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Botón toggle solo en escritorio */}
      <div className="relative">
        {!isMobile && (
          <button
            onClick={() => setIsSidebarOpen((prev) => !prev)}
            className="absolute top-4 left-12 -translate-x-full z-30 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-md cursor-pointer"
          >
            <Image
              src="/logo.png"
              alt="Logo Tormenta Rainwear"
              width={20}
              height={20}
            />
          </button>
        )}
      </div>

      {/* Contenido principal */}
      <main className="flex-1 p-6 z-10 w-full overflow-y-auto">{children}</main>

      {/* Botón toggle solo en móviles */}
      {isMobile && !isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="fixed top-4 left-4 z-50 bg-white rounded-full p-2 shadow-md"
        >
          <Image src="/logo.png" alt="Abrir menú" width={24} height={24} />
        </button>
      )}
    </div>
  );
};

export default AdminLayout;
