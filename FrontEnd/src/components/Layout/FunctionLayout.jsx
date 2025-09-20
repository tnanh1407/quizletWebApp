import { Outlet } from "react-router-dom";
import HeaderFunction from "../FlashCardItems/FunctionFlashCard/HeaderFunction/HeaderFunction";

export default function MainLayout() {
  return (
    <>
      <HeaderFunction />
      <Outlet />
    </>
  );
}
