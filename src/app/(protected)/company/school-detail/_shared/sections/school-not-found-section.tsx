import { useSchoolDetailContext } from "../context/school-detail-context";
import { CustomCard } from "@/components/ui";

export default function SchoolNotFoundSection() {
  const { selectedSchool } = useSchoolDetailContext();

  const showNoSchoolMessage = !selectedSchool;

  return (
    <CustomCard
      title="Okul Detayı"
      subtitle="Okul bilgilerini detaylı olarak görüntüleyin"
      isEmpty={true}
      emptyMessage={
        showNoSchoolMessage
          ? "Lütfen önce bir okul seçin"
          : "Okul bilgisi bulunamadı"
      }
      emptyDescription={
        showNoSchoolMessage
          ? "Okul bilgilerini görüntülemek için yan menüden bir okul seçmeniz gerekmektedir."
          : undefined
      }
      emptyIcon={showNoSchoolMessage ? "ph-buildings" : "ph-info"}
    />
  );
}
