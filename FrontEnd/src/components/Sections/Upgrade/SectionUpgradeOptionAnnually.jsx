import "./CssSectionUpgradeOption.css";
import { Link } from "react-router-dom";

export default function SectionUpgradeOptionAnnually({ upgradeAnnually }) {
  if (!upgradeAnnually) return null;

  const {
    title,
    desc,
    priceMonthly = 0,
    discountedMonthly,
    priceAnnually,
    discount = 0,
    benefit = [],
  } = upgradeAnnually;

  const hasDiscount = parseFloat(discount) > 0;
  const monthlyPrice = parseFloat(priceMonthly).toFixed(2);
  const discountedPrice = parseFloat(discountedMonthly).toFixed(2);
  const annualPrice = parseFloat(priceAnnually).toFixed(2);

  return (
    <div className="upgrade-option">
      {/* Header */}
      <div className="upgrade-option-header">
        <h1>{title}</h1>
        <p>{desc}</p>
      </div>

      {/* Pricing */}
      <div className="upgrade-option-main">
        <div className="upgrade-option-main-header flex">
          {hasDiscount ? (
            <>
              <h2 className="new-price">${discountedPrice}</h2>
            </>
          ) : (
            <h2>${monthlyPrice}</h2>
          )}
          <p>/ month</p>
        </div>

        <p className="annual-text">
          Billed at <strong>${annualPrice}</strong> / year
          {hasDiscount && (
            <span className="discount-label">
              {" "}
              ({(discount * 100).toFixed(0)}% off)
            </span>
          )}
        </p>
      </div>

      {/* Upgrade button */}
      <Link to="/checkout">
        <div className="button-upgrade">
          <p>Upgrade</p>
        </div>
      </Link>

      {/* Benefits */}
      <div className="upgrade-benefit">
        {benefit.map((item, index) => (
          <div className="upgrade-benefit-list flex" key={index}>
            <i className="fa-solid fa-check"></i>
            <p>{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
