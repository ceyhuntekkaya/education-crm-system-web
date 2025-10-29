"use client";
import React from "react";
import { CustomCard } from "@/components/ui";
import { useUserDetail } from "../context";

/**
 * User Detail Section - Brand detail yapısıyla aynı pattern
 * Multi-section config yapısını kullanır
 */
export const UserDetailSection: React.FC = () => {
  const { currentUser, allSections } = useUserDetail();

  return (
    <CustomCard
      title="Kullanıcı Detayları"
      editButtonUrl={`/company/users/add-edit/${currentUser?.id}`}
      multiItems={allSections}
      isBack={true}
    />
  );
};
