import { Button, Icon } from "@/components";
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
} from "../components";

export const ExpandedSection = () => {
  const { onCardClick } = useInstitutionCardContext();

  return (
    <div className="content-fade-in position-relative">
      {/* Close Button - Top Right */}
      <div className="position-absolute top-0 end-0 p-16 z-3">
        <Icon icon="ph-x" variant="inline" size="sm" onClick={onCardClick} />
      </div>

      <div className="row g-0">
        {/* Sol Kolon - Görsel ve Ana Bilgiler */}
        <div className="col-5">
          <div className="pe-24">
            {/* Hero Görsel */}
            <div className="mb-24">
              <HeroImage height="280px" showButtons={true} />
            </div>

            {/* Kurum Kimlik Kartı */}
            <InstitutionIdentityCard />
          </div>
        </div>

        {/* Sağ Kolon - Detay Bilgiler */}
        <div className="col-7">
          <div className="ps-24 d-flex flex-column h-100">
            {/* Kurum Tipleri ve Kampanyalar */}
            <div className="mb-24">
              <Badges variant="expanded" />
            </div>

            {/* Açıklama Bölümü */}
            <Description />

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
