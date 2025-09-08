import { CampusDto, SchoolDto } from "@/types";
import Image from "next/image";
import { formatViewCount } from "../_utils";
import { ContactForm } from ".";

interface InstitutionSidebarProps {
  school: SchoolDto;
  campus: CampusDto;
  renderStars: (rating: number) => JSX.Element;
}

const tempImgUrl =
  "https://static.vecteezy.com/system/resources/previews/004/641/880/non_2x/illustration-of-high-school-building-school-building-free-vector.jpg";

export default function InstitutionSidebar({
  school,
  campus,
  renderStars,
}: InstitutionSidebarProps) {
  const socialMediaLinks = [
    {
      url: campus.facebookUrl,
      icon: "ph-facebook-logo",
      platform: "Facebook",
    },
    {
      url: campus.twitterUrl,
      icon: "ph-twitter-logo",
      platform: "Twitter",
    },
    {
      url: campus.instagramUrl,
      icon: "ph-instagram-logo",
      platform: "Instagram",
    },
    {
      url: campus.linkedinUrl,
      icon: "ph-linkedin-logo",
      platform: "LinkedIn",
    },
  ];

  const quickInfoStats = [
    {
      value: school.currentStudentCount,
      label: "Öğrenci",
      colorClass: "text-main-600",
    },
    {
      value: school.classSizeAverage,
      label: "Sınıf Ort.",
      colorClass: "text-success-600",
    },
    {
      value: formatViewCount(school.viewCount),
      label: "Görüntülenme",
      colorClass: "text-warning-600",
    },
    {
      value: school.likeCount,
      label: "Beğeni",
      colorClass: "text-danger-600",
    },
  ];

  return (
    <div className="col-lg-4">
      {/* Profile Card */}
      <div className="border border-neutral-30 rounded-12 bg-white p-8">
        <div className="border border-neutral-30 rounded-12 bg-main-25 p-32">
          {/* Logo */}
          <div className="p-16 border border-neutral-50 rounded-circle aspect-ratio-1 max-w-150 max-h-150 mx-auto">
            <div className="position-relative">
              <Image
                src={tempImgUrl || school.logoUrl}
                alt={school.name || "Okul Logosu"}
                width={150}
                height={150}
                className="rounded-circle bg-dark-yellow aspect-ratio-1 cover-img"
              />
              <span className="w-32 h-32 bg-success-600 rounded-circle border border-main-25 border-3 flex-center text-white position-absolute inset-block-end-0 inset-inline-end-0 me-4">
                <i className="ph-bold ph-check" />
              </span>
            </div>
          </div>

          <h4 className="mb-16 text-center mt-40">{school.name}</h4>

          <div className="flex-center gap-10 flex-wrap my-20">
            <span className="text-neutral-500 text-md">
              ID: <span className="text-main-600 fw-medium">#{school.id}</span>
            </span>
            <span className="w-4 h-4 bg-main-600 rounded-circle" />
            <span className="text-neutral-500 text-md">
              Tür:{" "}
              <span className="text-main-600 fw-medium">
                {school.institutionType?.displayName}
              </span>
            </span>
            <span className="w-4 h-4 bg-main-600 rounded-circle" />
            <div className="flex-align gap-4">
              {renderStars(school.ratingAverage || 0)}
              <span className="text-md text-neutral-700 ms-8">
                {school.ratingAverage}
                <span className="text-neutral-100">
                  {" "}
                  ({school.ratingCount})
                </span>
              </span>
            </div>
          </div>

          {/* Hızlı Bilgiler */}
          <div className="row g-8 mb-20">
            {quickInfoStats.map((stat, index) => (
              <div key={index} className="col-6 mb-16">
                <div className="text-center p-12 bg-white rounded-8 border border-neutral-100">
                  <div className={`text-lg fw-bold ${stat.colorClass} mb-4`}>
                    {stat.value}
                  </div>
                  <p className="text-xs text-neutral-600 mb-0">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Social Media Links */}
          <ul className="social-list flex-center gap-16 mt-28">
            {socialMediaLinks.map((social, index) => (
              <li key={index} className="social-list__item">
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-main-600 text-xl hover-text-white w-40 h-40 rounded-circle border border-main-600 hover-bg-main-600 flex-center"
                  aria-label={social.platform}
                >
                  <i className={`ph-bold ${social.icon}`} />
                </a>
              </li>
            ))}
          </ul>

          <span className="d-block border border-neutral-30 my-20 border-dashed" />

          {/* Contact Information */}
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
                {campus.district?.name ? `, ${campus.district.name}` : ""}
                {campus.province?.name ? `, ${campus.province.name}` : ""}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <ContactForm schoolId={school.id} campusId={campus.id} />
    </div>
  );
}
