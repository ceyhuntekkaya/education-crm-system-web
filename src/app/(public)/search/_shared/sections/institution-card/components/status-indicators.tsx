import { useInstitutionCardContext } from "../context";

export const StatusIndicators = () => {
  const { institution } = useInstitutionCardContext();

  const hasAnyStatus =
    institution.appointment?.isActiveAppointment ||
    institution.isActiveNotes ||
    institution.isFavorite ||
    institution.isSubscribed;

  if (!hasAnyStatus) return null;

  return (
    <div className="mb-24">
      <div className="d-flex align-items-center gap-12 mb-8">
        <div className="w-8 h-8 rounded-circle bg-info-600"></div>
        <h4 className="h6 mb-0 text-heading fw-bold">Durum Bilgileri</h4>
      </div>
      <div className="ps-20">
        <div className="d-flex flex-wrap gap-8">
          {institution.isFavorite && (
            <div className="d-flex align-items-center gap-8 px-12 py-8 bg-danger-25 rounded-8">
              <i className="ph ph-bold ph-bookmark-simple text-danger-600"></i>
              <span className="text-sm text-danger-700 fw-medium">
                Listelerimde
              </span>
            </div>
          )}

          {institution.appointment?.isActiveAppointment && (
            <div className="d-flex align-items-center gap-8 px-12 py-8 bg-primary-25 rounded-8">
              <i className="ph ph-calendar-check text-primary-600"></i>
              <div className="d-flex flex-column">
                <span className="text-sm text-primary-700 fw-medium">
                  Aktif Randevu
                </span>
                {institution.appointment.appointmentDate && (
                  <span className="text-xs text-primary-600">
                    {new Date(
                      institution.appointment.appointmentDate
                    ).toLocaleDateString("tr-TR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                )}
              </div>
            </div>
          )}

          {institution.isActiveNotes && (
            <div className="d-flex align-items-center gap-8 px-12 py-8 bg-warning-25 rounded-8">
              <i className="ph ph-note text-warning-600"></i>
              <span className="text-sm text-warning-700 fw-medium">
                Aktif Notlar
              </span>
            </div>
          )}

          {institution.isSubscribed && (
            <div className="d-flex align-items-center gap-8 px-12 py-8 bg-success-25 rounded-8">
              <i className="ph ph-check text-success-600"></i>
              <span className="text-sm text-success-700 fw-medium">
                Takip Ediliyor
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
