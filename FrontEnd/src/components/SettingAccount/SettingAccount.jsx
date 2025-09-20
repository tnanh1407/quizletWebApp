import account from "../../../src/assets/img/account.jpg";
import "./CssSettingAccount.css";
import { userApi } from "../../api/userApi";
import { useEffect, useState } from "react";

export default function SettingAccount({ isPadded, id }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchuser = async () => {
      try {
        const data = await userApi.getById(id);
        setUser(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchuser();
  }, [id]);

  if (!user) {
    return (
      <div
        className="main flex"
        style={{ paddingLeft: isPadded ? "200px" : "60px" }}
      >
        <div className="maincontent">
          <div className="main-content" id="setting-account">
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

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
              <div className="setting-account-personal-block">
                <div className="setting-account-personal-information-picture padding-24px border-bottom-2px">
                  <h3>Profile picture</h3>
                  <div className="setting-account-personal-information-setting-picture flex">
                    <img src={account} alt="" className="account-defalt" />
                    <div className="set-picture">
                      <img src={account} alt="" />
                      <img src={account} alt="" />
                      <img src={account} alt="" />
                      <img src={account} alt="" />
                      <img src={account} alt="" />
                      <img src={account} alt="" />
                      <img src={account} alt="" />
                      <img src={account} alt="" />
                      <img src={account} alt="" />
                      <img src={account} alt="" />
                      <img src={account} alt="" />
                      <img src={account} alt="" />
                      <img src={account} alt="" />
                      <img src={account} alt="" />
                      <img src={account} alt="" />
                      <img src={account} alt="" />
                      <img src={account} alt="" />
                      <img src={account} alt="" />
                      <img src={account} alt="" />
                      <img src={account} alt="" />
                      <img src={account} alt="" />
                      <img src={account} alt="" />
                      <img src={account} alt="" />
                      <img src={account} alt="" />
                      <img src={account} alt="" />
                      <img src={account} alt="" />
                      <img src={account} alt="" />
                      <img src={account} alt="" />
                      <img src={account} alt="" />
                      <img src={account} alt="" />
                      <img src={account} alt="" />
                      <img src={account} alt="" />
                      {/* <button className="add-picture">
                        <i class="fa-solid fa-plus"></i>
                      </button> */}
                    </div>
                  </div>
                </div>
                <div className="setting-account-personal-information-username padding-24px flex border-bottom-2px">
                  <div className="setting-account-personal-information-username-title">
                    <h3>Username</h3>
                    <p>{user.username}</p>
                  </div>
                  <button>
                    <p>Edit</p>
                  </button>
                </div>
                <div className="setting-account-personal-information-email padding-24px flex border-bottom-2px">
                  <div className="setting-account-personal-information-username-title">
                    <h3>Email</h3>
                    <p>{user.email}</p>
                  </div>
                  <button>
                    <p>Edit</p>
                  </button>
                </div>
                <div className="setting-account-personal-information-account-type padding-24px flex">
                  <h3>Account type</h3>
                  <button className="flex">
                    <p>Student</p>
                    <i class="fa-solid fa-plus margin-left"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="setting-account-personal-information">
              <h2>Appearance</h2>
              <div className="setting-account-personal-block">
                <div className="setting-account-personal-information-theme padding-24px flex border-bottom-2px">
                  <h3>Theme</h3>
                  <button className="flex">
                    <p>Dark</p>
                    <i class="fa-solid fa-plus margin-left"></i>
                  </button>
                </div>
                <div className="setting-account-personal-information-language padding-24px flex ">
                  <h3>Language</h3>
                  <button className="flex">
                    <p>English (USA)</p>
                    <i class="fa-solid fa-plus margin-left"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="setting-account-personal-information-account-privacy">
              <h2>Account and privacy</h2>
              <div className="setting-account-personal-block">
                <div className="setting-account-personal-information-create padding-24px flex border-bottom-2px">
                  <h3>Create a Quizlet password</h3>
                  <button className="flex">
                    <p>Create</p>
                    <i class="fa-solid fa-plus margin-left"></i>
                  </button>
                </div>
                <div className="setting-account-personal-information-connect-facebook padding-24px flex border-bottom-2px">
                  <h3>Connect your Facebook account</h3>
                  <button className="flex">
                    <i class="fa-brands fa-facebook margin-right"></i>
                    <p>Link Facebook</p>
                  </button>
                </div>
                <div className="setting-account-personal-information-delete padding-24px">
                  <div className="delete-setting-account flex">
                    <div className="delete-setting-account-title">
                      <h3>Delete your account</h3>
                      <p>
                        This will delete all your data and cannot be undone.
                      </p>
                    </div>
                    <button className="button-delete-setting-account">
                      <p>Delete</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* <Footer /> */}
          </div>
        </div>
      </div>
    </>
  );
}
