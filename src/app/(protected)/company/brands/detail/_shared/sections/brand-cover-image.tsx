import { useBrandDetail } from "../context/brand-detail-context";
import { CustomCard, CustomImage } from "@/components/ui";

export default function BrandCoverImage() {
  const { currentBrand } = useBrandDetail();

  if (!currentBrand?.coverImageUrl) {
    return (
      <CustomCard className="p-0 overflow-hidden">
        <div
          className="w-100 bg-gradient-primary-light d-flex align-items-center justify-content-center"
          style={{ height: "200px" }}
        >
          <div className="text-center">
            <i
              className="ph ph-buildings"
              style={{ fontSize: "48px", color: "#6366f1" }}
            />
            <p className="mb-0 mt-12 text-neutral-600">
              Marka kapak görseli mevcut değil
            </p>
          </div>
        </div>
      </CustomCard>
    );
  }

  return (
    <CustomCard>
      <div className="position-relative" style={{ height: "250px" }}>
        <CustomImage
          src={currentBrand.coverImageUrl}
          alt={currentBrand.name || "Marka kapak görseli"}
          fill
          className="cover-img rounded-12"
        />
        <div
          className="position-absolute bottom-0 start-0 end-0 p-24 rounded-12"
          style={{
            background:
              "linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.6) 50%, transparent 100%)",
          }}
        >
          <h2
            className="text-white mb-0 fw-bold"
            style={{ textShadow: "0 2px 8px rgba(0, 0, 0, 0.4)" }}
          >
            {currentBrand.name}
          </h2>
          {currentBrand.description && (
            <p
              className="text-white mb-0 mt-8"
              style={{
                fontSize: "14px",
                lineHeight: "1.6",
                textShadow: "0 1px 4px rgba(0, 0, 0, 0.6)",
              }}
            >
              {currentBrand.description}
            </p>
          )}
        </div>
      </div>
    </CustomCard>
  );
}
