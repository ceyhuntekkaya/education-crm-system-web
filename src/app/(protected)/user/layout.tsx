import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kullanıcı Paneli",
  description: "Kullanıcı yönetim paneli",
};

const UserLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>;
};

export default UserLayout;
