import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tedarikçi - Tedarik",
  description: "Tedarikçi yönetim paneli",
};

const SupplySupplierPage: React.FC = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="page-header">
            <h1>Tedarikçi Yönetimi</h1>
            <p className="text-muted">
              Tedarikçi süreçlerinizi buradan yönetebilirsiniz. Bu alana sadece
              SUPPLY rolüne sahip kullanıcılar erişebilir.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplySupplierPage;
