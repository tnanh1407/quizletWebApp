import SectionUpgradeOptionAnnually from "../../../Sections/Upgrade/SectionUpgradeOptionannually.jsx";
import { upgradeApi } from "../../../../api/upgradeApi.js";
import { useEffect, useState } from "react";

export default function Annually() {
  const [upgradeAnnually, setUpgradeAnnually] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await upgradeApi.getAll();
        setUpgradeAnnually(data);
      } catch (err) {
        console.error("Error ", err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="upgrade-grip">
        {upgradeAnnually &&
          upgradeAnnually?.map((section) => {
            const price = parseFloat(section.priceMonthly) || 0;
            const discount = parseFloat(section.discount) || 0;

            const discountedMonthly = (price * (1 - discount)).toFixed(2);
            const priceAnnually = (price * 12 * (1 - discount)).toFixed(2);
            return (
              <SectionUpgradeOptionAnnually
                key={section.id}
                upgradeAnnually={{
                  ...section,
                  discountedMonthly,
                  priceAnnually,
                }}
              />
            );
          })}
      </div>
    </>
  );
}
