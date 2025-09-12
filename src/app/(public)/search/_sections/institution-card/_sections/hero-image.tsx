import Image from "next/image";
import { useInstitutionCardContext } from "../_context";

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
      <div className="w-100 h-100 d-block">
        {institution.coverImageUrl ? (
          <Image
            src={institution.coverImageUrl}
            alt={institution.name ?? "Institution Cover"}
            fill
            className="scale-hover-item__img object-cover transition-3"
          />
        ) : (
          <div className="w-100 h-100 bg-main-600 d-flex align-items-center justify-content-center position-relative scale-hover-item__img transition-3">
            <div className="text-center text-white z-2">
              <i
                className="ph ph-graduation-cap mb-8"
                style={{ fontSize: height === "280px" ? "64px" : "32px" }}
              ></i>
              <p
                className={`fw-medium mb-0 ${
                  height === "280px" ? "" : "text-sm"
                }`}
              >
                Kurum Görseli
              </p>
            </div>
            <div className="position-absolute inset-0 bg-gradient-to-br from-main-600 to-main-800 opacity-90"></div>
          </div>
        )}
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
          >
            <i
              className={`ph ${
                institution.isFavorite ? "ph-fill" : ""
              } ph-heart ${height === "280px" ? "" : "text-sm"}`}
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
        </div>
      )}
    </div>
  );
};
