import { Link } from "react-router-dom";
import account from "../../assets/img/account.jpg";
import { useRef, useEffect } from "react";

export default function SectionTopCreators() {
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
      <h2 className="h2">Top creators</h2>
      <div className="next-study-session-main">
        <button className="moveNavBtn moveNavLeft" ref={btnLeftRef}>
          &#10094;
        </button>
        <div className="top-creators-main flex" ref={movieItemRef}>
          <Link to="/creators">
            <div className="session all-section">
              <img src={account} alt="" />
              <div className="creator-in4">
                <div className="creator-rule flex">
                  <h3>Thien</h3>
                  <div className="creator-rule-important">
                    <p>Teacher</p>
                  </div>
                </div>
                <div className="creator-tag flex">
                  <div className="flex khung-mo-ta">
                    <i className="fa-solid fa-thumbs-up"></i>
                    <p>flashcard sets</p>
                  </div>
                  <div className="flex khung-mo-ta">
                    <i className="fa-solid fa-thumbs-up"></i>
                    <p>0 classNamees</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <Link to="/creators">
            <div className="session all-section">
              <img src={account} alt="" />
              <div className="creator-in4">
                <div className="creator-rule flex">
                  <h3>Thien</h3>
                  <div className="creator-rule-important">
                    <p>Teacher</p>
                  </div>
                </div>
                <div className="creator-tag flex">
                  <div className="flex khung-mo-ta">
                    <i className="fa-solid fa-thumbs-up"></i>
                    <p>flashcard sets</p>
                  </div>
                  <div className="flex khung-mo-ta">
                    <i className="fa-solid fa-thumbs-up"></i>
                    <p>0 classNamees</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <Link to="/creators">
            <div className="session all-section">
              <img src={account} alt="" />
              <div className="creator-in4">
                <div className="creator-rule flex">
                  <h3>Thien</h3>
                  <div className="creator-rule-important">
                    <p>Teacher</p>
                  </div>
                </div>
                <div className="creator-tag flex">
                  <div className="flex khung-mo-ta">
                    <i className="fa-solid fa-thumbs-up"></i>
                    <p>flashcard sets</p>
                  </div>
                  <div className="flex khung-mo-ta">
                    <i className="fa-solid fa-thumbs-up"></i>
                    <p>0 classNamees</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <Link to="/creators">
            <div className="session all-section">
              <img src={account} alt="" />
              <div className="creator-in4">
                <div className="creator-rule flex">
                  <h3>Thien</h3>
                  <div className="creator-rule-important">
                    <p>Teacher</p>
                  </div>
                </div>
                <div className="creator-tag flex">
                  <div className="flex khung-mo-ta">
                    <i className="fa-solid fa-thumbs-up"></i>
                    <p>flashcard sets</p>
                  </div>
                  <div className="flex khung-mo-ta">
                    <i className="fa-solid fa-thumbs-up"></i>
                    <p>0 classNamees</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <Link to="/creators">
            <div className="session all-section">
              <img src={account} alt="" />
              <div className="creator-in4">
                <div className="creator-rule flex">
                  <h3>Thien</h3>
                  <div className="creator-rule-important">
                    <p>Teacher</p>
                  </div>
                </div>
                <div className="creator-tag flex">
                  <div className="flex khung-mo-ta">
                    <i className="fa-solid fa-thumbs-up"></i>
                    <p>flashcard sets</p>
                  </div>
                  <div className="flex khung-mo-ta">
                    <i className="fa-solid fa-thumbs-up"></i>
                    <p>0 classNamees</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <Link to="/creators">
            <div className="session all-section">
              <img src={account} alt="" />
              <div className="creator-in4">
                <div className="creator-rule flex">
                  <h3>Thien</h3>
                  <div className="creator-rule-important">
                    <p>Teacher</p>
                  </div>
                </div>
                <div className="creator-tag flex">
                  <div className="flex khung-mo-ta">
                    <i className="fa-solid fa-thumbs-up"></i>
                    <p>flashcard sets</p>
                  </div>
                  <div className="flex khung-mo-ta">
                    <i className="fa-solid fa-thumbs-up"></i>
                    <p>0 classNamees</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <Link to="/creators">
            <div className="session all-section">
              <img src={account} alt="" />
              <div className="creator-in4">
                <div className="creator-rule flex">
                  <h3>Thien</h3>
                  <div className="creator-rule-important">
                    <p>Teacher</p>
                  </div>
                </div>
                <div className="creator-tag flex">
                  <div className="flex khung-mo-ta">
                    <i className="fa-solid fa-thumbs-up"></i>
                    <p>flashcard sets</p>
                  </div>
                  <div className="flex khung-mo-ta">
                    <i className="fa-solid fa-thumbs-up"></i>
                    <p>0 classNamees</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
        <button className="moveNavBtn moveNavRight" ref={btnRightRef}>
          &#10095;
        </button>
      </div>
    </section>
  );
}
