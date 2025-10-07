import { useState } from "react";
import Image from "next/image";
import { useInstitutionDetail } from "../contexts";

export default function InstitutionCampusInfo() {
  const { school, campus, brand, renderStars } = useInstitutionDetail();
  const [activeTab, setActiveTab] = useState("campus");

  const campusInfoItems = [
    {
      label: "Kampüs Adı",
      value: <span className="text-main-600 fw-semibold">{campus.name}</span>,
      isShowing: campus.name && campus.name.trim() !== "",
    },
    {
      label: "Açıklama",
      value: campus.description,
      isShowing: campus.description && campus.description.trim() !== "",
    },
    {
      label: "Kampüs Logosu",
      value: campus.logoUrl ? (
        <Image
          src={campus.logoUrl}
          alt={campus.name}
          width={60}
          height={60}
          className="rounded-8 object-cover"
        />
      ) : null,
      isShowing: campus.logoUrl && campus.logoUrl.trim() !== "",
    },
    {
      label: "Adres",
      value: (
        <div className="d-flex flex-column gap-4">
          <span>{campus.addressLine1}</span>
          {campus.addressLine2 && (
            <span className="text-neutral-600">{campus.addressLine2}</span>
          )}
          <span className="text-sm text-neutral-500">
            {campus.district?.name} / {campus.province?.name}
            {campus.postalCode && ` - ${campus.postalCode}`}
          </span>
        </div>
      ),
      isShowing: campus.addressLine1 && campus.addressLine1.trim() !== "",
    },
    {
      label: "İletişim",
      value: (
        <div className="d-flex flex-column gap-8">
          {campus.phone && (
            <div className="d-flex align-items-center gap-8">
              <i className="ph-bold ph-phone text-main-600"></i>
              <span>{campus.phone}</span>
            </div>
          )}
          {campus.email && (
            <div className="d-flex align-items-center gap-8">
              <i className="ph-bold ph-envelope text-main-600"></i>
              <a href={`mailto:${campus.email}`} className="text-main-600">
                {campus.email}
              </a>
            </div>
          )}
          {campus.fax && (
            <div className="d-flex align-items-center gap-8">
              <i className="ph-bold ph-fax text-main-600"></i>
              <span>{campus.fax}</span>
            </div>
          )}
        </div>
      ),
      isShowing: campus.phone || campus.email || campus.fax,
    },
    {
      label: "Website",
      value: campus.websiteUrl ? (
        <a
          href={campus.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-main-600 d-flex align-items-center gap-8 hover-text-main-800"
        >
          <i className="ph-bold ph-globe"></i>
          {campus.websiteUrl}
        </a>
      ) : null,
      isShowing: campus.websiteUrl && campus.websiteUrl.trim() !== "",
    },
    {
      label: "Sosyal Medya",
      value: (
        <div className="d-flex align-items-center gap-12">
          {campus.facebookUrl && (
            <a
              href={campus.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-social-facebook"
            >
              <i className="ph ph-facebook-logo text-xl"></i>
            </a>
          )}
          {campus.instagramUrl && (
            <a
              href={campus.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-social-instagram"
            >
              <i className="ph ph-instagram-logo text-xl"></i>
            </a>
          )}
          {campus.twitterUrl && (
            <a
              href={campus.twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-social-twitter"
            >
              <i className="ph ph-twitter-logo text-xl"></i>
            </a>
          )}
          {campus.linkedinUrl && (
            <a
              href={campus.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-social-linkedin"
            >
              <i className="ph ph-linkedin-logo text-xl"></i>
            </a>
          )}
        </div>
      ),
      isShowing:
        campus.facebookUrl ||
        campus.instagramUrl ||
        campus.twitterUrl ||
        campus.linkedinUrl,
    },
    {
      label: "Kampüs Değerlendirme",
      value: (
        <div className="d-flex flex-column gap-8">
          <div className="d-flex align-items-center gap-8">
            {renderStars(campus.ratingAverage)}
            <span className="text-md text-neutral-700 ms-8 fw-semibold">
              {campus.ratingAverage}
            </span>
          </div>
          <small className="text-neutral-500">
            {campus.ratingCount} değerlendirme
          </small>
        </div>
      ),
      isShowing:
        campus.ratingAverage && campus.ratingCount && campus.ratingCount > 0,
    },
  ];

  const brandInfoItems = [
    {
      label: "Okul Grubu Adı",
      value: <span className="text-main-600 fw-semibold">{brand.name}</span>,
      isShowing: brand.name && brand.name.trim() !== "",
    },
    {
      label: "Kuruluş Yılı",
      value: brand.foundedYear,
      isShowing: brand.foundedYear && brand.foundedYear > 0,
    },
    {
      label: "Grup Açıklaması",
      value: brand.description,
      isShowing: brand.description && brand.description.trim() !== "",
    },
    {
      label: "Grup İletişim",
      value: (
        <div className="d-flex flex-column gap-8">
          {brand.phone && (
            <div className="d-flex align-items-center gap-8">
              <i className="ph-bold ph-phone text-main-600"></i>
              <span>{brand.phone}</span>
            </div>
          )}
          {brand.email && (
            <div className="d-flex align-items-center gap-8">
              <i className="ph-bold ph-envelope text-main-600"></i>
              <a href={`mailto:${brand.email}`} className="text-main-600">
                {brand.email}
              </a>
            </div>
          )}
        </div>
      ),
      isShowing: brand.phone || brand.email,
    },
    {
      label: "Ana Web Sitesi",
      value: brand.websiteUrl ? (
        <a
          href={brand.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-main-600 d-flex align-items-center gap-8 hover-text-main-800"
        >
          <i className="ph-bold ph-globe"></i>
          {brand.websiteUrl}
        </a>
      ) : null,
      isShowing: brand.websiteUrl && brand.websiteUrl.trim() !== "",
    },
  ];

  return (
    <div className="tutor-details__content">
      <div className="border border-neutral-30 rounded-12 bg-white p-8 mt-24">
        <div className="border border-neutral-30 rounded-12 bg-main-25 p-32">
          {/* Tab Navigation */}
          <div className="d-flex mb-24">
            <button
              className={`px-24 py-12 rounded-8 fw-semibold me-8 ${
                activeTab === "campus"
                  ? "bg-main-600 text-white"
                  : "bg-neutral-100 text-neutral-700 hover-bg-neutral-200"
              }`}
              onClick={() => setActiveTab("campus")}
            >
              <i className="ph ph-buildings me-8"></i>
              Kampüs Bilgileri
            </button>
            <button
              className={`px-24 py-12 rounded-8 fw-semibold ${
                activeTab === "brand"
                  ? "bg-main-600 text-white"
                  : "bg-neutral-100 text-neutral-700 hover-bg-neutral-200"
              }`}
              onClick={() => setActiveTab("brand")}
            >
              <i className="ph ph-bank me-8"></i>
              Okul Grubu
            </button>
          </div>

          {/* Campus Tab Content */}
          {activeTab === "campus" && (
            <>
              <h4 className="mb-16">Kampüs Bilgileri</h4>
              <span className="d-block border border-neutral-30 my-24 border-dashed" />

              <ul className="tution-info-list bg-white rounded-8">
                {campusInfoItems
                  .filter((item) => item.isShowing)
                  .map((item, index) => (
                    <li
                      key={index}
                      className="d-flex align-items-start px-32 py-16"
                    >
                      <span className="w-50-percent fw-semibold text-neutral-700">
                        {item.label}
                      </span>
                      <span className="w-50-percent fw-normal text-neutral-500 text-md">
                        {item.value}
                      </span>
                    </li>
                  ))}
              </ul>
            </>
          )}

          {/* Brand Tab Content */}
          {activeTab === "brand" && (
            <>
              <h4 className="mb-16">Okul Grubu Bilgileri</h4>
              <span className="d-block border border-neutral-30 my-24 border-dashed" />

              <ul className="tution-info-list bg-white rounded-8">
                {brandInfoItems
                  .filter((item) => item.isShowing)
                  .map((item, index) => (
                    <li
                      key={index}
                      className="d-flex align-items-start px-32 py-16"
                    >
                      <span className="w-50-percent fw-semibold text-neutral-700">
                        {item.label}
                      </span>
                      <span className="w-50-percent fw-normal text-neutral-500 text-md">
                        {item.value}
                      </span>
                    </li>
                  ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
