"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui";
import { usePageTitle } from "@/hooks";

type RFQStatus = "pending" | "in-progress" | "completed" | "cancelled";

interface RFQ {
  id: number;
  title: string;
  rfqNumber: string;
  status: RFQStatus;
  requestDate: string;
  dueDate: string;
  supplier: string;
  totalItems: number;
  estimatedValue: string;
}

const RFQsPage: React.FC = () => {
  usePageTitle("RFQ Yönetimi");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const mockRFQs: RFQ[] = [
    {
      id: 1,
      title: "Elektronik Malzeme Talebi",
      rfqNumber: "RFQ-2025-001",
      status: "pending",
      requestDate: "20.12.2025",
      dueDate: "30.12.2025",
      supplier: "Tedarikçi A",
      totalItems: 15,
      estimatedValue: "₺45,000",
    },
    {
      id: 2,
      title: "Ofis Mobilyası",
      rfqNumber: "RFQ-2025-002",
      status: "in-progress",
      requestDate: "18.12.2025",
      dueDate: "28.12.2025",
      supplier: "Tedarikçi B",
      totalItems: 8,
      estimatedValue: "₺32,500",
    },
    {
      id: 3,
      title: "Kırtasiye Malzemeleri",
      rfqNumber: "RFQ-2025-003",
      status: "completed",
      requestDate: "15.12.2025",
      dueDate: "25.12.2025",
      supplier: "Tedarikçi C",
      totalItems: 25,
      estimatedValue: "₺12,800",
    },
  ];

  const getStatusBadge = (status: RFQStatus) => {
    const badges = {
      pending: (
        <span className="badge bg-warning-50 text-warning-600">
          <i className="ph-bold ph-clock me-4"></i>
          Beklemede
        </span>
      ),
      "in-progress": (
        <span className="badge bg-info-50 text-info-600">
          <i className="ph-bold ph-spinner me-4"></i>
          İşlemde
        </span>
      ),
      completed: (
        <span className="badge bg-success-50 text-success-600">
          <i className="ph-bold ph-check-circle me-4"></i>
          Tamamlandı
        </span>
      ),
      cancelled: (
        <span className="badge bg-danger-50 text-danger-600">
          <i className="ph-bold ph-x-circle me-4"></i>
          İptal Edildi
        </span>
      ),
    };
    return badges[status];
  };

  return (
    <div className="container-fluid">
      {/* Page Header */}
      <div className="row mb-24">
        <div className="col-12">
          <div className="page-header d-flex justify-content-between align-items-center">
            <div>
              <h1 className="mb-8">Teklif Talepleri (RFQ)</h1>
              <p className="text-muted mb-0">
                Malzeme talepleri oluşturun ve tedarikçi tekliflerini
                değerlendirin
              </p>
            </div>
            <Button>
              <i className="ph-bold ph-plus me-8"></i>
              Yeni RFQ Oluştur
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="row g-4 mb-24">
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="w-48-px h-48-px bg-primary-50 rounded-circle d-flex align-items-center justify-content-center me-12">
                  <i className="ph-bold ph-clipboard-text text-primary-600 text-xl"></i>
                </div>
                <div>
                  <h6 className="mb-0 text-neutral-600">Toplam RFQ</h6>
                  <h3 className="mb-0 mt-4">45</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="w-48-px h-48-px bg-warning-50 rounded-circle d-flex align-items-center justify-content-center me-12">
                  <i className="ph-bold ph-clock text-warning-600 text-xl"></i>
                </div>
                <div>
                  <h6 className="mb-0 text-neutral-600">Beklemede</h6>
                  <h3 className="mb-0 mt-4">12</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="w-48-px h-48-px bg-info-50 rounded-circle d-flex align-items-center justify-content-center me-12">
                  <i className="ph-bold ph-spinner text-info-600 text-xl"></i>
                </div>
                <div>
                  <h6 className="mb-0 text-neutral-600">İşlemde</h6>
                  <h3 className="mb-0 mt-4">18</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="w-48-px h-48-px bg-success-50 rounded-circle d-flex align-items-center justify-content-center me-12">
                  <i className="ph-bold ph-check-circle text-success-600 text-xl"></i>
                </div>
                <div>
                  <h6 className="mb-0 text-neutral-600">Tamamlandı</h6>
                  <h3 className="mb-0 mt-4">15</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="row mb-24">
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="row g-3">
                <div className="col-12 col-md-4">
                  <select
                    className="form-select"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  >
                    <option value="all">Tüm Durumlar</option>
                    <option value="pending">Beklemede</option>
                    <option value="in-progress">İşlemde</option>
                    <option value="completed">Tamamlandı</option>
                    <option value="cancelled">İptal Edildi</option>
                  </select>
                </div>

                <div className="col-12 col-md-4">
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Başlangıç Tarihi"
                  />
                </div>

                <div className="col-12 col-md-4">
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Bitiş Tarihi"
                  />
                </div>
              </div>

              <div className="d-flex gap-2 mt-12">
                <Button size="sm" variant="outline">
                  <i className="ph-bold ph-funnel me-8"></i>
                  Filtrele
                </Button>
                <Button size="sm" variant="outline">
                  <i className="ph-bold ph-arrow-clockwise me-8"></i>
                  Sıfırla
                </Button>
                <Button size="sm" variant="outline">
                  <i className="ph-bold ph-download-simple me-8"></i>
                  Dışa Aktar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RFQ List */}
      <div className="row">
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-bottom">
              <h5 className="mb-0">RFQ Listesi</h5>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="bg-neutral-25">
                    <tr>
                      <th className="ps-16">RFQ No</th>
                      <th>Başlık</th>
                      <th>Tedarikçi</th>
                      <th>Talep Tarihi</th>
                      <th>Son Tarih</th>
                      <th>Ürün Sayısı</th>
                      <th>Tahmini Değer</th>
                      <th>Durum</th>
                      <th className="text-center" style={{ width: "120px" }}>
                        İşlemler
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockRFQs.map((rfq) => (
                      <tr key={rfq.id}>
                        <td className="ps-16">
                          <span className="fw-semibold text-primary-600">
                            {rfq.rfqNumber}
                          </span>
                        </td>
                        <td>
                          <h6 className="mb-0">{rfq.title}</h6>
                        </td>
                        <td>
                          <span className="text-neutral-700">
                            {rfq.supplier}
                          </span>
                        </td>
                        <td>
                          <small className="text-neutral-600">
                            {rfq.requestDate}
                          </small>
                        </td>
                        <td>
                          <small className="text-neutral-600">
                            {rfq.dueDate}
                          </small>
                        </td>
                        <td>
                          <span className="badge bg-neutral-100 text-neutral-700">
                            {rfq.totalItems} ürün
                          </span>
                        </td>
                        <td>
                          <span className="fw-semibold">
                            {rfq.estimatedValue}
                          </span>
                        </td>
                        <td>{getStatusBadge(rfq.status)}</td>
                        <td>
                          <div className="d-flex gap-2 justify-content-center">
                            <Button size="sm" variant="outline">
                              <i className="ph-bold ph-eye"></i>
                            </Button>
                            <Button size="sm" variant="outline">
                              <i className="ph-bold ph-pencil-simple"></i>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="card-footer bg-white border-top">
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0 text-sm text-neutral-600">
                  3 RFQ&apos;dan 1-3 arası gösteriliyor
                </p>
                <nav>
                  <ul className="pagination mb-0">
                    <li className="page-item disabled">
                      <a className="page-link" href="#" tabIndex={-1}>
                        <i className="ph-bold ph-caret-left"></i>
                      </a>
                    </li>
                    <li className="page-item active">
                      <a className="page-link" href="#">
                        1
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        <i className="ph-bold ph-caret-right"></i>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RFQsPage;
