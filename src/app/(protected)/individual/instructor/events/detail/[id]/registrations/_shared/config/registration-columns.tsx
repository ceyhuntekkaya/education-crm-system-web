import Link from "next/link";
import { GridColDef } from "@/components/ui/data-grid";
import { Badge } from "@/components";
import { formatDate } from "@/utils";
import type { EventRegistrationDto, RegistrationStatus } from "@/types";

export interface RegistrationActionCallbacks {
  onStatusClick: (reg: EventRegistrationDto) => void;
  onAttendanceClick: (reg: EventRegistrationDto) => void;
  onDeleteClick: (reg: EventRegistrationDto) => void;
}

const STATUS_LABEL: Record<RegistrationStatus, string> = {
  PENDING: "Onay Bekliyor",
  APPROVED: "Onaylandı",
  REJECTED: "Reddedildi",
  CANCELLED: "İptal Edildi",
};

const STATUS_VARIANT: Record<
  RegistrationStatus,
  "warning" | "success" | "danger" | "secondary"
> = {
  PENDING: "warning",
  APPROVED: "success",
  REJECTED: "danger",
  CANCELLED: "secondary",
};

export const createRegistrationColumns = (
  callbacks?: RegistrationActionCallbacks,
): GridColDef<EventRegistrationDto>[] => [
  {
    field: "teacherName",
    headerName: "Öğretmen",
    minWidth: 220,
    renderCell: (params: any) => {
      const reg: EventRegistrationDto = params.row;
      const detailHref = `/individual/instructor/events/detail/${reg.eventId}/registrations/${reg.id}`;
      return (
        <Link
          href={detailHref}
          className="text-decoration-none text-inherit w-100 d-block"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="fw-semibold text-neutral-800 text-truncate hover-text-primary-600">
            {reg.teacherName || `Öğretmen #${reg.teacherId}`}
          </div>
          {reg.teacherEmail && (
            <div className="text-muted text-xs text-truncate">
              {reg.teacherEmail}
            </div>
          )}
        </Link>
      );
    },
  },
  {
    field: "status",
    headerName: "Durum",
    width: 150,
    align: "center",
    renderCell: (params: any) => {
      const status = params.value as RegistrationStatus;
      return (
        <Badge variant={STATUS_VARIANT[status] ?? "secondary"} size="sm">
          {STATUS_LABEL[status] ?? status}
        </Badge>
      );
    },
  },
  {
    field: "attended",
    headerName: "Katılım",
    width: 120,
    align: "center",
    renderCell: (params: any) =>
      params.value ? (
        <span className="d-flex align-items-center justify-content-center gap-4 text-success-600 fw-medium text-sm">
          <i className="ph-bold ph-check-circle" />
          Katıldı
        </span>
      ) : (
        <span className="d-flex align-items-center justify-content-center gap-4 text-neutral-400 text-sm">
          <i className="ph-bold ph-minus-circle" />—
        </span>
      ),
  },
  {
    field: "createdAt",
    headerName: "Kayıt Tarihi",
    width: 170,
    renderCell: (params: any) => (
      <div className="text-sm">
        {params.value ? formatDate(params.value) : "-"}
      </div>
    ),
  },
  {
    field: "registrationNote",
    headerName: "Not",
    minWidth: 200,
    renderCell: (params: any) => (
      <div
        className="text-sm text-neutral-600"
        style={{
          overflow: "hidden",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
        }}
      >
        {params.value || <span className="text-neutral-300">—</span>}
      </div>
    ),
  },
  ...(callbacks
    ? [
        {
          field: "actions",
          headerName: "İşlemler",
          width: 130,
          align: "right" as const,
          sortable: false,
          renderCell: (params: any) => {
            const reg: EventRegistrationDto = params.row;
            return (
              <div className="d-flex align-items-center gap-6 justify-content-end">
                <button
                  type="button"
                  className="btn btn-sm btn-outline-primary px-8 py-4"
                  title="Durum Güncelle"
                  onClick={() => callbacks.onStatusClick(reg)}
                >
                  <i className="ph ph-arrows-counter-clockwise" />
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-success px-8 py-4"
                  title="Katılım İşaretle"
                  onClick={() => callbacks.onAttendanceClick(reg)}
                >
                  <i className="ph ph-calendar-check" />
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-danger px-8 py-4"
                  title="Kaydı Sil"
                  onClick={() => callbacks.onDeleteClick(reg)}
                >
                  <i className="ph ph-trash" />
                </button>
              </div>
            );
          },
        },
      ]
    : []),
];
