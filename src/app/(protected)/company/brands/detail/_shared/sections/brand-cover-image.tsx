import { useBrandDetail } from "../context/brand-detail-context";
import { CoverImage } from "@/components/ui";

export default function BrandCoverImage() {
  const { currentBrand } = useBrandDetail();

  return (
    <CoverImage
      coverImageUrl={currentBrand?.coverImageUrl}
      title={currentBrand?.name || "Marka Adı"}
      subtitle={currentBrand?.description}
      height="250px"
      useCard={true}
      borderRadius="rounded-12"
      emptyStateMessage="Marka kapak görseli mevcut değil"
      emptyStateIcon="ph ph-buildings"
      contentPosition="bottom-left"
      showGradient={true}
    />
  );
}
