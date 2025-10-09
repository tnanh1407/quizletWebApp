import "./CssSectionUpgradeOption.css";

export default function SectionUpgradeOptionAnnually({ upgradeAnnually }) {
  if (!upgradeAnnually) return null;
  return (
    <>
      <div className="upgrade-option">
        <div className="upgrade-option-header">
          <h1>{upgradeAnnually.title}</h1>
          <p>{upgradeAnnually.desc}</p>
        </div>
        <div className="upgrade-option-main">
          <div className="upgrade-option-main-header flex">
            <h2>{upgradeAnnually.discountedMonthly}</h2>
            <p>/ month</p>
          </div>
          <p>Billed at {upgradeAnnually.priceAnnually}/year</p>
        </div>
        <button className="button-upgrade">
          <p>Upgrade</p>
        </button>
        <div className="upgrade-benefit">
          {upgradeAnnually.benefit.map((item) => (
            <div className="upgrade-benefit-list flex" key={item}>
              <i className="fa-solid fa-check"></i>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
