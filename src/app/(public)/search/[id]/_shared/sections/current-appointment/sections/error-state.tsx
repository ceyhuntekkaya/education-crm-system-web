"use client";

import React from "react";

interface ErrorStateProps {
  error: string;
  onRetry?: () => void;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error, onRetry }) => {
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
            <div className="text-center py-48">
              <div className="mb-24">
                <i
                  className="ph ph-warning-circle text-danger"
                  style={{ fontSize: "48px" }}
                ></i>
              </div>
              <h5 className="text-danger mb-16">Hata Oluştu</h5>
              <p className="text-neutral-600 mb-24">{error}</p>
              {onRetry && (
                <button className="btn btn-outline-main" onClick={onRetry}>
                  <i className="ph ph-arrow-clockwise me-8"></i>
                  Tekrar Dene
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorState;
