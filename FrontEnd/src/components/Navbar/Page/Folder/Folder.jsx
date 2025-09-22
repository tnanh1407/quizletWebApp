import "./CssFolder.css";
import { Link } from "react-router-dom";
import ItemsSeeDemo from "../../../../other/Demo/SeeDemo/Items/ItemsSeeDemo";

export default function Folder() {
  return (
    <>
      <h1>Folder</h1>
      <Link to="/folder/:id"></Link>
      <ItemsSeeDemo />
    </>
  );
}
