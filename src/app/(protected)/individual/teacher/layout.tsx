"use client";

import React from "react";
import { Footer } from "@/components";
import { IndividualHeader } from "../_shared/sections/header";

const TeacherLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="teacher-layout d-flex flex-column min-vh-100">
      <IndividualHeader />
      <main className="main-content flex-fill">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default TeacherLayout;
