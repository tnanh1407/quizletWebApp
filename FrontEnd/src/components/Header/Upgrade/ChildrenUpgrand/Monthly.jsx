import SectionUpgradeOption from "../../../Sections/Upgrade/SectionUpgradeOption.jsx";
import { upgradeApi } from "../../../../api/upgradeApi.js";
import { useEffect, useState } from "react";

export default function Monthly() {
  const [upgrade, setUpgrade] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await upgradeApi.getAll();
        setUpgrade(data);
      } catch (err) {
        console.error("Error ", err);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <div className="upgrade-grip">
        {upgrade &&
          upgrade?.map((section) => (
            <SectionUpgradeOption key={section.id} upgrade={section} />
          ))}
      </div>
    </>
  );
}
