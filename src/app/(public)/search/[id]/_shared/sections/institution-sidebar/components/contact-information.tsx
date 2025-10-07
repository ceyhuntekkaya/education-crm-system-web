import React from "react";
import { useInstitutionSidebarData } from "../hooks/useInstitutionSidebarData";

export const ContactInformation: React.FC = () => {
  const { school, campus } = useInstitutionSidebarData();

  return (
    <div className="d-flex flex-column gap-16">
      <div className="flex-align gap-16">
        <span className="text-2xl text-main-600">
          <i className="ph-bold ph-phone-call" />
        </span>
        <div className="d-flex flex-column">
          <a
            href={`tel:${school.phone}`}
            className="text-neutral-700 hover-text-main-600"
          >
            {school.phone}
          </a>
          {school.extension && (
            <small className="text-neutral-500">
              Dahili: {school.extension}
            </small>
          )}
        </div>
      </div>
      <div className="flex-align gap-16">
        <span className="text-2xl text-success-600">
          <i className="ph-bold ph-envelope-simple" />
        </span>
        <a
          href={`mailto:${school.email}`}
          className="text-neutral-700 hover-text-main-600"
        >
          {school.email}
        </a>
      </div>
      <div className="flex-align gap-16">
        <span className="text-2xl text-warning-600">
          <i className="ph-bold ph-map-pin-line" />
        </span>
        <span className="text-neutral-700">
          {campus.addressLine1}
          {campus.addressLine2 && (
            <>
              <br />
              {campus.addressLine2}
            </>
          )}
          {campus.district?.name ? `, ${campus.district.name}` : ""}
          {campus.province?.name ? `, ${campus.province.name}` : ""}
          {campus.postalCode && ` ${campus.postalCode}`}
        </span>
      </div>
      {campus.websiteUrl && (
        <div className="flex-align gap-16">
          <span className="text-2xl text-info-600">
            <i className="ph-bold ph-globe" />
          </span>
          <a
            href={campus.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-neutral-700 hover-text-main-600"
          >
            {campus.websiteUrl}
          </a>
        </div>
      )}
    </div>
  );
};
