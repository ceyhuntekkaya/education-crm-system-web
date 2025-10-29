"use client";

import React from "react";

interface UserDetailIdLayoutProps {
  children: React.ReactNode;
}

const UserDetailIdLayout: React.FC<UserDetailIdLayoutProps> = ({
  children,
}) => {
  return <>{children}</>;
};

export default UserDetailIdLayout;
