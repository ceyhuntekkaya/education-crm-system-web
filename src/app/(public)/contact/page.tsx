"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ContactInfoSection, ContactFormSection } from "./_shared";

const ContactPage = () => {
  const searchParams = useSearchParams();
  const scrollToForm = searchParams.get("scrollToForm");

  useEffect(() => {
    if (scrollToForm === "true") {
      const formSection = document.getElementById("contact-form-section");
      if (formSection) {
        setTimeout(() => {
          const offset = -50; // Header yüksekliği için offset
          const elementPosition = formSection.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }, 100);
      }
    }
  }, [scrollToForm]);

  return (
    <>
      <ContactInfoSection />
      <ContactFormSection />
    </>
  );
};

export default ContactPage;
