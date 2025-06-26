import React, { useState } from "react";
import "./register.css";
import http from "../../api/http";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
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
    if (!formData.firstName) newErrors.firstName = "Họ không được để trống";
    if (!formData.lastName) newErrors.lastName = "Tên không được để trống";
    if (!formData.email) {
      newErrors.email = "Email không được để trống";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email không hợp lệ";
    }
    if (!formData.password || formData.password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự";
    }
    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Mật khẩu nhập lại không khớp";
    }
    if (!formData.terms) {
      newErrors.terms = "Bạn cần đồng ý điều khoản";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await http.post("/auth/register", {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        });
        if (response.status === 200) {
          toast.success("Đăng ký thành công");
          navigate("/login");
        } else {
          toast.error(response.data.message || "Đăng ký thất bại");
        }
      } catch (error) {
        toast.error(error.response.data.message || "Đăng ký thất bại");
      }
    }
  };

  return (
    <section className="register-form-section py-5 p-5">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-md-4">
            <span className="mb-4 title-from">
              Hoàn tất các ô bên dưới để đăng ký tài khoản.
            </span>
            <form className="mt-4" onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col">
                  <label className="label-form">Họ</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Họ"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                  {errors.firstName && (
                    <small className="text-danger">{errors.firstName}</small>
                  )}
                </div>
                <div className="col">
                  <label className="label-form">Tên</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Tên"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                  {errors.lastName && (
                    <small className="text-danger">{errors.lastName}</small>
                  )}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col">
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
              </div>

              <div className="row mb-3">
                <div className="col">
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
                <div className="col">
                  <label className="label-form">Nhập lại mật khẩu</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Nhập lại mật khẩu"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  {errors.confirmPassword && (
                    <small className="text-danger">
                      {errors.confirmPassword}
                    </small>
                  )}
                </div>
              </div>

              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="terms"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                />
                <label className="form-check-label text-white" htmlFor="terms">
                  Tôi đồng ý với <a href="#">Điều khoản và Chính sách</a>
                </label>
                {errors.terms && (
                  <small className="text-danger d-block">{errors.terms}</small>
                )}
              </div>

              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary">
                  Tạo tài khoản
                </button>
                <button type="button" className="btn btn-dkgg">
                  <img
                    src="/img/loginAdmin/gg.png"
                    alt="Google Icon"
                    style={{ height: "20px", marginRight: "8px" }}
                  />
                  Tạo tài khoản bằng Google
                </button>
              </div>
            </form>

            <div className="d-flex justify-content-between">
              <div>
                <p className="mt-3 small text-white">VIETPROMPT.com © 2025</p>
              </div>
              <div>
                <p className="mt-3 small text-white">Privacy Policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
