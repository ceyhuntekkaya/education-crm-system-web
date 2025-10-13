import { useSchoolDetail } from "../context/school-detail-context";

export default function SchoolBrandDetail() {
  const { currentSchool } = useSchoolDetail();

  if (!currentSchool) {
    return null;
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

  return (
    <div className="tutor-details__content">
      <div className="border border-neutral-30 rounded-12 bg-white p-8 mt-24">
        <div className="border border-neutral-30 rounded-12 bg-main-25 p-32">
          <h4 className="mb-16">Kurum Bilgileri</h4>
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
        </div>
      </div>
    </div>
  );
}
