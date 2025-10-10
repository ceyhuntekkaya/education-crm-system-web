"use client";

import React from "react";

interface AddEditLayoutProps {
  children: React.ReactNode;
}

const AddEditLayout: React.FC<AddEditLayoutProps> = ({ children }) => {
  return <div className="add-edit-layout">{children}</div>;
};

export default AddEditLayout;
