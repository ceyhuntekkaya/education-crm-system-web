"use client";

import { Sidebar } from "./_shared";
import React from "react";
import { companyLayoutNavigation, CompanyProvider } from "./_shared";

const CompanyLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <CompanyProvider>
      <div>
        <Sidebar menuItems={companyLayoutNavigation} />
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
