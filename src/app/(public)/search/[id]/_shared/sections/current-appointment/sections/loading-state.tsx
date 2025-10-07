"use client";

import React from "react";

const LoadingState: React.FC = () => {
  return (
    <div className="tutor-details__content">
      <div className="border border-neutral-30 rounded-12 bg-white p-8 mt-24">
        <div className="border border-neutral-30 rounded-12 bg-main-25 p-32">
          <h5 className="mb-0">
            <i className="ph ph-calendar me-8 text-main-600"></i>
            Randevum
          </h5>
          <span className="d-block border border-neutral-30 my-32 border-dashed" />

          <div className="bg-white rounded-8 p-32">
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ minHeight: "280px" }}
            >
              <div className="text-center">
                <div className="mb-24">
                  <div
                    className="spinner-border text-main"
                    role="status"
                    style={{ width: "3rem", height: "3rem" }}
                  >
                    <span className="visually-hidden">Yükleniyor...</span>
                  </div>
                </div>
                <h5 className="text-neutral-700 mb-12">
                  Randevu bilgileri yükleniyor
                </h5>
                <p className="text-neutral-500 mb-0">Lütfen bekleyiniz...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingState;
