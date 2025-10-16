import logo from "../../../../../assets/img/logoQ.png";
import { Link } from "react-router-dom";
import "./CssCheckOut.css";

export default function CheckOut() {
  return (
    <>
      <div className="upgrade-header">
        <Link to="/">
          <img src={logo} alt="" />
        </Link>
      </div>
      <div className="check-out">
        <div className="check-out-container">
          <h1>Check out to get Quizlet superpowers</h1>
          <div className="check-out-main flex">
            <div className="chech-out-option ">
              <div className="chech-out-option-header flex">
                <h3>Quizlet Plus</h3>
                <p>Change plan</p>
              </div>
              <div className="chech-out-option-main">
                <div className="block input-option">
                  <div className="option-header flex">
                    <span className="flex">
                      <input type="radio" name="term-def" />
                      <p>Annual</p>
                    </span>
                    <h5>Free trial</h5>
                  </div>
                  <p>$35.99/year - that's like $2.99 a month</p>
                </div>
                <div className=" block input-option">
                  <div className="option-header flex">
                    <span className="flex">
                      <input type="radio" name="term-def" />
                      <p>Monthly</p>
                    </span>
                  </div>
                  <p>$7.99/month</p>
                </div>
              </div>
            </div>
            <div className="quick-checkout">
              <h1>Quick checkout</h1>
              <h2>Pay with a card</h2>
              <form action="">
                <div className="card-number">
                  <p>Card number</p>
                  <input type="text" />
                </div>
                <div className="card-number">
                  <p>Name on card</p>
                  <input type="text" />
                </div>
                <div className="card-number flex">
                  <div className="expiration-date">
                    <p>Expiration date</p>
                    <div className="expiration-date-main">
                      <input type="text" />
                      <input type="text" />
                    </div>
                  </div>
                  <div className="cvc">
                    <p>CVC</p>
                    <input type="text" />
                  </div>
                </div>
                <div className="card-number">
                  <p>Country</p>
                  <input type="text" />
                </div>
                <button>
                  <p>Complete purchase</p>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
