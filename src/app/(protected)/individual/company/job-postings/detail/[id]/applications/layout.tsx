"use client";

import React from "react";
import { ApplicationsByJobPostingProvider } from "./_shared/contexts";

/**
 * ================================================================================
 * APPLICATIONS LAYOUT
 * ================================================================================
 * İş ilanına yapılan başvurular sayfası layout'u
 * - Context provider'lar burada tanımlanır
 */

interface ApplicationsLayoutProps {
  children: React.ReactNode;
}

const ApplicationsLayout: React.FC<ApplicationsLayoutProps> = ({
  children,
}) => {
  return (
    <ApplicationsByJobPostingProvider>
      {children}
    </ApplicationsByJobPostingProvider>
  );
};

export default ApplicationsLayout;
