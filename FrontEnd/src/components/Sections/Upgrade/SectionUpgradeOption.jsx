import "./CssSectionUpgradeOption.css";
import { Link } from "react-router-dom";

export default function SectionUpgradeOption({ upgrade }) {
  if (!upgrade) return null;

  const { title, desc, priceMonthly, discount = 0, benefit = [] } = upgrade;

  const hasDiscount = parseFloat(discount) > 0;
  const price = parseFloat(priceMonthly).toFixed(2);
  const discountedPrice = (priceMonthly * (1 - discount)).toFixed(2);

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
              <h2 className="old-price">${price}</h2>
            </>
          ) : (
            <h2>${price}</h2>
          )}
          <p>/ month</p>
        </div>
        <p className="monthly-text">Recurring billing. Cancel anytime.</p>
      </div>

      {/* Button */}
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
