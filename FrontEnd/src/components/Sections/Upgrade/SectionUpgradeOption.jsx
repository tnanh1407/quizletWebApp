import "./CssSectionUpgradeOption.css";

export default function SectionUpgradeOption({ upgrade }) {
  if (!upgrade) return null;
  return (
    <>
      <div className="upgrade-option">
        <div className="upgrade-option-header">
          <h1>{upgrade.title}</h1>
          <p>{upgrade.desc}</p>
        </div>
        <div className="upgrade-option-main">
          <div className="upgrade-option-main-header flex">
            <h2>{upgrade.priceMonthly}</h2>
            <p>/ month</p>
          </div>
          <p>Recurring billing. Cancel anytime.</p>
        </div>
        <button className="button-upgrade">
          <p>Upgrade</p>
        </button>
        <div className="upgrade-benefit">
          {upgrade.benefit.map((item) => (
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
