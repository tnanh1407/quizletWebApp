import SectionUpgradeOption from "../../../Sections/Upgrade/SectionUpgradeOption.jsx";
import { upgradeApi } from "../../../../api/upgradeApi.js";
import { useEffect, useState } from "react";

export default function Monthly() {
  const [upgrade, setUpgrade] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ID cố định của document gói Monthly
        const data = await upgradeApi.getById("68e8ad357674e980fe20a234");
        setUpgrade(data);
      } catch (err) {
        console.error("Error fetching monthly upgrade data:", err);
      }
    };

    fetchData();
  }, []);

  if (!upgrade) {
    return <p>Loading monthly plans...</p>;
  }

  return (
    <div className="upgrade-grip">
      {upgrade.option?.map((section) => (
        <SectionUpgradeOption
          key={section._id} // Sử dụng _id từ MongoDB
          upgrade={{
            ...section,
            discount:
              parseFloat(section.discount) || parseFloat(upgrade.discount) || 0, // fallback discount từ document cha
          }}
        />
      ))}
    </div>
  );
}
