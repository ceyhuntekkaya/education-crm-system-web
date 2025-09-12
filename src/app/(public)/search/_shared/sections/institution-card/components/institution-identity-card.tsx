import { useInstitutionCardContext } from "../context";
import { InstitutionHeader } from "./institution-header";
import { LocationInfo } from "./location-info";

export const InstitutionIdentityCard = () => {
  const { institution } = useInstitutionCardContext();

  return (
    <div className="bg-white border rounded-16 p-24 box-shadow-sm">
      {/* Logo ve Başlık */}
      <InstitutionHeader logoSize={64} />

      {/* Bilgi Kartcıkları */}
      <div className="row g-12">
        {/* Lokasyon */}
        <LocationInfo />

        {/* Puan ve Fiyat */}
        <div className="col-6">
          <div className="text-center p-16 bg-warning-25 rounded-12">
            <div className="d-flex align-items-center justify-content-center gap-4 mb-4">
              <i className="ph-fill ph-star text-warning-600"></i>
              <span className="fw-bold text-warning-800">
                {institution.ratingAverage ?? "-"}
              </span>
            </div>
            <p className="text-xs text-warning-700 mb-0">
              {institution.ratingCount ?? 0} değerlendirme
            </p>
          </div>
        </div>

        <div className="col-6">
          {institution.formattedPrice && (
            <div className="text-center p-16 bg-main-25 rounded-12">
              <div className="fw-bold text-main-800 mb-4">
                {institution.formattedPrice}
              </div>
              <p className="text-xs text-main-600 mb-0">aylık ücret</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
