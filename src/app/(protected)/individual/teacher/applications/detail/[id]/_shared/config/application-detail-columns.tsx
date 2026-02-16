import { Badge } from "@/components";
import { formatDate } from "@/utils";
import { DetailColumn } from "@/components/layouts/detail-layout/types";
import type { ApplicationDto } from "../../../../_shared/types";
import {
  getApplicationStatusBadgeVariant,
  getApplicationStatusDisplay,
  getApplicationStatusIcon,
} from "../../../../_shared/utils";

/**
 * ================================================================================
 * APPLICATION DETAIL COLUMNS
 * ================================================================================
 * Başvuru detay sayfası için kolon tanımları
 * DetailLayout bileşeni ile kullanılır
 */

export const createApplicationDetailColumns =
  (): DetailColumn<ApplicationDto>[] => [
    // Durum
    {
      field: "status",
      headerName: "Durum",
      section: "info",
      icon: "ph-file-text",
      renderCell: (data: ApplicationDto) => {
        if (data.isWithdrawn) {
          return (
            <Badge variant="secondary" size="md">
              <i className="ph ph-arrow-u-up-left me-2"></i>
              Geri Çekildi
            </Badge>
          );
        }
        return (
          <Badge
            variant={getApplicationStatusBadgeVariant(data.status)}
            size="md"
          >
            <i className={`${getApplicationStatusIcon(data.status)} me-2`}></i>
            {getApplicationStatusDisplay(data.status)}
          </Badge>
        );
      },
    },
    // Başvuru Tarihi
    {
      field: "createdAt",
      headerName: "Başvuru Tarihi",
      section: "dates",
      icon: "ph-calendar",
      renderCell: (data: ApplicationDto) => formatDate(data.createdAt),
    },
    // Son Güncelleme
    {
      field: "updatedAt",
      headerName: "Son Güncelleme",
      section: "dates",
      icon: "ph-clock",
      renderCell: (data: ApplicationDto) => formatDate(data.updatedAt),
    },
    // Ön Yazı
    {
      field: "coverLetter",
      headerName: "Ön Yazı",
      section: "details",
      icon: "ph-note",
      grid: 12,
      renderCell: (data: ApplicationDto) => (
        <div className="text-neutral-700">
          {data.coverLetter || "Henüz ön yazı eklenmemiş"}
        </div>
      ),
    },
    // Pozisyon
    {
      field: "positionTitle",
      headerName: "Pozisyon",
      section: "details",
      icon: "ph-briefcase",
      renderCell: (data: ApplicationDto) =>
        data.jobPosting?.positionTitle || "-",
    },
    // Branş
    {
      field: "branch",
      headerName: "Branş",
      section: "details",
      icon: "ph-books",
      renderCell: (data: ApplicationDto) => data.jobPosting?.branch || "-",
    },
    // İstihdam Tipi
    {
      field: "employmentType",
      headerName: "İstihdam Tipi",
      section: "details",
      icon: "ph-suitcase",
      renderCell: (data: ApplicationDto) =>
        data.jobPosting?.employmentType || "-",
    },
    // Okul
    {
      field: "campusName",
      headerName: "Okul",
      section: "info",
      icon: "ph-buildings",
      renderCell: (data: ApplicationDto) =>
        data.jobPosting?.campus?.name || "-",
    },
    // Belge Sayısı
    {
      field: "documentCount",
      headerName: "Belgeler",
      section: "meta",
      icon: "ph-paperclip",
      renderCell: (data: ApplicationDto) => (
        <span>{data.documents?.length || 0} Belge</span>
      ),
    },
    // Not Sayısı
    {
      field: "noteCount",
      headerName: "Notlar",
      section: "meta",
      icon: "ph-note",
      renderCell: (data: ApplicationDto) => (
        <span>{data.notes?.length || 0} Not</span>
      ),
    },
  ];
