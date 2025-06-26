import React, { useEffect, useState } from "react";
import "./information.css";
import { toast } from "react-toastify";
import http from "../../api/http";

const initialState = {
  firstName: "",
  lastName: "",
  gender: "other",
  country: "",
  language: "",
};

const ProfileForm = ({ profile, fetchProfile }) => {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.firstName.trim()) newErrors.firstName = "Vui lòng nhập tên.";
    if (!form.lastName.trim()) newErrors.lastName = "Vui lòng nhập họ.";
    if (!form.gender.trim()) newErrors.gender = "Vui lòng nhập giới tính.";
    if (!form.country.trim()) newErrors.country = "Vui lòng nhập quốc gia.";
    if (!form.language.trim()) newErrors.language = "Vui lòng nhập ngôn ngữ.";
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await http.put("/user/profile", form);
        if (response.status === 200) {
          toast.success("Lưu thông tin thành công!");
          setForm(response.data.metadata);
          setErrors({});
          fetchProfile();
        }
      } catch (error) {
        toast.error(error.response.data.message || "Lỗi khi lưu thông tin");
      }
    }
  };

  useEffect(() => {
    if (profile) {
      setForm({
        firstName: profile.firstName,
        lastName: profile.lastName,
        gender: profile.gender,
        country: profile.country,
        language: profile.language,
      });
    }
  }, [profile]);

  return (
    <form className="right-panel glass-box" onSubmit={handleSubmit}>
      <div className="input-grid">
        <div className="field">
          <label>Họ</label>
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
          />
          {errors.lastName && (
            <div className="error-msg">{errors.lastName}</div>
          )}
        </div>
        <div className="field">
          <label>Tên</label>
          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
          />
          {errors.firstName && (
            <div className="error-msg">{errors.firstName}</div>
          )}
        </div>
        <div className="field">
          <label>Giới tính</label>
          <select name="gender" value={form.gender} onChange={handleChange}>
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
            <option value="other">Khác</option>
          </select>
          {errors.gender && <div className="error-msg">{errors.gender}</div>}
        </div>
        <div className="field">
          <label>Quốc gia</label>
          <input
            type="text"
            name="country"
            value={form.country}
            onChange={handleChange}
          />
          {errors.country && <div className="error-msg">{errors.country}</div>}
        </div>
        <div className="field">
          <label>Ngôn ngữ</label>
          <input
            type="text"
            name="language"
            value={form.language}
            onChange={handleChange}
          />
          {errors.language && (
            <div className="error-msg">{errors.language}</div>
          )}
        </div>
        <div
          style={{
            gridColumn: "span 2",
            display: "flex",
            justifyContent: "end",
          }}
        >
          <button type="submit" className="add-email-btn">
            Lưu thông tin
          </button>
        </div>
      </div>
    </form>
  );
};

export default ProfileForm;
