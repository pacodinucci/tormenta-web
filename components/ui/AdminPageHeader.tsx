"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

interface AdminPageHeaderProps {
  title: string;
  hasAddButton?: boolean;
  addButtonLabel?: string;
  link?: string;
}
const AdminPageHeader = ({
  title,
  hasAddButton,
  addButtonLabel,
  link,
}: AdminPageHeaderProps) => {
  const router = useRouter();

  const handleClick = () => {
    if (link) {
      router.push(link);
    }
  };

  return (
    <div className="flex justify-between items-center h-24">
      <h1
        style={{ fontFamily: "var(--font-impact)" }}
        className="tracking-wider text-3xl mt-4 ml-8"
      >
        {title}
      </h1>
      {hasAddButton && (
        <button
          onClick={handleClick}
          className="px-4 py-2 mr-4 bg-gradient-to-r from-slate-900 to-slate-700 rounded-md cursor-pointer text-white shadow flex gap-2"
        >
          <Plus />
          {addButtonLabel}
        </button>
      )}
    </div>
  );
};

export default AdminPageHeader;
