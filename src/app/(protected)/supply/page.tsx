import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tedarik Yönetimi",
  description: "Tedarik ve satın alma yönetim paneli",
};

const SupplyPage: React.FC = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="page-header">
            <h1>Tedarik Yönetimi</h1>
            <p className="text-muted">
              Tedarik süreçlerinizi buradan yönetebilirsiniz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplyPage;
