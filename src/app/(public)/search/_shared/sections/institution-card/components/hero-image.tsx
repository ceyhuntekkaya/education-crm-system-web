import { CustomImage, Icon } from "@/components";
import { useInstitutionCardContext } from "../context";

interface HeroImageProps {
  height?: string;
  showButtons?: boolean;
}

export const HeroImage = ({
  height = "180px",
  showButtons = true,
}: HeroImageProps) => {
  const { institution } = useInstitutionCardContext();

  return (
    <div
      className="position-relative rounded-16 overflow-hidden scale-hover-item"
      style={{ height }}
    >
      {/* Bookmark Indicator - Top Right of Image */}
      {institution.isFavorite && (
        <div
          className="position-absolute top-0 end-0 z-3"
          style={{
            transform: "translate(-8px, 8px)",
            filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.2))",
          }}
        >
          <Icon
            icon="ph-bold ph-bookmark-simple"
            size="sm"
            variant="outline-danger"
            hoverText="Listelerimde"
          />
        </div>
      )}

      <div className="w-100 h-100 d-block">
        <CustomImage
          src={institution.coverImageUrl}
          tempImage="https://t4.ftcdn.net/jpg/02/14/31/63/360_F_214316329_vX8WM2z1DLYfzcyRxqOenc9SJV7gXOyJ.jpg"
          alt={institution.name ?? "Institution Cover"}
          fill
          className="scale-hover-item__img object-cover transition-3"
        />
      </div>

      {/* Action Buttons */}
      {showButtons && (
        <div
          className={`position-absolute ${
            height === "280px"
              ? "inset-block-end-16 inset-inline-end-16"
              : "inset-block-end-12 inset-inline-end-12"
          } d-flex gap-${height === "280px" ? "8" : "6"}`}
        >
          <button
            className={`${
              height === "280px"
                ? "w-40 h-40 rounded-12"
                : "w-32 h-32 rounded-8"
            } d-flex align-items-center justify-content-center transition-3 backdrop-blur ${
              institution.isFavorite
                ? "bg-danger-600 text-white"
                : "bg-white bg-opacity-90 text-neutral-700 hover-bg-danger-50 hover-text-danger-600"
            }`}
            title={
              institution.isFavorite
                ? "Listelerimde mevcut"
                : "Listelerime ekle"
            }
          >
            <i
              className={`ph ${
                institution.isFavorite ? "ph-bold" : ""
              } ph-bookmark-simple ${height === "280px" ? "" : "text-sm"}`}
            ></i>
          </button>
          {institution.isSubscribed && (
            <button
              className={`${
                height === "280px"
                  ? "w-40 h-40 rounded-12"
                  : "w-32 h-32 rounded-8"
              } bg-success-600 text-white d-flex align-items-center justify-content-center backdrop-blur`}
            >
              <i
                className={`ph ph-check ${height === "280px" ? "" : "text-sm"}`}
              ></i>
            </button>
          )}
          {institution.appointment?.isActiveAppointment && (
            <button
              className={`${
                height === "280px"
                  ? "w-40 h-40 rounded-12"
                  : "w-32 h-32 rounded-8"
              } bg-primary-600 text-white d-flex align-items-center justify-content-center backdrop-blur`}
              title={`Randevu: ${
                institution.appointment.appointmentDate
                  ? new Date(
                      institution.appointment.appointmentDate
                    ).toLocaleDateString("tr-TR")
                  : ""
              }`}
            >
              <i
                className={`ph ph-calendar-check ${
                  height === "280px" ? "" : "text-sm"
                }`}
              ></i>
            </button>
          )}
          {institution.isActiveNotes && (
            <button
              className={`${
                height === "280px"
                  ? "w-40 h-40 rounded-12"
                  : "w-32 h-32 rounded-8"
              } bg-warning-600 text-white d-flex align-items-center justify-content-center backdrop-blur`}
              title="Aktif notlarınız var"
            >
              <i
                className={`ph ph-note ${height === "280px" ? "" : "text-sm"}`}
              ></i>
            </button>
          )}
        </div>
      )}
    </div>
  );
};
