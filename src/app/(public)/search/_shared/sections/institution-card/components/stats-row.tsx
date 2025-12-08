import { useInstitutionCardContext } from "../context";
import { getAppointmentInfo } from "../utils";

export const StatsRow = () => {
  const { institution } = useInstitutionCardContext();
  const appointmentInfo = getAppointmentInfo(institution);

  const hasRating = !!(
    institution.ratingAverage && institution.ratingAverage > 0
  );
  const hasPrice = !!institution.formattedPrice;

  return (
    <div className="mb-16">
      {/* Ana Stats Row - sadece rating veya fiyat varsa göster */}
      {(hasRating || hasPrice) && (
        <div className="row g-8 mb-12">
          {hasRating && (
            <div className={hasPrice ? "col-6" : "col-12"}>
              <div className="text-center p-8 bg-warning-25 rounded-8">
                <div className="d-flex align-items-center justify-content-center gap-4 mb-2">
                  <i className="ph-fill ph-star text-warning-600 text-sm"></i>
                  <span className="text-sm fw-bold text-warning-800">
                    {institution.ratingAverage}
                  </span>
                </div>
                <p className="text-xs text-warning-700 mb-0">
                  ({institution.ratingCount ?? 0})
                </p>
              </div>
            </div>
          )}
          {hasPrice && (
            <div className={hasRating ? "col-6" : "col-12"}>
              <div className="text-center p-8 bg-main-25 rounded-8">
                <div className="text-sm fw-bold text-main-800 mb-2">
                  {institution.formattedPrice}
                </div>
                <p className="text-xs text-main-600 mb-0">aylık</p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Status Indicators */}
      {(appointmentInfo || institution.isActiveNotes) && (
        <div className="d-flex align-items-center justify-content-center gap-8">
          {appointmentInfo && (
            <div className="d-flex flex-column align-items-center gap-2 px-8 py-6 bg-primary-25 rounded-6">
              <div className="d-flex align-items-center gap-4">
                <i className="ph ph-calendar-check text-primary-600 text-xs"></i>
                <span className="text-xs text-primary-700 fw-medium">
                  Randevu
                </span>
              </div>
              <div className="d-flex align-items-center gap-6 text-center">
                <div className="d-flex align-items-center gap-2">
                  <i
                    className="ph ph-calendar text-primary-500"
                    style={{ fontSize: "10px" }}
                  ></i>
                  <span className="text-xs text-primary-600 fw-medium">
                    {appointmentInfo.date}
                  </span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <i
                    className="ph ph-clock text-primary-500"
                    style={{ fontSize: "10px" }}
                  ></i>
                  <span className="text-xs text-primary-600 fw-medium">
                    {appointmentInfo.time}
                  </span>
                </div>
              </div>
            </div>
          )}
          {institution.isActiveNotes && (
            <div className="d-flex align-items-center gap-4 px-8 py-4 bg-warning-25 rounded-6">
              <i className="ph ph-note text-warning-600 text-xs"></i>
              <span className="text-xs text-warning-700 fw-medium">Notlar</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
