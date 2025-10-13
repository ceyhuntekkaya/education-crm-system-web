import Image from "next/image";
import { useSchoolDetail } from "../context/school-detail-context";

export default function SchoolCampusDetail() {
  const { currentSchool } = useSchoolDetail();

  if (!currentSchool) {
    return null;
  }

  const school = currentSchool;
  const campus = school.campus;

  const renderStars = (rating: number): JSX.Element => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <div className="flex-align gap-4">
        {[...Array(fullStars)].map((_, i) => (
          <span
            key={`full-${i}`}
            className="text-lg fw-medium text-warning-600 d-flex"
          >
            <i className="ph-fill ph-star" />
          </span>
        ))}
        {hasHalfStar && (
          <span className="text-lg fw-medium text-warning-600 d-flex">
            <i className="ph-fill ph-star-half" />
          </span>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <span
            key={`empty-${i}`}
            className="text-lg fw-medium text-neutral-300 d-flex"
          >
            <i className="ph-fill ph-star" />
          </span>
        ))}
      </div>
    );
  };

  if (!campus) {
    return (
      <div className="tutor-details__content">
        <div className="border border-neutral-30 rounded-12 bg-white p-8 mt-24">
          <div className="border border-neutral-30 rounded-12 bg-main-25 p-32">
            <h4 className="mb-16">Kampüs Bilgileri</h4>
            <span className="d-block border border-neutral-30 my-24 border-dashed" />
            <p className="text-neutral-500">Kampüs bilgisi bulunmamaktadır.</p>
          </div>
        </div>
      </div>
    );
  }

  const campusInfoItems = [
    {
      label: "Kampüs ID",
      value: <span className="text-neutral-600 fw-medium">#{campus.id}</span>,
      isShowing: campus.id && campus.id > 0,
    },
    {
      label: "Kampüs Adı",
      value: <span className="text-main-600 fw-semibold">{campus.name}</span>,
      isShowing: campus.name && campus.name.trim() !== "",
    },
    {
      label: "Kampüs Slug",
      value: (
        <span className="text-neutral-500 font-mono text-sm">
          {campus.slug}
        </span>
      ),
      isShowing: campus.slug && campus.slug.trim() !== "",
    },
    {
      label: "Kampüs Logosu",
      value: campus.logoUrl ? (
        <Image
          src={campus.logoUrl}
          alt={campus.name || ""}
          width={60}
          height={60}
          className="rounded-8 object-cover"
        />
      ) : null,
      isShowing: campus.logoUrl && campus.logoUrl.trim() !== "",
    },
    {
      label: "Kampüs Değerlendirme",
      value: (
        <div className="d-flex flex-column gap-8">
          <div className="d-flex align-items-center gap-8">
            {renderStars(campus.ratingAverage || 0)}
            <span className="text-md text-neutral-700 ms-8 fw-semibold">
              {campus.ratingAverage}
            </span>
          </div>
        </div>
      ),
      isShowing: campus.ratingAverage && campus.ratingAverage > 0,
    },
    {
      label: "Kampüsteki Okul Sayısı",
      value: (
        <div className="d-flex align-items-center gap-8">
          <i className="ph-bold ph-buildings text-main-600"></i>
          <span className="fw-semibold text-main-600">
            {campus.schoolCount} okul
          </span>
        </div>
      ),
      isShowing: campus.schoolCount && campus.schoolCount > 0,
    },
    {
      label: "Abonelik Durumu",
      value: (
        <div className="d-flex align-items-center gap-8">
          {campus.isSubscribed ? (
            <>
              <i className="ph-bold ph-check-circle text-success-600"></i>
              <span className="text-success-600 fw-semibold">Abone</span>
              <span className="px-8 py-2 bg-success-50 text-success-700 rounded-4 text-xs fw-medium">
                Premium Üye
              </span>
            </>
          ) : (
            <>
              <i className="ph-bold ph-x-circle text-neutral-500"></i>
              <span className="text-neutral-500">Abone Değil</span>
            </>
          )}
        </div>
      ),
      isShowing: typeof campus.isSubscribed === "boolean",
    },
  ];

  return (
    <div className="tutor-details__content">
      <div className="border border-neutral-30 rounded-12 bg-white p-8 mt-24">
        <div className="border border-neutral-30 rounded-12 bg-main-25 p-32">
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
        </div>
      </div>
    </div>
  );
}
