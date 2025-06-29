import React from "react";
import "./header.css";
import usePayment from "../hooks/usePayment";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { handleCreatePayment } = usePayment();
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  return (
    <header className="main-header d-flex align-items-center p-3">
      <div className="logo me-3">
        <img src="/img/logo.png" alt="VietPrompt" height="60" />
      </div>
      <nav className="nav-menu d-flex flex-grow-1 gap-2">
        <div className="nav-item" onClick={() => navigate("/")}>
          Giới thiệu
        </div>
        <div className="nav-item" onClick={() => navigate("/library")}>
          Thư viện
        </div>
        <div className="nav-item" onClick={() => navigate("/package")}>
          Gói dịch vụ
        </div>
        <div className="nav-item">
          <a href="#">Dịch vụ</a>
        </div>
        <div className="nav-item dropdown">
          <a href="#">Đăng ký</a>
        </div>
        {user ? (
          <div className="nav-item dropdown">
            <a
              href="/profile"
              className="dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              {user.fullName}
            </a>
            <ul className="dropdown-menu">
              {user.role === "admin" && (
                <li
                  className="dropdown-item"
                  onClick={() => navigate("/admin")}
                >
                  Quản lý
                </li>
              )}
              <li
                className="dropdown-item"
                onClick={() => navigate("/profile")}
              >
                Hồ sơ cá nhân
              </li>
              <li className="dropdown-item" onClick={logout}>
                Đăng xuất
              </li>
            </ul>
          </div>
        ) : (
          <div className="nav-item">
            <a href="/login">Đăng nhập</a>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
