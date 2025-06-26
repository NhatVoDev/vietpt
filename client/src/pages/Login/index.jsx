import React, { useState } from "react";
import "./login.css";
import http from "../../api/http";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email không được để trống";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await http.post("/auth/login", {
          email: formData.email,
          password: formData.password,
        });
        if (response.status === 200) {
          localStorage.setItem(
            "accessToken",
            response.data.metadata.tokens.accessToken
          );
          localStorage.setItem(
            "refreshToken",
            response.data.metadata.tokens.refreshToken
          );
          localStorage.setItem(
            "user",
            JSON.stringify(response.data.metadata.user)
          );
          login(
            response.data.metadata.user,
            response.data.metadata.tokens.accessToken
          );
          toast.success("Đăng nhập thành công");
          navigate("/");
        } else {
          toast.error(response.data.message || "Đăng nhập thất bại");
        }
      } catch (error) {
        toast.error(error.response.data.message || "Đăng nhập thất bại");
      }
    }
  };

  return (
    <section className="login-section py-5">
      <div className="container-fluid">
        <div
          className="row justify-content-center align-items-stretch"
          style={{ position: "relative", zIndex: 1 }}
        >
          <div className="col-md-4 bgLoginAdmin">
            <div className="bg-opacity-50 p-4 rounded mt-5">
              <p className="mb-3 left-content">
                Đăng nhập để tiếp tục các thao tác tại website
              </p>
              <p className="text-center">
                Đăng nhập để sử dụng đầy đủ tính năng, lưu trữ, và đồng bộ dữ
                liệu của bạn trên hệ thống.
              </p>
            </div>
            <div className="avatar-group">
              <div className="avatar-wrapper">
                <img src="/img/loginAdmin/Ellipse 32.svg" className="ellipse" />
                <img src="/img/loginAdmin/f7_person-3.svg" className="icon" />
              </div>
              <div className="avatar-wrapper">
                <img src="/img/loginAdmin/Ellipse 32.svg" className="ellipse" />
                <img src="/img/loginAdmin/f7_person-3.svg" className="icon" />
              </div>
              <div className="avatar-wrapper">
                <img src="/img/loginAdmin/Ellipse 32.svg" className="ellipse" />
                <img src="/img/loginAdmin/f7_person-3.svg" className="icon" />
              </div>
              <div className="avatar-wrapper">
                <img src="/img/loginAdmin/Ellipse 32.svg" className="ellipse" />
                <img src="/img/loginAdmin/f7_person-3.svg" className="icon" />
              </div>
            </div>
            <div className="bg-opacity-50 p-4 rounded mt-3">
              <p className="text-center">
                Đăng nhập để sử dụng đầy đủ tính năng, lưu trữ, và đồng bộ dữ
                liệu của bạn trên hệ thống.
              </p>
            </div>
          </div>

          <div className="col-md-4 d-flex">
            <div
              className="bg-white p-4 shadow rounded"
              style={{ width: "100%" }}
            >
              <div className="text-left mb-3">
                <img
                  src="/img/logo.png"
                  alt="Logo"
                  style={{ height: "50px" }}
                />
              </div>
              <form className="mt-4" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="label-form">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && (
                    <small className="text-danger">{errors.email}</small>
                  )}
                </div>
                <div className="mb-3">
                  <label className="label-form">Nhập mật khẩu</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Mật khẩu"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && (
                    <small className="text-danger">{errors.password}</small>
                  )}
                </div>
                <div className="d-grid mb-2">
                  <button
                    type="submit"
                    className="btn btn-primary btn-createAccount"
                  >
                    Đăng nhập
                  </button>
                </div>
                <div className="text-center" style={{ color: "black" }}>
                  Already a member?
                  <a href="/register" className="text-decoration-none">
                    Register
                  </a>
                  . By creating an account, you agree to our Terms Of Service,
                  and to receive emails and updates.
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="press-section text-white text-center">
          <p className="mb-3 fw-semibold">Prompt on VIETPROMPT</p>
          <div className="d-flex justify-content-center flex-wrap gap-5 align-items-center">
            <img
              src="/img/loginAdmin/tnyt.png"
              alt="New York Times"
              height="24"
            />
            <img
              src="/img/loginAdmin/twpt.png"
              alt="Washington Post"
              height="24"
            />
            <img
              src="/img/loginAdmin/buni.png"
              alt="Business Insider"
              height="24"
            />
            <img src="/img/loginAdmin/abc.png" alt="ABC" height="24" />
            <img
              src="/img/loginAdmin/politico.png"
              alt="Politico"
              height="24"
            />
            <img src="/img/loginAdmin/tec.png" alt="TechCrunch" height="24" />
            <img
              src="/img/loginAdmin/fast.png"
              alt="Fast Company"
              height="24"
            />
          </div>
        </div>

        <div className="dashboard__partners py-3 text-center">
          <div className="container-fluid">
            <div className="row justify-content-between align-items-center">
              <div className="col-auto d-flex align-items-center justify-content-center">
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

export default LoginPage;
