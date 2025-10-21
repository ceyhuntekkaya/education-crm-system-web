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
    <CustomCard className="p-0 overflow-hidden">
      <div className="position-relative" style={{ height: "200px" }}>
        <CustomImage
          src={currentBrand.coverImageUrl}
          alt={currentBrand.name || "Marka kapak görseli"}
          fill
          style={{ objectFit: "cover" }}
          className="rounded-top-12"
        />
        <div className="position-absolute bottom-0 start-0 end-0 p-24 bg-gradient-dark-overlay">
          <h2 className="text-white mb-0">{currentBrand.name}</h2>
          {currentBrand.description && (
            <p className="text-white-75 mb-0 mt-8">
              {currentBrand.description}
            </p>
          )}
        </div>
      </div>
    </CustomCard>
  );
}
