import Upgrade from "../Header/Upgrade/Upgrade";
import { Outlet, Link } from "react-router-dom";
import logo from "../../assets/img/logoQ.png";
import "../Header/Upgrade/CssUpgrade.css";

export default function UpgradeLayout() {
  return (
    <>
      <div className="upgrade-header">
        <Link to="/">
          <img src={logo} alt="" />
        </Link>
      </div>
      <Upgrade />
    </>
  );
}
