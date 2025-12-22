import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Şirket - Tedarik",
  description: "Şirket tedarik yönetim paneli",
};

const SupplyCompanyPage: React.FC = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="page-header">
            <h1>Şirket Tedarik Yönetimi</h1>
            <p className="text-muted">
              Şirket bazında tedarik süreçlerinizi buradan yönetebilirsiniz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplyCompanyPage;
