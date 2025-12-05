import { useSchoolDetailContext } from "../context/school-detail-context";
import { CoverImage } from "@/components/ui";

const tempCoverUrl =
  "https://t4.ftcdn.net/jpg/02/14/31/63/360_F_214316329_vX8WM2z1DLYfzcyRxqOenc9SJV7gXOyJ.jpg";

const tempLogoUrl =
  "https://img.freepik.com/premium-vector/school-icon-set-public-primary-high-school-vector-symbol-college-institute-building-sign-university-icon-black-filled-outlined-style_268104-13445.jpg";

export default function SchoolCoverImage() {
  const { currentSchool } = useSchoolDetailContext();

  return (
    <CoverImage
      coverImageUrl={currentSchool?.coverImageUrl}
      logoUrl={currentSchool?.logoUrl}
      title={currentSchool?.name || "Kurum Adı"}
      subtitle={currentSchool?.institutionType?.displayName}
      fallbackCoverImage={tempCoverUrl}
      fallbackLogoImage={tempLogoUrl}
      height="250px"
      logoSize={80}
      useCard={true}
      borderRadius="rounded-12"
      emptyStateMessage="Kurum görseli henüz mevcut değil"
      emptyStateIcon="ph ph-image"
      logoPosition="top-right"
      contentPosition="bottom-left"
      showGradient={true}
    />
  );
}
