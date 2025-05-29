"use client";

import React from "react";
import { useSession } from "next-auth/react";

const AdminPage = () => {
  const { data } = useSession();

  console.log("DATA -> ", data);

  if (data?.user?.role !== "ADMIN") {
    window.location.href = "/";
  }

  return <div>AdminPage</div>;
};

export default AdminPage;
