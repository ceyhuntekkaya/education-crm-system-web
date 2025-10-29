"use client";
import React from "react";

import { useUserDetail } from "../_shared/context";
import {
  UserDetailSection,
  UserLoadingSection,
  UserDetailErrorSection,
  UserDetailNotFoundSection,
} from "../_shared/sections";

const UserDetailPage: React.FC = () => {
  const { currentUser, isLoading, error } = useUserDetail();

  // Loading durumu
  if (isLoading) {
    return <UserLoadingSection />;
  }

  // Error durumu
  if (error) {
    return <UserDetailErrorSection error={error} />;
  }

  // Empty state durumu
  if (!currentUser) {
    return <UserDetailNotFoundSection />;
  }

  return (
    <div className="d-flex flex-column gap-24">
      <UserDetailSection />
    </div>
  );
};

export default UserDetailPage;
