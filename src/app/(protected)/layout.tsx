"use client";
import React, { useState } from "react";
import { ProtectedGuard } from "@/providers";
import { Sidebar } from "@/components";
import { userLayoutNavigation } from "@/routes";

const ProtectedLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ProtectedGuard>
      <div>
        <Sidebar
          menuItems={userLayoutNavigation}
          companyName="EduAll"
          userName="Henry"
          userRole="Admin"
        />
        <div
          style={{
            marginLeft: "320px",
            transition: "margin-left 0.3s ease",
            minHeight: "100vh",
            backgroundColor: "#f8f9fa",
          }}
        >
          {children}
        </div>
      </div>
    </ProtectedGuard>
  );
};

export default ProtectedLayout;
