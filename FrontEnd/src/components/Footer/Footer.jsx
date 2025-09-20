import "./CssFooter.css";

export default function Footer() {
  return (
    <div className="footer flex">
      <div className="footer-other flex">
        <a href="">
          <p>Privacy</p>
        </a>
        <a href="">
          <p>Terms</p>
        </a>
      </div>
      <div className="footer-language">
        <p>English</p>
      </div>
    </div>
  );
}
