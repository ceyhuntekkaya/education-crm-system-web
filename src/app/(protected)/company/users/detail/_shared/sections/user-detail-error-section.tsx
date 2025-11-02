"use client";
import React from "react";
import { CustomCard } from "@/components/ui";

interface UserDetailErrorSectionProps {
  error: string;
}

export const UserDetailErrorSection: React.FC<UserDetailErrorSectionProps> = ({
  error,
}) => {
  return (
    <CustomCard>
      <div className="text-center py-5">
        <i
          className="ph ph-warning-circle text-danger"
          style={{ fontSize: "48px" }}
        ></i>
        <h4 className="mt-3">Hata Oluştu</h4>
        <p className="text-muted">{error}</p>
      </div>
    </CustomCard>
  );
};
