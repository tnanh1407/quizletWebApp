import { Outlet, useLocation } from "react-router-dom";
import HeaderFunction from "../FlashCardItems/FunctionFlashCard/HeaderFunction/HeaderFunction";

export default function MainLayout() {
  const location = useLocation();
  const hideHeader =
    location.state?.isCompleted ||
    location.state?.isFinished ||
    location.state?.showStats;

  return (
    <>
      {!hideHeader && <HeaderFunction />}
      <Outlet />
    </>
  );
}
