import { useState } from "react";
import "./forgotPassword.css";
import http from "../../api/http";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
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
        const response = await http.post("/auth/forgot-password", {
          email: formData.email,
          password: formData.password,
        });
        if (response.status === 200) {
          localStorage.setItem("email", formData.email);
          toast.success("Gửi mã thành công");
          navigate("/reset-password");
        } else {
          toast.error(response.data.message || "Đăng ký thất bại");
        }
      } catch (error) {
        toast.error(error.response.data.message || "Đăng ký thất bại");
      }
    }
  };

  return (
    <section className="forgot-password-section py-5 p-5">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-md-4">
            <span className="mb-4 title-from">
              Có phải bạn đã quên mật khẩu? Hãy điền các thông tin bên dưới.
            </span>
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
              <div className="d-grid">
                <button type="submit" className="btn btn-dkgg">
                  Gửi mã xác thực qua Email
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

export default ForgotPassword;
