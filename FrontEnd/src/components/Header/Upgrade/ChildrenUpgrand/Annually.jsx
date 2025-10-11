import SectionUpgradeOptionAnnually from "../../../Sections/Upgrade/SectionUpgradeOptionannually.jsx";
import { upgradeApi } from "../../../../api/upgradeApi.js";
import { useEffect, useState } from "react";

export default function Annually() {
  const [upgradeAnnually, setUpgradeAnnually] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Nếu chỉ có 1 document duy nhất thì chỉ cần getById() với ID cố định hoặc getFixed()
        const data = await upgradeApi.getById("68e8ad357674e980fe20a234");
        setUpgradeAnnually(data);
      } catch (err) {
        console.error("Error fetching upgrade data:", err);
      }
    };

    fetchData();
  }, []);

  if (!upgradeAnnually) {
    return <p>Loading upgrade options...</p>;
  }

  return (
    <div className="upgrade-grip">
      {upgradeAnnually.option?.map((section) => {
        // Giá gốc theo tháng
        const price = parseFloat(section.priceMonthly) || 0;

        // Ưu tiên discount riêng của option, nếu không có thì lấy discount tổng của document
        const discount =
          parseFloat(section.discount) ||
          parseFloat(upgradeAnnually.discount) ||
          0;

        // Tính giá sau giảm
        const discountedMonthly = (price * (1 - discount)).toFixed(2);
        const priceAnnually = (price * 12 * (1 - discount)).toFixed(2);

        return (
          <SectionUpgradeOptionAnnually
            key={section._id}
            upgradeAnnually={{
              ...section,
              discountedMonthly,
              priceAnnually,
              discount,
            }}
          />
        );
      })}
    </div>
  );
}
