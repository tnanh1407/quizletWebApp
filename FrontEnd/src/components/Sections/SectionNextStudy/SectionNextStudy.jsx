import SectionNextStudyItem from "./SectionNextStudyItem/SectionNextStudyItem";
import { Link } from "react-router-dom";
import account from "../../../assets/img/account.jpg";
import { useRef, useEffect } from "react";

export default function SectionNextStudy() {
  const movieItemRef = useRef(null);
  const btnLeftRef = useRef(null);
  const btnRightRef = useRef(null);

  useEffect(() => {
    const itemList = movieItemRef.current;
    const btnLeft = btnLeftRef.current;
    const btnRight = btnRightRef.current;

    if (!itemList || !btnLeft || !btnRight) return;

    const scrollStep = 1245; // bước cuộn

    const handleLeft = () => {
      if (itemList.scrollLeft === 0) {
        // nếu đang ở đầu -> nhảy về cuối
        itemList.scrollTo({
          left: itemList.scrollWidth,
          behavior: "smooth",
        });
      } else {
        itemList.scrollBy({ left: -scrollStep, behavior: "smooth" });
      }
    };

    const handleRight = () => {
      if (itemList.scrollLeft + itemList.clientWidth >= itemList.scrollWidth) {
        // nếu đang ở cuối -> nhảy về đầu
        itemList.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        itemList.scrollBy({ left: scrollStep, behavior: "smooth" });
      }
    };

    btnLeft.addEventListener("click", handleLeft);
    btnRight.addEventListener("click", handleRight);

    return () => {
      btnLeft.removeEventListener("click", handleLeft);
      btnRight.removeEventListener("click", handleRight);
    };
  }, []);
  return (
    <section className="maincontent-next-study-session margin-bottom-50 padding-16">
      <h2>For your next study session</h2>
      <div className="next-study-session-main">
        <button className="moveNavBtn moveNavLeft" ref={btnLeftRef}>
          &#10094;
        </button>

        <div ref={movieItemRef} className="a-itemflashcard">
          <SectionNextStudyItem />
          <SectionNextStudyItem />
          <SectionNextStudyItem />
          <SectionNextStudyItem />
          <SectionNextStudyItem />
          <SectionNextStudyItem />
          <SectionNextStudyItem />
          <SectionNextStudyItem />
          <SectionNextStudyItem />
          <SectionNextStudyItem />
          <SectionNextStudyItem />
          <SectionNextStudyItem />
          <SectionNextStudyItem />
          <SectionNextStudyItem />
          <SectionNextStudyItem />
          <SectionNextStudyItem />
          <SectionNextStudyItem />
          <SectionNextStudyItem />
          <SectionNextStudyItem />
          <SectionNextStudyItem />
          <SectionNextStudyItem />
        </div>

        <button className="moveNavBtn moveNavRight" ref={btnRightRef}>
          &#10095;
        </button>
      </div>
    </section>
  );
}
