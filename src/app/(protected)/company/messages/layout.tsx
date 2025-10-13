"use client";

import React from "react";
import { MessagesProvider } from "./_shared";

interface MessagesLayoutProps {
  children: React.ReactNode;
}

const MessagesLayout: React.FC<MessagesLayoutProps> = ({ children }) => {
  return <MessagesProvider>{children}</MessagesProvider>;
};

export default MessagesLayout;
