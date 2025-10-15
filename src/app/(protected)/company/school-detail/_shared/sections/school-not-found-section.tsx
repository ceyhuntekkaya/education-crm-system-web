import { useSchoolDetail } from "../context/school-detail-context";
import { CustomCard } from "@/components/ui";

export default function SchoolNotFoundSection() {
  const { refreshSchool } = useSchoolDetail();

  return (
    <CustomCard
      title="Okul Bilgisi Bulunamadı"
      subtitle="Okul seçilmemiş veya bilgi mevcut değil"
      headerAction={<i className="ph-bold ph-warning text-warning-600"></i>}
    >
      <div className="text-center py-24">
        <div className="mb-24">
          <i className="ph ph-magnifying-glass-minus text-6xl text-warning-500 mb-16 d-block"></i>
          <h5 className="text-warning-600 mb-12">Okul Bilgisi Bulunamadı</h5>
          <p className="text-neutral-600 mb-24">
            Okul seçilmemiş veya okul bilgisi bulunamadı. Lütfen bir okul seçin
            veya okul listesini kontrol edin.
          </p>
        </div>

        <div className="d-flex justify-content-center align-items-center gap-12">
          <button
            onClick={() => window.history.back()}
            className="btn btn-outline-warning btn-sm"
          >
            <i className="ph-bold ph-arrow-left me-8"></i>
            Geri Dön
          </button>
          <button onClick={refreshSchool} className="btn btn-warning btn-sm">
            <i className="ph-bold ph-arrows-clockwise me-8"></i>
            Yeniden Dene
          </button>
        </div>
      </div>
    </CustomCard>
  );
}
