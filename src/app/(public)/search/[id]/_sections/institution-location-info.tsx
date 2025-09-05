interface InstitutionLocationInfoProps {
  school: any;
  campus: any;
}

export default function InstitutionLocationInfo({
  school,
  campus,
}: InstitutionLocationInfoProps) {
  return (
    <div className="tutor-details__content">
      <div className="border border-neutral-30 rounded-12 bg-white p-8 mt-24">
        <div className="border border-neutral-30 rounded-12 bg-main-25 p-32">
          <h4 className="mb-16">Konum ve Bölge Bilgileri</h4>
          <span className="d-block border border-neutral-30 my-24 border-dashed" />

          {/* İl Bilgileri */}
          <h5 className="mb-16 text-main-600">İl Bilgileri</h5>
          <ul className="tution-info-list bg-white rounded-8 mb-32">
            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                İl Adı
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                <span className="text-main-600 fw-semibold">
                  {school.campus.province.name}
                </span>
              </span>
            </li>

            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                İl Kodu
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                {school.campus.province.code}
              </span>
            </li>

            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                Plaka Kodu
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                <span className="bg-main-50 text-main-600 px-12 py-6 rounded-8 fw-semibold">
                  {school.campus.province.plateCode}
                </span>
              </span>
            </li>

            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                Büyükşehir mi?
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                <span
                  className={`px-12 py-6 rounded-8 text-sm fw-medium ${
                    school.campus.province.isMetropolitan
                      ? "bg-success-50 text-success-600"
                      : "bg-neutral-50 text-neutral-600"
                  }`}
                >
                  {school.campus.province.isMetropolitan ? "Evet" : "Hayır"}
                </span>
              </span>
            </li>

            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                İldeki Okul Sayısı
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                <span className="text-primary-600 fw-semibold">
                  {school.campus.province.schoolCount?.toLocaleString()} okul
                </span>
              </span>
            </li>
          </ul>

          {/* İlçe Bilgileri */}
          <h5 className="mb-16 text-success-600">İlçe Bilgileri</h5>
          <ul className="tution-info-list bg-white rounded-8 mb-32">
            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                İlçe Adı
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                <span className="text-success-600 fw-semibold">
                  {school.campus.district.name}
                </span>
              </span>
            </li>

            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                İlçe Kodu
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                {school.campus.district.code}
              </span>
            </li>

            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                İlçe Türü
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                <span className="bg-info-50 text-info-600 px-12 py-6 rounded-8 text-sm fw-medium">
                  {school.campus.district.districtType}
                </span>
              </span>
            </li>

            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                Merkez İlçe mi?
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                <span
                  className={`px-12 py-6 rounded-8 text-sm fw-medium ${
                    school.campus.district.isCentral
                      ? "bg-warning-50 text-warning-600"
                      : "bg-neutral-50 text-neutral-600"
                  }`}
                >
                  {school.campus.district.isCentral ? "Evet" : "Hayır"}
                </span>
              </span>
            </li>

            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                İlçedeki Okul Sayısı
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                <span className="text-success-600 fw-semibold">
                  {school.campus.district.schoolCount?.toLocaleString()} okul
                </span>
              </span>
            </li>

            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                Sosyoekonomik Seviye
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                <span className="bg-primary-50 text-primary-600 px-12 py-6 rounded-8 fw-semibold">
                  {school.campus.district.socioeconomicLevel === "UPPER_MIDDLE"
                    ? "Üst Orta Gelir"
                    : school.campus.district.socioeconomicLevel}
                </span>
              </span>
            </li>
          </ul>

          {/* Kampüs Konum Özeti */}
          <h5 className="mb-16 text-warning-600">Kampüs Konum Özeti</h5>
          <ul className="tution-info-list bg-white rounded-8">
            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                Genel Konum
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                <span className="text-main-600 fw-medium">
                  {school.campus.province.name} ili,{" "}
                  {school.campus.district.name} ilçesi
                </span>
              </span>
            </li>

            <li className="d-flex align-items-start px-32 py-16">
              <span className="w-50-percent fw-semibold text-neutral-700">
                Bölgedeki Eğitim
              </span>
              <span className="w-50-percent fw-normal text-neutral-500 text-md">
                İlçede{" "}
                <span className="text-success-600 fw-semibold">
                  {school.campus.district.schoolCount}
                </span>{" "}
                okul bulunmaktadır
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
