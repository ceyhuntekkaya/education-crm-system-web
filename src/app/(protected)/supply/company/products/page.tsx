"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui";
import { usePageTitle } from "@/hooks";

const ProductsPage: React.FC = () => {
  usePageTitle("Ürün Arama");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <div className="container-fluid">
      {/* Page Header */}
      <div className="row mb-24">
        <div className="col-12">
          <div className="page-header">
            <h1 className="mb-8">Ürün Arama</h1>
            <p className="text-muted mb-0">
              Tedarikçi ürünlerini arayın ve talep oluşturun
            </p>
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="row mb-24">
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="row g-3">
                <div className="col-12 col-md-6 col-lg-8">
                  <div className="input-group">
                    <span className="input-group-text bg-white border-end-0">
                      <i className="ph-bold ph-magnifying-glass text-neutral-600"></i>
                    </span>
                    <input
                      type="text"
                      className="form-control border-start-0 ps-0"
                      placeholder="Ürün ara..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>

                <div className="col-12 col-md-6 col-lg-4">
                  <select
                    className="form-select"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    <option value="all">Tüm Kategoriler</option>
                    <option value="electronics">Elektronik</option>
                    <option value="furniture">Mobilya</option>
                    <option value="stationery">Kırtasiye</option>
                    <option value="other">Diğer</option>
                  </select>
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
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="row g-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
          <div key={item} className="col-12 col-sm-6 col-lg-4 col-xl-3">
            <div className="card border-0 shadow-sm h-100">
              <div
                className="bg-neutral-100 d-flex align-items-center justify-content-center"
                style={{ height: "200px" }}
              >
                <i className="ph-bold ph-package text-neutral-400 text-xxxl"></i>
              </div>
              <div className="card-body">
                <h6 className="mb-8">Ürün {item}</h6>
                <p className="text-sm text-neutral-600 mb-12">
                  Ürün açıklaması buraya gelecek
                </p>
                <div className="d-flex justify-content-between align-items-center mb-12">
                  <span className="badge bg-primary-50 text-primary-600 px-12 py-6">
                    Elektronik
                  </span>
                  <span className="fw-semibold text-lg">₺1,299</span>
                </div>
                <div className="d-flex gap-2">
                  <Button size="sm" className="flex-grow-1">
                    <i className="ph-bold ph-shopping-cart me-8"></i>
                    Sepete Ekle
                  </Button>
                  <Button size="sm" variant="outline">
                    <i className="ph-bold ph-heart"></i>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="row mt-24">
        <div className="col-12">
          <nav>
            <ul className="pagination justify-content-center">
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
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
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
  );
};

export default ProductsPage;
