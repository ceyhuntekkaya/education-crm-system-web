import Image from "next/image";
import { CustomCard } from "@/components/ui";
import { renderStars } from "@/utils/rating-utils";
import { useSchoolDetail } from "../context/school-detail-context";

export default function SchoolCampusDetail() {
  const { currentSchool } = useSchoolDetail();

  if (!currentSchool) {
    return (
      <CustomCard title="Kampüs Bilgileri">
        <p className="text-neutral-500">Kampüs bilgileri henüz mevcut değil.</p>
      </CustomCard>
    );
  }

  const school = currentSchool;
  const campus = school.campus;

  if (!campus) {
    return (
      <CustomCard title="Kampüs Bilgileri">
        <p className="text-neutral-500">Kampüs bilgisi bulunmamaktadır.</p>
      </CustomCard>
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

  // Eğer görüntülenecek herhangi bir bilgi yoksa boş state göster
  const visibleItems = campusInfoItems.filter((item) => item.isShowing);

  if (visibleItems.length === 0) {
    return (
      <CustomCard title="Kampüs Bilgileri">
        <p className="text-neutral-500">Kampüs bilgileri henüz mevcut değil.</p>
      </CustomCard>
    );
  }

  return <CustomCard title="Kampüs Bilgileri" items={campusInfoItems} />;
}
