import { useSchoolDetail } from "../context/school-detail-context";
import { CustomImage } from "@/components";

const tempUrl =
  "https://t4.ftcdn.net/jpg/02/14/31/63/360_F_214316329_vX8WM2z1DLYfzcyRxqOenc9SJV7gXOyJ.jpg";

const tempImgUrl =
  "https://img.freepik.com/premium-vector/school-icon-set-public-primary-high-school-vector-symbol-college-institute-building-sign-university-icon-black-filled-outlined-style_268104-13445.jpg";

export default function SchoolCoverImage() {
  const { currentSchool } = useSchoolDetail();

  if (!currentSchool) {
    return null;
  }

  const school = currentSchool;

  return (
    <div
      className="position-relative rounded-16 overflow-hidden my-24"
      style={{ height: "300px" }}
    >
      {/* Cover Image */}
      <CustomImage
        src={school.coverImageUrl}
        tempImage={tempUrl}
        alt={school.name || "Okul Görseli"}
        fill
        className="object-cover"
      />
      <div className="position-absolute inset-0 bg-gradient-to-t from-black-50 to-transparent"></div>

      {/* Okul Logosu - Sağ Üst Köşe */}
      <div className="position-absolute top-0 end-0 p-24">
        <div className="bg-white rounded-circle p-8 shadow-sm">
          <CustomImage
            src={school.logoUrl}
            tempImage={tempImgUrl}
            alt={school.name || "Okul Logosu"}
            width={80}
            height={80}
            className="rounded-circle aspect-ratio-1 object-cover"
          />
        </div>
      </div>

      <div className="position-absolute bottom-0 left-0 p-24 text-white">
        <h2 className="h3 fw-bold mb-8">{school.name}</h2>
        <p className="text-white text-opacity-90 mb-0">
          {school.institutionType?.displayName}
        </p>
      </div>
    </div>
  );
}
