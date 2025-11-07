import React from "react";

export const InfoSection: React.FC = () => {
  return (
    <div className="row">
      <div className="col-12">
        <div className="info-section">
          <i className="ph-bold ph-info info-section__icon"></i>
          <h3 className="info-section__title">Daha Fazla Bilgi</h3>
          <p className="info-section__description">
            Platform hakkında daha detaylı bilgi almak, sorularınızı sormak veya
            demo talep etmek için destek ekibimizle iletişime geçebilirsiniz.
          </p>
        </div>
      </div>
    </div>
  );
};
