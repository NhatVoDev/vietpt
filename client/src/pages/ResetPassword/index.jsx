import { useEffect, useRef, useState } from "react";
import "./resetPassword.css";
import { toast } from "react-toastify";
import http from "../../api/http";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [otpArr, setOtpArr] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  const handleChange = (e, idx) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (!value) return;
    const newOtpArr = [...otpArr];
    newOtpArr[idx] = value;
    setOtpArr(newOtpArr);
    if (idx < 5 && value) {
      inputRefs.current[idx + 1].focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !otpArr[idx] && idx > 0) {
      inputRefs.current[idx - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otp = otpArr.join("");
    if (otp.length === 6) {
      const email = localStorage.getItem("email");
      try {
        const response = await http.post("/auth/reset-password", {
          code: otp,
          email: email,
        });
        if (response.status === 200) {
          toast.success("Đổi mật khẩu thành công");
          navigate("/login");
        } else {
          toast.error(response.data.message || "Đổi mật khẩu thất bại");
        }
      } catch (error) {
        toast.error(error.response.data.message || "Đổi mật khẩu thất bại");
      }
    } else {
      toast.warning("Vui lòng nhập đủ 6 số OTP");
    }
  };

  useEffect(() => {
    const email = localStorage.getItem("email");
    if (!email) {
      navigate("/forgot-password");
    }
  }, []);

  return (
    <section className="forgot-password-code-section py-5 p-5">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-md-4">
            <form
              className="otp-box text-white p-5 rounded-4"
              onSubmit={handleSubmit}
            >
              <span className="mb-3 title-from">
                Hãy nhập mã code được gửi đến
                <br />
                Email đã đăng ký của bạn
              </span>
              <div className="d-flex gap-3 justify-content-start mb-4 o-code">
                {otpArr.map((num, idx) => (
                  <input
                    key={idx}
                    type="text"
                    maxLength="1"
                    className="otp-input text-center"
                    value={num}
                    onChange={(e) => handleChange(e, idx)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    ref={(el) => (inputRefs.current[idx] = el)}
                  />
                ))}
              </div>
              <div className="d-grid" style={{ marginTop: "20px" }}>
                <button className="btn btn-gui mb-3" type="submit">
                  Gửi
                </button>
              </div>

              <div className="d-flex justify-content-between text-white small mt-4">
                <span>VIETPROMPT.com ©2025</span>
                <a href="#" className="text-white text-decoration-none">
                  Privacy Policy
                </a>
              </div>
            </form>
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

export default ResetPassword;
