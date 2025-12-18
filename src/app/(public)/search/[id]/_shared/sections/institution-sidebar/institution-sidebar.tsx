import React from "react";
import { ProfileCard } from "./components";
import { ContactForm } from "../index";
import { useInstitutionSidebarData } from "./hooks";
import { ProtectedUserGuard } from "../../components";

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

      {/* Contact Form - Protected - Mobilde gizli */}
      <div className="d-none d-lg-block">
        <ProtectedUserGuard message="İletişim formu için lütfen giriş yapınız.">
          <ContactForm schoolId={school.id} campusId={campus.id} />
        </ProtectedUserGuard>
      </div>
    </div>
  );
}
