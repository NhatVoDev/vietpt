import { useEffect, useState } from "react";
import "./information.css";
import http from "../../api/http";
import { toast } from "react-toastify";
import ProfileForm from "./ProfileForm";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, setUser } = useAuthStore();
  const [prompts, setPrompts] = useState([]);
  const navigate = useNavigate();
  const fetchProfile = async () => {
    try {
      const response = await http.get("/user/profile");
      if (response.status === 200) {
        setUser(response.data.metadata);
      } else {
        toast.error("Lỗi khi lấy thông tin người dùng");
      }
    } catch (error) {
      toast.error(
        error.response.data.message || "Lỗi khi lấy thông tin người dùng"
      );
    }
  };

  const fetchPrompts = async () => {
    try {
      const response = await http.get("/package/owner");
      if (response.status === 200) {
        setPrompts(response.data.metadata.packages);
      } else {
        toast.error("Lỗi khi lấy danh sách gói dịch vụ");
      }
    } catch (error) {
      toast.error(
        error.response.data.message || "Lỗi khi lấy danh sách gói dịch vụ"
      );
    }
  };

  useEffect(() => {
    fetchProfile();
    fetchPrompts();
    return () => {
      setPrompts([]);
      setUser(null);
    };
  }, []);

  return (
    <section className="information-section ">
      <div className="container-fluid">
        <main className="dashboard__main">
          <div className="profile-section">
            <div className="profile-header">
              <div className="group-info">
                <div className="group-info-left">
                  <div>
                    <span style={{ color: "black", fontSize: "13px" }}>
                      HỘI NHÓM ONLINE
                    </span>
                  </div>
                  <div>
                    <span
                      style={{
                        color: "black",
                        fontSize: "24px",
                        fontWeight: "bold",
                      }}
                    >
                      Sharpen Your Skills With
                      <br /> Professional Online Courses
                    </span>
                  </div>

                  <button className="join-btn">
                    Join Now
                    <img src="/img/play.svg" />
                  </button>
                </div>
              </div>
            </div>

            <div className="profile-container">
              <div className="left-panel glass-box d-flex">
                <div className="user-profile">
                  <div
                    className="avatarUser"
                    style={{
                      backgroundImage: `url(${
                        user?.avatar || "/img/avatar-default.svg"
                      })`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></div>
                  <div className="user-info-box">
                    <div className="user-name">{user?.fullName}</div>
                    <div className="user-desc">Giới thiệu bản thân</div>
                  </div>
                </div>

                <div className="setting-box">
                  <div className="d-flex justify-content-between">
                    <img src="/img/component.svg" />
                    <span>Cài đặt chung</span>
                    <img src="/img/dropdown.svg" />
                    <img src="/img/icon_componenct.svg" />
                    <img src="/img/menu.svg" />
                  </div>

                  <div className="setting-item">
                    <span className="setting-item-title">Giới thiệu</span>
                    <img src="/img/Switch.svg" style={{ width: "30px" }} />
                  </div>
                  <div className="setting-item">
                    <span className="setting-item-title">Avt</span>
                    <img src="/img/Switch.svg" style={{ width: "30px" }} />
                  </div>
                  <div className="setting-item">
                    <span>Select Image</span>
                    <select className="setting-item-select">
                      <option>New Image</option>
                    </select>
                  </div>
                  <div className="setting-item">
                    <span className="setting-item-title">Hiệu ứng viền</span>
                    <img src="/img/Switch.svg" style={{ width: "30px" }} />
                  </div>
                  <div className="setting-item">
                    <span className="setting-item-title">Hiệu ứng avt</span>
                    <img src="/img/Switch.svg" style={{ width: "30px" }} />
                  </div>
                  <div className="setting-item">
                    <span className="setting-item-title">Tên user</span>
                    <span style={{ fontSize: "16px" }}>Lindsay Labatn</span>
                  </div>
                  <div className="setting-item">
                    <span className="setting-item-title">Trạng thái onl</span>
                    <img src="/img/Switch.svg" style={{ width: "30px" }} />
                  </div>
                </div>
              </div>

              <ProfileForm profile={user} fetchProfile={fetchProfile} />
            </div>

            <div className="project-nav-buttons">
              <button className="nav-btn">
                <img src="/img/arrow-left.svg" alt="Left" />
              </button>
              <button className="nav-btn">
                <img src="/img/arrow-right.svg" alt="Right" />
              </button>
            </div>

            <div className="project-list">
              {prompts?.map((prompt) => (
                <div
                  className="project-card"
                  key={prompt._id}
                  onClick={() => navigate(`/package/${prompt._id}`)}
                >
                  <div
                    className="project-img"
                    style={{
                      backgroundImage: `url(${prompt.thumbnail.url})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></div>
                  <div className="frontend">{prompt.category.name}</div>
                  <div className="project-title">{prompt.name}</div>
                  <img src="/img/Group 2.svg" />
                  <div className="project-author d-flex">
                    <div
                      className="chamXanh"
                      style={{
                        backgroundImage: `url(${
                          prompt.user.avatar || "/img/avatar-default.svg"
                        })`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                    ></div>
                    <div>
                      {prompt.user.fullName}
                      <br />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="dashboard__watched row text-center">
            <div className="col-md-4">
              <div className="dashboard__card3 p-3">
                <div className="icon_card3">
                  <img src="/img/notification.svg" />
                </div>
                <div>
                  <p>2/8 Watched</p>
                  <p>Product Design</p>
                </div>
                <div
                  style={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img src="/img/more.svg" />
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="dashboard__card3 p-3">
                <div className="icon_card3">
                  <img src="/img/notification.svg" />
                </div>
                <div>
                  <div>
                    <p>2/8 Watched</p>
                  </div>
                  <div>
                    <p>Product Design</p>
                  </div>
                </div>
                <div
                  style={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img src="/img/more.svg" />
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="dashboard__card3 p-3">
                <div className="icon_card3">
                  <img src="/img/notification.svg" />
                </div>
                <div>
                  <p>2/8 Watched</p>
                  <p>Product Design</p>
                </div>
                <div
                  style={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img src="/img/more.svg" />
                </div>
              </div>
            </div>
          </div>
        </main>

        <div className="dashboard__partners py-3 text-center">
          <div className="container-fluid">
            <div className="row justify-content-between align-items-center">
              <div className="col-auto">
                <img
                  src="/img/waverio.svg"
                  alt="weavio"
                  className="img-fluid"
                />
              </div>
              <div className="col-auto">
                <img
                  src="/img/squareStore.svg"
                  alt="squarestone"
                  className="img-fluid"
                />
              </div>
              <div className="col-auto">
                <img
                  src="/img/martino.svg"
                  alt="martino"
                  className="img-fluid"
                />
              </div>
              <div className="col-auto">
                <img
                  src="/img/virogan.svg"
                  alt="virogen"
                  className="img-fluid"
                />
              </div>
              <div className="col-auto">
                <img src="/img/vertex.svg" alt="vertex" className="img-fluid" />
              </div>
              <div className="col-auto">
                <img src="/img/aromix.svg" alt="aromix" className="img-fluid" />
              </div>
              <div className="col-auto">
                <img src="/img/fireli.svg" alt="freli" className="img-fluid" />
              </div>
              <div className="col-auto text-white">Natroma</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
