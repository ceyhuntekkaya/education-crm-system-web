import { CustomCard } from "@/components/ui";
import { useSchoolDetailContext } from "../context/school-detail-context";

export default function SchoolBrandDetail() {
  const { currentSchool } = useSchoolDetailContext();

  if (!currentSchool) {
    return (
      <CustomCard title="Marka Bilgileri">
        <p className="text-neutral-500">Marka bilgileri henüz mevcut değil.</p>
      </CustomCard>
    );
  }

  const school = currentSchool;
  const brand = school.campus?.brand;

  // Marka bilgisi yoksa component'i render etme
  if (!brand) {
    return null;
  }

  const brandInfoItems = [
    {
      label: "Marka Adı",
      value: <span className="text-main-600 fw-semibold">{brand.name}</span>,
      isShowing: brand.name && brand.name.trim() !== "",
    },
    {
      label: "Açıklama",
      value: brand.description,
      isShowing: brand.description && brand.description.trim() !== "",
    },
    {
      label: "İletişim",
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
      label: "Web Sitesi",
      value: brand.websiteUrl ? (
        <a
          href={brand.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-main-600"
        >
          {brand.websiteUrl}
        </a>
      ) : null,
      isShowing: brand.websiteUrl && brand.websiteUrl.trim() !== "",
    },
  ];

  // Eğer görüntülenecek herhangi bir bilgi yoksa boş state göster
  const visibleItems = brandInfoItems.filter((item) => item.isShowing);

  if (visibleItems.length === 0) {
    return null;
  }

  return <CustomCard title="Marka Bilgileri" items={brandInfoItems} />;
}
