"use client";

import React from "react";
import { Button } from "@/components/ui";
import { usePageTitle } from "@/hooks";

const WishlistPage: React.FC = () => {
  usePageTitle("İstek Listesi / Favoriler");
  return (
    <div className="container-fluid">
      {/* Page Header */}
      <div className="row mb-24">
        <div className="col-12">
          <div className="page-header d-flex justify-content-between align-items-center">
            <div>
              <h1 className="mb-8">İstek Listesi / Favoriler</h1>
              <p className="text-muted mb-0">
                Favori ürünlerinizi görüntüleyin ve yönetin
              </p>
            </div>
            <Button>
              <i className="ph-bold ph-trash me-8"></i>
              Tümünü Temizle
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="row g-4 mb-24">
        <div className="col-12 col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="w-48-px h-48-px bg-primary-50 rounded-circle d-flex align-items-center justify-content-center me-12">
                  <i className="ph-bold ph-heart text-primary-600 text-xl"></i>
                </div>
                <div>
                  <h6 className="mb-0 text-neutral-600">Toplam Favoriler</h6>
                  <h3 className="mb-0 mt-4">89</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="w-48-px h-48-px bg-success-50 rounded-circle d-flex align-items-center justify-content-center me-12">
                  <i className="ph-bold ph-check-circle text-success-600 text-xl"></i>
                </div>
                <div>
                  <h6 className="mb-0 text-neutral-600">Stokta</h6>
                  <h3 className="mb-0 mt-4">67</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="w-48-px h-48-px bg-warning-50 rounded-circle d-flex align-items-center justify-content-center me-12">
                  <i className="ph-bold ph-warning text-warning-600 text-xl"></i>
                </div>
                <div>
                  <h6 className="mb-0 text-neutral-600">Stokta Yok</h6>
                  <h3 className="mb-0 mt-4">22</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wishlist Items */}
      <div className="row">
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-bottom">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Favori Ürünler</h5>
                <div className="d-flex gap-2">
                  <Button size="sm" variant="outline">
                    <i className="ph-bold ph-funnel me-8"></i>
                    Filtrele
                  </Button>
                  <Button size="sm" variant="outline">
                    <i className="ph-bold ph-sort-ascending me-8"></i>
                    Sırala
                  </Button>
                </div>
              </div>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="bg-neutral-25">
                    <tr>
                      <th className="ps-16" style={{ width: "50px" }}>
                        <input type="checkbox" className="form-check-input" />
                      </th>
                      <th>Ürün</th>
                      <th>Kategori</th>
                      <th>Fiyat</th>
                      <th>Durum</th>
                      <th>Eklenme Tarihi</th>
                      <th className="text-center" style={{ width: "120px" }}>
                        İşlemler
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3, 4, 5].map((item) => (
                      <tr key={item}>
                        <td className="ps-16">
                          <input type="checkbox" className="form-check-input" />
                        </td>
                        <td>
                          <div className="d-flex align-items-center">
                            <div
                              className="bg-neutral-100 rounded-8 me-12 d-flex align-items-center justify-content-center"
                              style={{ width: "48px", height: "48px" }}
                            >
                              <i className="ph-bold ph-package text-neutral-400"></i>
                            </div>
                            <div>
                              <h6 className="mb-0">Ürün {item}</h6>
                              <small className="text-neutral-600">
                                SKU: PRD-00{item}
                              </small>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="badge bg-primary-50 text-primary-600">
                            Elektronik
                          </span>
                        </td>
                        <td>
                          <span className="fw-semibold">₺1,299</span>
                        </td>
                        <td>
                          <span className="badge bg-success-50 text-success-600">
                            <i className="ph-bold ph-check me-4"></i>
                            Stokta
                          </span>
                        </td>
                        <td>
                          <small className="text-neutral-600">22.12.2025</small>
                        </td>
                        <td>
                          <div className="d-flex gap-2 justify-content-center">
                            <Button size="sm" variant="outline">
                              <i className="ph-bold ph-shopping-cart"></i>
                            </Button>
                            <Button size="sm" variant="outline">
                              <i className="ph-bold ph-trash text-danger-600"></i>
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
                  5 üründen 1-5 arası gösteriliyor
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

export default WishlistPage;
