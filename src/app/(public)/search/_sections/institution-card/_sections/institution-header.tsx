import Image from "next/image";
import { useInstitutionCardContext } from "../_context";

interface InstitutionHeaderProps {
  logoSize?: number;
}

export const InstitutionHeader = ({
  logoSize = 48,
}: InstitutionHeaderProps) => {
  const { institution } = useInstitutionCardContext();
  const isLarge = logoSize > 48;

  return (
    <div
      className={`d-flex align-items-start gap-${isLarge ? "16" : "12"} ${
        isLarge ? "mb-20" : "mb-16"
      }`}
    >
      <div
        className={`w-${logoSize} h-${logoSize} ${
          isLarge ? "rounded-16" : "rounded-12"
        } overflow-hidden flex-shrink-0 bg-neutral-50 border`}
      >
        {institution.logoUrl ? (
          <Image
            src={institution.logoUrl}
            alt={`${institution.name ?? "Institution"} Logo`}
            width={logoSize}
            height={logoSize}
            className="object-cover"
          />
        ) : (
          <div className="w-100 h-100 bg-main-50 d-flex align-items-center justify-content-center">
            <i
              className="ph ph-buildings text-main-400"
              style={{ fontSize: isLarge ? "28px" : "16px" }}
            ></i>
          </div>
        )}
      </div>
      <div className="flex-grow-1">
        <h3
          className={`${
            isLarge ? "h5 mb-8" : "h6 mb-6"
          } text-heading fw-bold line-clamp-2`}
        >
          {institution.name ?? "İsim Yok"}
        </h3>
        {institution.campusName && (
          <p
            className={`${
              isLarge ? "text-sm" : "text-xs"
            } text-neutral-600 mb-0 d-flex align-items-center gap-4`}
          >
            <i className={`ph ph-map-pin ${isLarge ? "text-xs" : ""}`}></i>
            {institution.campusName}
          </p>
        )}
      </div>
    </div>
  );
};
