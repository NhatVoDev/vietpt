import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import "./sidebar.css";

const Sidebar = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  return (
    <aside
      className="sidebar p-3"
      style={{
        minWidth: "250px",
      }}
    >
      <div className="sidebar__header">
        <div
          className="avatar"
          style={{
            backgroundImage: `url(${
              user?.avatar || "/img/avatar-default.svg"
            })`,
            backgroundColor: "white",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>
        <div>
          <div className="sidebar__name">
            {user?.fullName}
          </div>
          <div className="sidebar__status">
            {user?.role === "admin" ? "Admin" : "User"}
          </div>
        </div>
      </div>
      {user?.role === "user" && (
        <>
          <hr className="sidebar__divider" />

          <div className="sidebar__section-title">Danh mục</div>
          <ul className="sidebar__menu">
            <li onClick={() => navigate("/favourite")}>
              <img src="/img/triangle.svg" /> Danh sách yêu thích
            </li>
            <li onClick={() => navigate("/transaction")}>
              <img src="/img/square.svg" />
              Lịch sử giao dịch
            </li>
            <li onClick={() => navigate("/profile")}>
              <img src="/img/octagon.svg" /> Cài đặt tài khoản
            </li>
          </ul>
        </>
      )}
      {user?.role === "admin" && (
        <>
          <hr className="sidebar__divider" />
          <div className="sidebar__section-title">Quản trị</div>
          <ul className="sidebar__menu">
            <li onClick={() => navigate("/admin")}>
              <img src="/img/square (1).svg" />
              Dashboard
            </li>
            <li onClick={() => navigate("/user-manager")}>
              <img src="/img/square.svg" /> Quản lý Người dùng
            </li>
            <li onClick={() => navigate("/package-manager")}>
              <img src="/img/triangle.svg" /> Quản lý Gói dịch vụ
            </li>
            <li onClick={() => navigate("/payment-manager")}>
              <img src="/img/octagon.svg" /> Quản lý Giao dịch
            </li>
            <li onClick={() => navigate("/profile")}>
              <img src="/img/octagon.svg" /> Cài đặt tài khoản
            </li>
          </ul>
        </>
      )}
      <div className="sidebar__spacer"></div>

      {/* <div className="sidebar__account">
        <div className="avatar small">
          <img src="/img/Status.svg" />
        </div>
        <div>
          <div className="sidebar__account-type">Loại tài khoản</div>
          <div className="sidebar__account-badge">Premium</div>
        </div>
        <div className="settings-icon">
          <img src="/img/cog.svg" />
        </div>
      </div> */}
    </aside>
  );
};

export default Sidebar;
