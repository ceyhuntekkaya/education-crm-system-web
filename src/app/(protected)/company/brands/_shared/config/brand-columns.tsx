import { GridColDef } from "@/components/ui/data-grid";
import { BrandSummaryDto } from "@/types";
import { formatNumber } from "@/utils";
import { CustomImage } from "@/components/ui";

// Helper function to check if URL is valid
const isValidUrl = (url?: string): boolean => {
  if (!url) return false;
  return (
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("/")
  );
};

// Column render helper functions
const renderLogo = (params: any) => {
  const brand = params.row as BrandSummaryDto;
  const hasValidLogo = isValidUrl(brand.logoUrl);

  return (
    <div className="d-flex align-items-center justify-content-center h-100">
      {hasValidLogo ? (
        <div
          className="flex-shrink-0"
          style={{
            width: "40px",
            height: "40px",
            position: "relative",
            borderRadius: "8px",
            overflow: "hidden",
            border: "1px solid #e5e7eb",
          }}
        >
          <CustomImage
            src={brand.logoUrl}
            alt={brand.name || "Brand"}
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      ) : (
        <div
          className="flex-shrink-0 d-flex align-items-center justify-content-center bg-neutral-50"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
          }}
        >
          <i
            className="ph ph-buildings text-neutral-400"
            style={{ fontSize: "20px" }}
          ></i>
        </div>
      )}
    </div>
  );
};

const renderBrandName = (params: any) => {
  const brand = params.row as BrandSummaryDto;

  return (
    <div className="overflow-hidden">
      <div className="fw-semibold text-truncate" title={brand.name}>
        {brand.name || "-"}
      </div>
    </div>
  );
};

const renderSlug = (params: any) => {
  const brand = params.row as BrandSummaryDto;

  return (
    <div className="overflow-hidden">
      {brand.slug ? (
        <small className="text-muted text-truncate d-block" title={brand.slug}>
          {brand.slug}
        </small>
      ) : (
        <span className="text-muted">-</span>
      )}
    </div>
  );
};

const renderRating = (params: any) => {
  const rating = params.value;

  if (!rating || rating === 0) {
    return <div className="text-muted">-</div>;
  }

  return (
    <div className="d-flex align-items-center gap-2">
      <i
        className="ph-fill ph-star text-warning"
        style={{ fontSize: "16px" }}
      ></i>
      <span className="fw-medium">{rating.toFixed(1)}</span>
    </div>
  );
};

const renderCampusCount = (params: any) => {
  const count = params.value || 0;

  return (
    <div className="d-flex align-items-center gap-2">
      <i
        className="ph ph-building text-primary"
        style={{ fontSize: "16px" }}
      ></i>
      <span className="fw-medium">{formatNumber(count)}</span>
      <span className="text-muted">Kampüs</span>
    </div>
  );
};

const renderSchoolCount = (params: any) => {
  const count = params.value || 0;

  return (
    <div className="d-flex align-items-center gap-2">
      <i
        className="ph ph-graduation-cap text-success"
        style={{ fontSize: "16px" }}
      ></i>
      <span className="fw-medium">{formatNumber(count)}</span>
      <span className="text-muted">Kurum</span>
    </div>
  );
};

// Main column definitions
export const createBrandColumns = (): GridColDef<BrandSummaryDto>[] => [
  {
    field: "logoUrl",
    headerName: "Logo",
    width: 80,
    minWidth: 80,
    align: "center",
    headerAlign: "center",
    renderCell: renderLogo,
    sortable: false,
  },
  {
    field: "name",
    headerName: "Marka Adı",
    width: 250,
    minWidth: 200,
    renderCell: renderBrandName,
  },
  {
    field: "slug",
    headerName: "Slug",
    width: 200,
    minWidth: 150,
    renderCell: renderSlug,
  },
  {
    field: "ratingAverage",
    headerName: "Ortalama Puan",
    width: 180,
    minWidth: 150,
    align: "left",
    headerAlign: "left",
    renderCell: renderRating,
  },
  {
    field: "campusCount",
    headerName: "Kampüs Sayısı",
    width: 180,
    minWidth: 150,
    align: "left",
    headerAlign: "left",
    renderCell: renderCampusCount,
  },
  {
    field: "schoolCount",
    headerName: "Kurum Sayısı",
    width: 180,
    minWidth: 150,
    align: "left",
    headerAlign: "left",
    renderCell: renderSchoolCount,
  },
];
