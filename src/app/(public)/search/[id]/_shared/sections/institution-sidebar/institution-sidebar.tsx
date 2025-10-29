import React from "react";
import { ProfileCard } from "./components";
import { ContactForm } from "../index";
import { useInstitutionSidebarData } from "./hooks";

export default function InstitutionSidebar() {
  const { school, campus } = useInstitutionSidebarData();

  // School veya campus yoksa hiçbir şey gösterme
  if (!school || !campus) {
    return null;
  }

  return (
    <div>
      {/* Profile Card */}
      <ProfileCard />

      {/* Contact Form */}
      <ContactForm schoolId={school.id} campusId={campus.id} />
    </div>
  );
}
