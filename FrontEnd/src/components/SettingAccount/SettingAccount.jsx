import account from "../../../src/assets/img/account.jpg";
import Footer from "../Footer/Footer";

export default function SettingAccount({ isPadded }) {
  return (
    <>
      <div
        className="main flex"
        style={{ paddingLeft: isPadded ? "200px" : "60px" }}
      >
        <div className="maincontent">
          <div className="main-content" id="setting-account">
            <h1>Setting</h1>
            <div className="setting-account-personal-information">
              <h2>Personal information</h2>
              <div className="setting-account-personal-information-picture padding-24px">
                <h3>Profile picture</h3>
                <div className="setting-account-personal-information-setting-picture flex">
                  <img src={account} alt="" className="account-defalt" />
                  <div className="set-picture">
                    <img src={account} alt="" />
                    <button className="add-picture">
                      <i class="fa-solid fa-plus"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className="setting-account-personal-information-username padding-24px flex">
                <div className="setting-account-personal-information-username-title">
                  <h3>Username</h3>
                  <p>thien2805</p>
                </div>
                <button>
                  <p>Edit</p>
                </button>
              </div>
              <div className="setting-account-personal-information-email padding-24px flex">
                <div className="setting-account-personal-information-username-title">
                  <h3>Email</h3>
                  <p>khongthien2805@gmail.com</p>
                </div>
                <button>
                  <p>Edit</p>
                </button>
              </div>
              <div className="setting-account-personal-information-account-type padding-24px flex">
                <h3>Account type</h3>
                <button className="flex">
                  <p>Student</p>
                  <i class="fa-solid fa-plus"></i>
                </button>
              </div>
            </div>
            <div className="setting-account-personal-information">
              <h2>Appearance</h2>
              <div className="setting-account-personal-information-theme padding-24px flex">
                <h3>Theme</h3>
                <button className="flex">
                  <p>Dark</p>
                  <i class="fa-solid fa-plus"></i>
                </button>
              </div>
              <div className="setting-account-personal-information-language padding-24px flex">
                <h3>Language</h3>
                <button className="flex">
                  <p>English (USA)</p>
                  <i class="fa-solid fa-plus"></i>
                </button>
              </div>
            </div>
            <div className="setting-account-personal-information">
              <h2>Account and privacy</h2>
              <div className="setting-account-personal-information-create padding-24px flex">
                <h3>Create a Quizlet password</h3>
                <button className="flex">
                  <p>Create</p>
                  <i class="fa-solid fa-plus"></i>
                </button>
              </div>
              <div className="setting-account-personal-information-connect-facebook padding-24px flex">
                <h3>Connect your Facebook account</h3>
                <button className="flex">
                  <i class="fa-brands fa-facebook"></i>
                  <p>Link Facebook</p>
                </button>
              </div>
              <div className="setting-account-personal-information-privacy padding-24px">
                <h3>Delete</h3>
                <div className="delete-setting-account flex">
                  <div className="delete-setting-account-title">
                    <h4>Delete your account</h4>
                    <p>This will delete all your data and cannot be undone.</p>
                  </div>
                  <button className="">
                    <p>Delete</p>
                  </button>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}
