import Link from "next/link";
import { MembershipPlan } from "../types";
import { formatCurrency, getMonthlyEquivalent } from "../utils";
import { useMembership } from "../context";

interface MembershipCardProps {
  plan: MembershipPlan;
  index: number;
}

const MembershipCard = ({ plan, index }: MembershipCardProps) => {
  const { isYearly } = useMembership();

  const currentPrice = isYearly ? plan.price.yearly : plan.price.monthly;
  const displayPrice = isYearly
    ? getMonthlyEquivalent(currentPrice)
    : currentPrice;
  const priceLabel = isYearly ? "/Ay (Yıllık)" : "/Ay";

  return (
    <div
      className="col-xl-4 col-md-4 col-sm-6 aos-init"
      data-aos="fade-up"
      data-aos-duration={(index + 1) * 200 + 400}
    >
      <div
        className={`bg-white border ${
          plan.isPopular ? "border-main-600" : "border-neutral-30"
        } animation-item rounded-16 p-12 position-relative`}
      >
        {plan.isPopular && (
          <div className="position-absolute top-0 start-50 translate-middle">
            <span className="bg-main-600 text-white px-16 py-4 rounded-pill text-sm fw-semibold">
              En Popüler
            </span>
          </div>
        )}
        <div className="bg-main-25 p-32 rounded-16 transition-2 border border-neutral-30 overflow-hidden position-relative">
          <span className="positioned-rotation text-main-600 fw-bold text-lg bg-white d-block text-center p-6">
            {plan.name}
          </span>
          <div className="w-84 h-84 bg-white p-16 box-shadow-md rounded-circle mx-auto d-inline-flex align-items-center justify-content-center position-relative text-main-600 text-44 border border-neutral-30">
            <i className={plan.icon} />
          </div>
          <h1 className="display-4 fw-bold mb-0 mt-32 text-neutral-700 transition-2">
            {formatCurrency(displayPrice)}
            <span className="text-sm fw-normal">{priceLabel}</span>
          </h1>
          {isYearly && (
            <p className="text-center text-success fw-semibold mt-8">
              Yıllık {formatCurrency(currentPrice)} ödeyerek %30 tasarruf edin
            </p>
          )}
          <span className="d-block border border-neutral-30 my-24 border-dashed" />
          <ul className="d-flex flex-column gap-16">
            {plan.features.map((feature, featureIndex) => (
              <li
                key={feature.id}
                className={`flex-align gap-12 aos-init aos-animate ${
                  feature.highlight ? "text-main-600" : "text-neutral-700"
                }`}
                data-aos="fade-left"
                data-aos-duration={(featureIndex + 1) * 200}
              >
                {feature.included ? (
                  <i className="text-success-600 ph-bold ph-check" />
                ) : (
                  <i className="text-danger-600 ph-bold ph-x" />
                )}
                <span
                  className={`text-md fw-medium ${
                    feature.included ? "text-neutral-500" : "text-neutral-400"
                  } ${feature.highlight ? "fw-bold" : ""}`}
                >
                  {feature.text}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-40">
            <Link
              href={plan.buttonLink}
              className={`btn ${
                plan.isPopular ? "btn-main" : "btn-main"
              } rounded-pill flex-align gap-8 justify-content-center w-100`}
            >
              {plan.buttonText}
              <i className="ph-bold ph-arrow-up-right d-flex text-lg" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipCard;
