import { FOOTER_CONFIG } from "../config";

export const Copyright = () => {
  return (
    <div className="left-section">
      <p className="bottom-footer__text mb-0">
        Copyright © {FOOTER_CONFIG.copyrightYear}{" "}
        <span className="fw-semibold">{FOOTER_CONFIG.companyName}</span> All
        Rights Reserved.
      </p>
    </div>
  );
};
