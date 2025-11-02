import { CustomCard } from "@/components/ui";
import { useSchoolDetailContext } from "../context/school-detail-context";

export default function SchoolBrandDetail() {
  const { currentSchool } = useSchoolDetailContext();

  if (!currentSchool) {
    return (
      <CustomCard title="Kurum Bilgileri">
        <p className="text-neutral-500">Kurum bilgileri henüz mevcut değil.</p>
      </CustomCard>
    );
  }

  const school = currentSchool;
  // School verilerini kullanarak brand benzeri bilgileri oluşturuyoruz
  const brandInfoItems = [
    {
      label: "Kurum Adı",
      value: <span className="text-main-600 fw-semibold">{school.name}</span>,
      isShowing: school.name && school.name.trim() !== "",
    },
    {
      label: "Açıklama",
      value: school.description,
      isShowing: school.description && school.description.trim() !== "",
    },
    {
      label: "İletişim",
      value: (
        <div className="d-flex flex-column gap-8">
          {school.phone && (
            <div className="d-flex align-items-center gap-8">
              <i className="ph-bold ph-phone text-main-600"></i>
              <span>{school.phone}</span>
            </div>
          )}
          {school.email && (
            <div className="d-flex align-items-center gap-8">
              <i className="ph-bold ph-envelope text-main-600"></i>
              <a href={`mailto:${school.email}`} className="text-main-600">
                {school.email}
              </a>
            </div>
          )}
        </div>
      ),
      isShowing: school.phone || school.email,
    },
    {
      label: "Türü",
      value: school.institutionType?.displayName,
      isShowing:
        school.institutionType?.displayName &&
        school.institutionType.displayName.trim() !== "",
    },
    {
      label: "Kampüs",
      value: school.campus?.name,
      isShowing: school.campus?.name && school.campus.name.trim() !== "",
    },
  ];

  // Eğer görüntülenecek herhangi bir bilgi yoksa boş state göster
  const visibleItems = brandInfoItems.filter((item) => item.isShowing);

  if (visibleItems.length === 0) {
    return (
      <CustomCard title="Kurum Bilgileri">
        <p className="text-neutral-500">Kurum bilgileri henüz mevcut değil.</p>
      </CustomCard>
    );
  }

  return <CustomCard title="Kurum Bilgileri" items={brandInfoItems} />;
}
