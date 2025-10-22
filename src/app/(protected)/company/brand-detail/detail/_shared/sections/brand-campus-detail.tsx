import { useBrandDetail } from "../context/brand-detail-context";
import { CustomCard, CustomImage } from "@/components/ui";
import { renderStars } from "@/utils";

export default function BrandCampusDetail() {
  const { currentBrand } = useBrandDetail();

  if (!currentBrand) {
    return null;
  }

  const brand = currentBrand;
  const campuses = brand.campuses || [];

  if (campuses.length === 0) {
    return (
      <CustomCard title="Kampüsler">
        <div className="text-center py-24">
          <i
            className="ph ph-buildings text-neutral-400"
            style={{ fontSize: "48px" }}
          />
          <p className="text-neutral-500 mb-0 mt-12">
            Bu markaya ait kampüs bilgisi mevcut değil
          </p>
        </div>
      </CustomCard>
    );
  }

  return (
    <CustomCard title={`Kampüsler (${campuses.length})`}>
      <div className="d-flex flex-column gap-16">
        {campuses.map((campus, index) => (
          <div
            key={campus.id || index}
            className="border border-neutral-30 rounded-12 p-16"
          >
            <div className="d-flex align-items-start justify-content-between mb-12">
              <div className="flex-grow-1">
                <h5 className="mb-8 text-neutral-800">{campus.name}</h5>

                {/* Kampüs Bilgileri */}
                <div className="row g-3">
                  {campus.province && (
                    <div className="col-md-6">
                      <div className="d-flex align-items-center gap-8">
                        <i
                          className="ph ph-map-pin text-neutral-500"
                          style={{ fontSize: "16px" }}
                        />
                        <div>
                          <span className="text-sm text-neutral-600">İl:</span>
                          <p className="text-sm text-neutral-800 mb-0">
                            {campus.province.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {campus.district && (
                    <div className="col-md-6">
                      <div className="d-flex align-items-center gap-8">
                        <i
                          className="ph ph-map-pin text-neutral-500"
                          style={{ fontSize: "16px" }}
                        />
                        <div>
                          <span className="text-sm text-neutral-600">
                            İlçe:
                          </span>
                          <p className="text-sm text-neutral-800 mb-0">
                            {campus.district.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {campus.ratingAverage && campus.ratingAverage > 0 && (
                    <div className="col-md-6">
                      <div className="d-flex align-items-center gap-8">
                        <i
                          className="ph ph-star text-neutral-500"
                          style={{ fontSize: "16px" }}
                        />
                        <div>
                          <span className="text-sm text-neutral-600">
                            Puan:
                          </span>
                          <div className="d-flex align-items-center gap-8">
                            {renderStars(campus.ratingAverage)}
                            <span className="text-sm fw-semibold text-warning-600">
                              {campus.ratingAverage.toFixed(1)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {campus.schoolCount && campus.schoolCount > 0 && (
                    <div className="col-md-6">
                      <div className="d-flex align-items-center gap-8">
                        <i
                          className="ph ph-buildings text-neutral-500"
                          style={{ fontSize: "16px" }}
                        />
                        <div>
                          <span className="text-sm text-neutral-600">
                            Okul Sayısı:
                          </span>
                          <p className="text-sm text-neutral-800 mb-0">
                            {campus.schoolCount} okul
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {campus.isSubscribed && (
                    <div className="col-12">
                      <span className="badge bg-success-100 text-success-600 px-8 py-4 text-xs fw-medium">
                        <i className="ph ph-check-circle me-1" />
                        Abonelik Var
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Campus Logo */}
              {campus.logoUrl && (
                <div className="flex-shrink-0">
                  <CustomImage
                    src={campus.logoUrl}
                    alt={campus.name || "Kampüs logosu"}
                    width={48}
                    height={48}
                    className="rounded-8 border border-neutral-30"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </CustomCard>
  );
}
