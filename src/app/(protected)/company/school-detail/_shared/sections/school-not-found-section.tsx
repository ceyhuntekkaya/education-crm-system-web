interface SchoolNotFoundSectionProps {
  refreshSchool: () => void;
}

export default function SchoolNotFoundSection({
  refreshSchool,
}: SchoolNotFoundSectionProps) {
  return (
    <div className="border border-neutral-30 rounded-12 bg-white p-8 mb-24">
      <div className="border border-neutral-30 rounded-12 bg-warning-25 p-32">
        <h4 className="mb-16 text-warning-600">
          <i className="ph-bold ph-info me-8"></i>
          Okul Bilgisi Bulunamadı
        </h4>
        <span className="d-block border border-neutral-30 my-20 border-dashed" />
        <p className="text-warning-600 mb-16">
          Okul seçilmemiş veya okul bilgisi bulunamadı. Lütfen bir okul seçin
          veya okul listesini kontrol edin.
        </p>
        <div className="d-flex align-items-center gap-12">
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
    </div>
  );
}
