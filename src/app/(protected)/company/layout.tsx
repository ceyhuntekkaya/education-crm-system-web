"use client";

import { Sidebar } from "@/components";
import React from "react";
import { useAuth } from "@/contexts";
import { companyLayoutNavigation, CompanyProvider } from "./_shared";

const CompanyLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, currentRole } = useAuth();
  return (
    <CompanyProvider>
      <div>
        <Sidebar
          menuItems={companyLayoutNavigation}
          companyName={"Eğitim CRM"}
          userName={user?.fullName || "Kullanıcı"}
          userRole={currentRole || "Kullanıcı"}
        />
        <div
          style={{
            marginLeft: "280px",
            transition: "margin-left 0.3s ease",
            minHeight: "100vh",
            // backgroundColor: "#f8f9fa",
          }}
        >
          <div className="mx-16 my-16">{children}</div>
        </div>
      </div>
    </CompanyProvider>
  );
};

export default CompanyLayout;
