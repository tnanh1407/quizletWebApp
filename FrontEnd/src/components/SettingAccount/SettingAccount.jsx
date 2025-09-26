import account from "../../../src/assets/img/account.jpg";
import "./CssSettingAccount.css";
import { userApi } from "../../api/userApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SettingAccount() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Lấy thông tin user hiện tại
        const data = await userApi.getMe();
        setUser(data);
      } catch (err) {
        console.error("Lỗi lấy profile:", err);
        setError("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
        localStorage.removeItem("token");
        navigate("/sign-in");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!user) return <p>Không tìm thấy thông tin user</p>;

  return (
    <>
      <div id="setting-account">
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
                <p>{user.role || "Student"}</p>
                <i className="fa-solid fa-plus margin-left"></i>
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
                  <p>This will delete all your data and cannot be undone.</p>
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
    </>
  );
}
