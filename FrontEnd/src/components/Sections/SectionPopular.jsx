import sach from "../../assets/img/imgSach.jpg";

export default function SectionPopular() {
  return (
    <div className="popular-textbooks margin-bottom-50 padding-16">
      <h2 className="h2">Popular textbooks</h2>
      <div className="popular-textbooks-main flex">
        <a href="">
          <div className="popular-session flex all-section">
            <img src={sach} alt="" />
            <div className="popular-session-content">
              <h1>English Grammar in Use</h1>
              <p>4th Edition•ISBN: 9780521189088 Raymond Murphy</p>
              <div className="popular-session-solution flex">
                <i className="fa-solid fa-thumbs-up"></i>
                <p>999 solutions</p>
              </div>
            </div>
          </div>
        </a>
        <a href="">
          <div className="popular-session flex all-section">
            <img src={sach} alt="" />
            <div className="popular-session-content">
              <h1>English Grammar in Use</h1>
              <p>4th Edition•ISBN: 9780521189088 Raymond Murphy</p>
              <div className="popular-session-solution flex">
                <i className="fa-solid fa-thumbs-up"></i>
                <p>999 solutions</p>
              </div>
            </div>
          </div>
        </a>
        <a href="">
          <div className="popular-session flex all-section">
            <img src={sach} alt="" />
            <div className="popular-session-content">
              <h1>English Grammar in Use</h1>
              <p>4th Edition•ISBN: 9780521189088 Raymond Murphy</p>
              <div className="popular-session-solution flex">
                <i className="fa-solid fa-thumbs-up"></i>
                <p>999 solutions</p>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}
