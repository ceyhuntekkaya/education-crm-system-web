import { GridColDef } from "@/components/ui/data-grid";
import { SchoolDto } from "@/types";
import { Badge, CustomImage } from "@/components";
import { getLanguageTypeLabel } from "@/utils";

export const createSchoolColumns = (): GridColDef<SchoolDto>[] => [
  // Logo
  {
    field: "logoUrl",
    headerName: "",
    width: 80,
    sortable: false,
    renderCell: (params) => (
      <CustomImage
        src={params.row.logoUrl}
        alt={params?.row?.name || "Okul Logosu"}
        width={40}
        height={40}
        variant="card"
      />
    ),
  },

  // Temel Bilgiler
  {
    field: "name",
    headerName: "Okul Adı",
    width: 260,
    renderCell: (params) => (
      <div className="fw-semibold text-truncate" title={params?.row?.name}>
        {params?.row?.name || "-"}
      </div>
    ),
  },
  {
    field: "campus",
    headerName: "Kampüs",
    width: 300,
    valueGetter: (params) => params?.row?.campus?.name || "",
    renderCell: (params) => params?.row?.campus?.name || "-",
  },
  {
    field: "institutionType",
    headerName: "Kurum Türü",
    width: 170,
    valueGetter: (params) => params?.row?.institutionType?.displayName || "",
    renderCell: (params) => (
      <div className="d-flex align-items-center gap-2">
        {params?.row?.institutionType?.iconUrl && (
          <i
            className="ph-bold ph-graduation-cap text-sm"
            style={{
              color: params?.row?.institutionType?.colorCode || "#6B7280",
            }}
          />
        )}
        <span className="text-truncate">
          {params?.row?.institutionType?.displayName || "-"}
        </span>
      </div>
    ),
  },
  {
    field: "province",
    headerName: "İl",
    width: 100,
    valueGetter: (params) => params?.row?.campus?.province?.name || "",
    renderCell: (params) => params?.row?.campus?.province?.name || "-",
  },
  {
    field: "district",
    headerName: "İlçe",
    width: 120,
    valueGetter: (params) => params?.row?.campus?.district?.name || "",
    renderCell: (params) => params?.row?.campus?.district?.name || "-",
  },

  // Eğitim Bilgileri
  {
    field: "ageRange",
    headerName: "Yaş Aralığı",
    width: 160,
    renderCell: (params) => (
      <div className="text-center">
        {params?.row?.minAge && params?.row?.maxAge
          ? `${params.row.minAge}-${params.row.maxAge} yaş`
          : "-"}
      </div>
    ),
  },
  {
    field: "curriculumType",
    headerName: "Müfredat",
    width: 150,
    renderCell: (params) => params?.row?.curriculumType || "-",
  },
  {
    field: "languageOfInstruction",
    headerName: "Eğitim Dili",
    width: 150,
    renderCell: (params) =>
      params?.row?.languageOfInstruction
        ? getLanguageTypeLabel(params.row.languageOfInstruction)
        : "-",
  },
  {
    field: "foreignLanguages",
    headerName: "Yabancı Dil",
    width: 150,
    renderCell: (params) => params?.row?.foreignLanguages || "-",
  },

  // Kapasite ve Ücretler
  {
    field: "capacity",
    headerName: "Kapasite",
    width: 140,
    type: "number",
    renderCell: (params) => (
      <div className="text-center fw-medium">
        {params?.row?.currentStudentCount || 0} / {params?.row?.capacity || 0}
      </div>
    ),
  },
  {
    field: "monthlyFee",
    headerName: "Aylık Ücret",
    width: 160,
    type: "number",
    renderCell: (params) =>
      params?.row?.monthlyFee ? (
        <span className="fw-semibold text-success">
          ₺{params.row.monthlyFee.toLocaleString()}
        </span>
      ) : (
        "-"
      ),
  },
  {
    field: "registrationFee",
    headerName: "Kayıt Ücreti",
    width: 160,
    type: "number",
    renderCell: (params) =>
      params?.row?.registrationFee ? (
        <span className="fw-medium text-warning">
          ₺{params.row.registrationFee.toLocaleString()}
        </span>
      ) : (
        "-"
      ),
  },

  // Değerlendirme ve İstatistikler
  {
    field: "ratingAverage",
    headerName: "Puan",
    width: 120,
    type: "number",
    renderCell: (params) => (
      <div className="text-center">
        {params?.row?.ratingAverage ? (
          <div className="fw-medium d-flex align-items-center gap-1">
            <i className="ph-fill ph-star text-warning" />
            {params.row.ratingAverage.toFixed(1)}
          </div>
        ) : (
          "-"
        )}
      </div>
    ),
  },
  {
    field: "ratingCount",
    headerName: "Değerlendirme",
    width: 190,
    type: "number",
    renderCell: (params) =>
      params?.row?.ratingCount ? `${params.row.ratingCount}` : "-",
  },
  {
    field: "viewCount",
    headerName: "Görüntülenme",
    width: 180,
    type: "number",
    renderCell: (params) => {
      const value = params?.row?.viewCount || 0;
      return (
        <span className="fw-medium text-primary">
          {value > 1000 ? `${Math.round(value / 1000)}k` : value}
        </span>
      );
    },
  },
  {
    field: "likeCount",
    headerName: "Beğeni",
    width: 140,
    type: "number",
    renderCell: (params) => {
      const value = params?.row?.likeCount || 0;
      return (
        <span className="fw-medium text-danger">
          {value > 1000 ? `${Math.round(value / 1000)}k` : value}
        </span>
      );
    },
  },
  {
    field: "postCount",
    headerName: "İçerik",
    width: 140,
    type: "number",
    renderCell: (params) => (
      <span className="fw-medium text-info">{params?.row?.postCount || 0}</span>
    ),
  },

  // İletişim
  {
    field: "phone",
    headerName: "Telefon",
    width: 200,
    renderCell: (params) => params?.row?.phone || "-",
  },
  {
    field: "extension",
    headerName: "Dahili",
    width: 120,
    renderCell: (params) => params?.row?.extension || "-",
  },
  {
    field: "email",
    headerName: "E-posta",
    width: 300,
    renderCell: (params) =>
      params?.row?.email ? (
        <span
          className="text-muted text-truncate d-block"
          title={params.row.email}
        >
          {params.row.email}
        </span>
      ) : (
        "-"
      ),
  },

  // Durum ve Kampanyalar
  {
    field: "isActive",
    headerName: "Durum",
    width: 100,
    type: "boolean",
    renderCell: (params) => (
      <Badge variant={params?.row?.isActive ? "success" : "secondary"}>
        {params?.row?.isActive ? "Aktif" : "Pasif"}
      </Badge>
    ),
  },
  {
    field: "activeCampaigns",
    headerName: "Kampanyalar",
    width: 200,
    renderCell: (params) => {
      const campaignCount = params?.row?.activeCampaigns?.length || 0;
      return (
        <div>
          {campaignCount > 0 ? (
            <div className="d-flex align-items-center gap-1">
              <i className="ph-fill ph-megaphone text-success" />
              <span className="text-success fw-medium">{campaignCount}</span>
            </div>
          ) : (
            <span className="text-muted">-</span>
          )}
        </div>
      );
    },
  },
];
