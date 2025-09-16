"use client";

import React, { useState } from "react";
import { AppointmentDto } from "@/types/dto/appointment";
import {
  AppointmentTableProps,
  SortDirection,
  SortField,
} from "./types/appointment-table-types";
import {
  getStatusBadgeClass,
  getStatusText,
  getAppointmentTypeText,
  formatDate,
  formatTime,
} from "./utils/appointment-utils";

export const AppointmentTable: React.FC<AppointmentTableProps> = ({
  appointments = [],
  loading = false,
  onAppointmentSelect,
  onStatusChange,
  showActions = true,
  title = "Randevu Listesi",
}) => {
  const [selectedAppointments, setSelectedAppointments] = useState<Set<number>>(
    new Set()
  );
  const [sortField, setSortField] = useState<SortField>("appointmentDate");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  // Sıralama işlevi
  const sortedAppointments = [...appointments].sort((a, b) => {
    const aValue = a[sortField] || "";
    const bValue = b[sortField] || "";

    if (sortDirection === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  // Sıralama değiştirme
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Seçim işlemleri
  const handleSelectAppointment = (appointmentId: number) => {
    const newSelected = new Set(selectedAppointments);
    if (newSelected.has(appointmentId)) {
      newSelected.delete(appointmentId);
    } else {
      newSelected.add(appointmentId);
    }
    setSelectedAppointments(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedAppointments.size === appointments.length) {
      setSelectedAppointments(new Set());
    } else {
      setSelectedAppointments(new Set(appointments.map((a) => a.id!)));
    }
  };

  if (loading) {
    return (
      <div className="card">
        <div className="card-body text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Yükleniyor...</span>
          </div>
          <p className="mt-3">Randevular yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="appointment-table-container">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5 className="card-title mb-0">
            <i className="ph-bold ph-calendar-check me-2"></i>
            {title}
          </h5>
          <div className="d-flex align-items-center gap-2">
            <span className="badge bg-light text-dark">
              Toplam: {appointments.length}
            </span>
            {selectedAppointments.size > 0 && (
              <span className="badge bg-primary">
                {selectedAppointments.size} seçili
              </span>
            )}
          </div>
        </div>

        <div className="card-body p-0">
          {appointments.length === 0 ? (
            <div className="text-center py-5">
              <i className="ph-bold ph-calendar-x fa-3x text-muted mb-3"></i>
              <h6 className="text-muted">Henüz randevu bulunmuyor</h6>
              <p className="text-muted small">
                Yeni randevular eklendiğinde burada görünecektir.
              </p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th style={{ width: "40px" }}>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={
                            selectedAppointments.size === appointments.length &&
                            appointments.length > 0
                          }
                          onChange={handleSelectAll}
                        />
                      </div>
                    </th>
                    <th style={{ width: "50px" }}>
                      <i className="ph-bold ph-star text-warning"></i>
                    </th>
                    <th
                      className="sortable-header"
                      onClick={() => handleSort("parentUserName")}
                      style={{ cursor: "pointer" }}
                    >
                      Kişi
                      {sortField === "parentUserName" && (
                        <i
                          className={`ph-bold ph-caret-${
                            sortDirection === "asc" ? "up" : "down"
                          } ms-1`}
                        ></i>
                      )}
                    </th>
                    <th
                      className="sortable-header"
                      onClick={() => handleSort("appointmentDate")}
                      style={{ cursor: "pointer" }}
                    >
                      En Erken Tarih
                      {sortField === "appointmentDate" && (
                        <i
                          className={`ph-bold ph-caret-${
                            sortDirection === "asc" ? "up" : "down"
                          } ms-1`}
                        ></i>
                      )}
                    </th>
                    <th>Lokasyon</th>
                    <th>Kampüs</th>
                    <th>Randevu Türü</th>
                    <th>Durum</th>
                    {showActions && (
                      <th style={{ width: "120px" }}>İşlemler</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {sortedAppointments.map((appointment) => (
                    <tr
                      key={appointment.id}
                      className={
                        selectedAppointments.has(appointment.id!)
                          ? "table-active"
                          : ""
                      }
                      style={{
                        cursor: onAppointmentSelect ? "pointer" : "default",
                      }}
                      onClick={() =>
                        onAppointmentSelect && onAppointmentSelect(appointment)
                      }
                    >
                      <td>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={selectedAppointments.has(appointment.id!)}
                            onChange={(e) => {
                              e.stopPropagation();
                              handleSelectAppointment(appointment.id!);
                            }}
                          />
                        </div>
                      </td>
                      <td>
                        <i className="ph-bold ph-star text-muted"></i>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="avatar-circle bg-primary text-white me-2">
                            {appointment.parentUserName
                              ?.charAt(0)
                              .toUpperCase() || "U"}
                          </div>
                          <div>
                            <div className="fw-semibold">
                              {appointment.parentUserName || "Bilinmiyor"}
                            </div>
                            <small className="text-muted">
                              #{appointment.appointmentNumber}
                            </small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div>
                          <div className="fw-semibold">
                            {formatDate(appointment.appointmentDate)}
                          </div>
                          <small className="text-muted">
                            {formatTime(appointment.startTime)} -{" "}
                            {formatTime(appointment.endTime)}
                          </small>
                        </div>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <i className="ph-bold ph-map-pin text-muted me-1"></i>
                          {appointment.location ||
                            appointment.schoolName ||
                            "Belirtilmemiş"}
                        </div>
                      </td>
                      <td>
                        <span className="badge bg-light text-dark">
                          {appointment.campusName || "Genel Kampüs"}
                        </span>
                      </td>
                      <td>
                        <span className="badge bg-info text-white">
                          {getAppointmentTypeText(
                            appointment.appointmentType || ""
                          )}
                        </span>
                      </td>
                      <td>
                        <span
                          className={getStatusBadgeClass(
                            appointment.status || ""
                          )}
                        >
                          {getStatusText(appointment.status || "")}
                        </span>
                      </td>
                      {showActions && (
                        <td>
                          <div className="btn-group" role="group">
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-primary"
                              title="Detayları Görüntüle"
                              onClick={(e) => {
                                e.stopPropagation();
                                onAppointmentSelect &&
                                  onAppointmentSelect(appointment);
                              }}
                            >
                              <i className="ph-bold ph-eye"></i>
                            </button>
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-secondary"
                              title="Düzenle"
                            >
                              <i className="ph-bold ph-pencil"></i>
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {appointments.length > 0 && (
          <div className="card-footer bg-light">
            <div className="d-flex justify-content-between align-items-center">
              <small className="text-muted">
                {appointments.length} randevu gösteriliyor
              </small>
              {selectedAppointments.size > 0 && (
                <div className="btn-group" role="group">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary"
                  >
                    <i className="ph-bold ph-envelope me-1"></i>
                    E-posta Gönder
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-success"
                  >
                    <i className="ph-bold ph-check me-1"></i>
                    Toplu Onayla
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-danger"
                  >
                    <i className="ph-bold ph-x me-1"></i>
                    Toplu İptal
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .appointment-table-container {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            sans-serif;
        }

        .avatar-circle {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 600;
        }

        .sortable-header:hover {
          background-color: rgba(0, 0, 0, 0.05);
        }

        .table-responsive {
          border-radius: 0;
        }

        .table th {
          border-top: none;
          font-weight: 600;
          font-size: 0.875rem;
          color: #6c757d;
          padding: 12px 8px;
        }

        .table td {
          padding: 12px 8px;
          vertical-align: middle;
          border-color: #f1f3f4;
        }

        .table-hover tbody tr:hover {
          background-color: rgba(0, 123, 255, 0.05);
        }

        .btn-group .btn {
          border-radius: 4px;
          margin-right: 2px;
        }

        .badge {
          font-size: 0.75rem;
          padding: 4px 8px;
        }

        .card {
          border: 1px solid #e3e6f0;
          box-shadow: 0 0.15rem 1.75rem 0 rgba(58, 59, 69, 0.15);
        }

        .card-header {
          background-color: #f8f9fc;
          border-bottom: 1px solid #e3e6f0;
        }

        .form-check-input:checked {
          background-color: #4e73df;
          border-color: #4e73df;
        }
      `}</style>
    </div>
  );
};

export default AppointmentTable;
