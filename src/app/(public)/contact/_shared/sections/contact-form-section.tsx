"use client";

import React from "react";
import Image from "next/image";
import { ContactForm } from "./contact-form";
import { InstitutionInfoSection } from "./institution-info-section";

export const ContactFormSection: React.FC = () => {
  return (
    <section
      id="contact-form-section"
      className="contact-form-section py-160 position-relative"
    >
      {/* Wave Background */}
      <div className="contact-form-section__wave-bg d-lg-block d-none">
        <Image
          src="/assets/images/bg/wave-bg.png"
          alt=""
          fill
          sizes="(min-width: 3440px) 3440px, (min-width: 2560px) 2560px, 100vw"
          quality={100}
          priority
        />
      </div>

      <div className="container">
        <div className="row gy-5">
          {/* Sol Taraf - Kurum Bilgileri */}
          <div className="col-lg-6">
            <InstitutionInfoSection />
          </div>

          {/* Sağ Taraf - Form */}
          <div className="col-lg-6">
            <div className="p-24 bg-white rounded-16 box-shadow-md">
              <div className="border border-neutral-30 rounded-12 bg-main-25 p-24">
                <h4 className="mb-0">Bilgi Talep Formu</h4>
                <span className="d-block border border-neutral-30 my-24 border-dashed" />
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
