import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "../../Footer/Footer";
import { upgradeApi } from "../../../api/upgradeApi";

export default function Upgrade() {
  const [active, setActive] = useState("monthly");
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
      <div className="upgrade">
        <div className="upgrade-main">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1200"
            height="1000"
            fill="none"
            viewBox="0 0 1280 800"
            class="dweb"
          >
            <path
              fill="url(#paint0_linear_8308_10747)"
              fill-rule="evenodd"
              d="M714.779-807.818c129.084-127.859 338.371-127.859 467.451.001 129.08 127.859 129.08 335.159 0 463.019L949.511-114.285c84.259.252 168.439 32.216 232.719 95.893 129.08 127.859 129.08 335.16 0 463.019L972.5 652.37c76.43 5.476 151.3 37.155 209.73 95.035 129.08 127.86 129.08 335.165 0 463.015l-617.966 612.11c-129.083 127.86-338.368 127.86-467.452 0-129.083-127.86-129.083-335.16 0-463.02l209.732-207.74c-76.426-5.48-151.297-37.16-209.732-95.04-129.083-127.855-129.083-335.156 0-463.015l232.72-230.513c-84.256-.253-168.434-32.217-232.72-95.893-129.083-127.86-129.083-335.16 0-463.02z"
              clip-rule="evenodd"
            ></path>
            <defs>
              <linearGradient
                id="paint0_linear_8308_10747"
                x1="639.522"
                x2="639.522"
                y1="-903.712"
                y2="1918.43"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#4255FF" stop-opacity="0.3"></stop>
                <stop offset="1" stop-color="#4255FF" stop-opacity="0"></stop>
              </linearGradient>
            </defs>
          </svg>
          <h1>Get better grades with the #1 learning platform</h1>
          <div className="option-upgrade flex">
            <Link
              to="/monthly"
              className={`monthly-upgrade ${
                active === "monthly" ? "active-button-upgrade" : ""
              }`}
              onClick={() => setActive("monthly")}
            >
              <p>Monthly</p>
            </Link>
            <Link
              to="/annually"
              onClick={() => setActive("annually")}
              className={` ${
                active === "annually" ? "active-button-upgrade" : ""
              }`}
            >
              <p>Annually (Save 50%)</p>
            </Link>
          </div>
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
}
