import { useSchoolDetailContext } from "../context/school-detail-context";
import { CustomCard } from "@/components/ui";

export default function SchoolNotFoundSection() {
  const { selectedSchool } = useSchoolDetailContext();

  const showNoSchoolMessage = !selectedSchool;

  return (
    <CustomCard
      title="Kurum Detayı"
      subtitle="Kurum bilgilerini detaylı olarak görüntüleyin"
      isEmpty={true}
      emptyMessage={
        showNoSchoolMessage
          ? "Lütfen önce bir Kurum seçin"
          : "Kurum bilgisi bulunamadı"
      }
      emptyDescription={
        showNoSchoolMessage
          ? "Kurum bilgilerini görüntülemek için yan menüden bir Kurum seçmeniz gerekmektedir."
          : undefined
      }
      emptyIcon={showNoSchoolMessage ? "ph-buildings" : "ph-info"}
    />
  );
}
