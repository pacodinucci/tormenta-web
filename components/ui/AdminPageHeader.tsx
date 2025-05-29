import React from "react";

interface AdminPageHeaderProps {
  title: string;
  hasAddButton?: boolean;
  addButtonLabel?: string;
}
const AdminPageHeader = ({
  title,
  hasAddButton,
  addButtonLabel,
}: AdminPageHeaderProps) => {
  return (
    <div className="flex justify-between items-center h-24">
      <h1
        style={{ fontFamily: "var(--font-impact)" }}
        className="tracking-wider text-3xl mt-4 ml-8"
      >
        {title}
      </h1>
      {hasAddButton && <button>{addButtonLabel}</button>}
    </div>
  );
};

export default AdminPageHeader;
