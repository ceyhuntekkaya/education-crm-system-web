import { useMembership } from "../context";

const PricingToggle = () => {
  const { isYearly, yearlyDiscount, toggleBillingPeriod } = useMembership();

  return (
    <div className="mb-40 d-flex align-items-center gap-24 justify-content-center">
      <span className="text-neutral-700 fw-semibold">Aylık</span>
      <div className="form-check form-switch">
        <input
          className="form-check-input shadow-none py-10 px-24"
          type="checkbox"
          role="switch"
          checked={isYearly}
          onChange={toggleBillingPeriod}
        />
      </div>
      <span className="text-neutral-700 fw-semibold">
        Yıllık{" "}
        <span className="text-main-600">(%{yearlyDiscount} İndirim)</span>
      </span>
    </div>
  );
};

export default PricingToggle;
