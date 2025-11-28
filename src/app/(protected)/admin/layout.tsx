import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Paneli",
  description: "Admin yönetim paneli",
};

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

export default AdminLayout;
