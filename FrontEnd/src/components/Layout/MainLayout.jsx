import Header from "../Header/Header";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";

export default function MainLayout({ togglePadding }) {
  return (
    <>
      <Header />
      <Navbar togglePadding={togglePadding} />
      <Outlet /> {/* Các route con sẽ render ở đây */}
    </>
  );
}
