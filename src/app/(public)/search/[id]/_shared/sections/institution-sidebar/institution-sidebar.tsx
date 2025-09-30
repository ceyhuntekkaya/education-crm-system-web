import React from 'react';
import { ProfileCard } from './components';
import { ContactForm } from '../index';
import { useInstitutionSidebarData } from './hooks';

export default function InstitutionSidebar() {
  const { school, campus } = useInstitutionSidebarData();

  return (
    <div>
      {/* Profile Card */}
      <ProfileCard />

      {/* Contact Form */}
      <ContactForm schoolId={school.id} campusId={campus.id} />
    </div>
  );
}