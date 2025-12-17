import { Icon } from "@/components";
import { useInstitutionCardContext } from "../context";
import {
  HeroImage,
  InstitutionIdentityCard,
  Highlights,
  Properties,
  AgeRangeInfo,
  Badges,
  Description,
  Actions,
  StatusIndicators,
} from "../components";

export const ExpandedSection = () => {
  const { onCardClick } = useInstitutionCardContext();

  return (
    <div className="content-fade-in position-relative p-8 p-md-16">
      {/* Close Button - Top Right */}
      <button
        className="position-absolute top-0 end-0 z-3 p-8 p-md-12 bg-transparent border-0 cursor-pointer d-flex align-items-center justify-content-center"
        onClick={onCardClick}
        type="button"
      >
        <Icon icon="ph-x" variant="inline" size="md" />
      </button>

      <div className="d-flex flex-column flex-md-row gap-24">
        {/* Sol Kolon - Görsel ve Ana Bilgiler */}
        <div className="w-100 w-md-40">
          <div>
            {/* Hero Görsel */}
            <div className="mb-12">
              <HeroImage height="280px" showButtons={true} />
            </div>

            {/* Kurum Kimlik Kartı */}
            <InstitutionIdentityCard />
          </div>
        </div>

        {/* Sağ Kolon - Detay Bilgiler */}
        <div className="w-100 flex-md-grow-1">
          <div className="d-flex flex-column h-100">
            {/* Kurum Tipleri ve Kampanyalar */}
            <div className="mb-12">
              <Badges variant="expanded" />
            </div>

            {/* Açıklama Bölümü */}
            <Description />

            {/* Durum Bilgileri */}
            <StatusIndicators />

            {/* Yaş Aralığı */}
            <AgeRangeInfo />

            {/* Öne Çıkan Özellikler */}
            <Highlights />

            {/* Detay Bilgiler */}
            <Properties />

            {/* Action Section */}
            <Actions />
          </div>
        </div>
      </div>
    </div>
  );
};
