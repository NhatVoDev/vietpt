import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Button, Switch } from "antd";
import http from "../api/http";
import { toast } from "react-toastify";

const UserForm = ({
  visible,
  setVisible,
  fetchUsers,
  userDetail,
  setUserDetail,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const isEditMode = !!userDetail;

  useEffect(() => {
    if (userDetail) {
      form.setFieldsValue({
        ...userDetail,
        isActive: userDetail.isActive,
      });
    } else {
      form.resetFields();
      form.setFieldsValue({ isActive: true });
    }
  }, [userDetail, form]);

  const handleClose = () => {
    setVisible(false);
    setUserDetail(null);
    form.resetFields();
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const values = await form.validateFields();

      const payload = { ...values };
      if (!isEditMode && !payload.password) {
        toast.warning("Vui lòng nhập mật khẩu!");
        setLoading(false);
        return;
      }

      // Không gửi mật khẩu nếu không thay đổi
      if (isEditMode && !payload.password) {
        delete payload.password;
      }

      const response = isEditMode
        ? await http.put(`/user/${userDetail._id}`, payload)
        : await http.post("/user", payload);

      if (response.status === 200 || response.status === 201) {
        toast.success(
          response.data.message ||
            `${isEditMode ? "Cập nhật" : "Tạo"} người dùng thành công`
        );
        handleClose();
        fetchUsers();
      } else {
        toast.error(
          response.data.message ||
            `Lỗi khi ${isEditMode ? "cập nhật" : "tạo"} người dùng`
        );
      }
    } catch (error) {
      console.error("Form validation failed:", error);
      toast.error(
        error.response?.data?.message ||
          `Lỗi khi ${isEditMode ? "cập nhật" : "tạo"} người dùng`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={isEditMode ? "Chỉnh sửa Người dùng" : "Tạo Người dùng mới"}
      open={visible}
      onCancel={handleClose}
      onOk={handleSubmit}
      confirmLoading={loading}
      footer={[
        <Button key="back" onClick={handleClose}>
          Hủy
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={loading}
          onClick={handleSubmit}
        >
          {isEditMode ? "Lưu thay đổi" : "Tạo mới"}
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical" name="user_form">
        <Form.Item
          name="firstName"
          label="Họ"
          rules={[{ required: true, message: "Vui lòng nhập họ!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="lastName"
          label="Tên"
          rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Vui lòng nhập email!" },
            { type: "email", message: "Email không hợp lệ!" },
          ]}
        >
          <Input disabled={isEditMode} />
        </Form.Item>
        <Form.Item
          name="password"
          label="Mật khẩu"
          rules={[
            { required: !isEditMode, message: "Vui lòng nhập mật khẩu!" },
          ]}
          help={isEditMode ? "Để trống nếu không muốn thay đổi mật khẩu" : ""}
        >
          <Input.Password />
        </Form.Item>
        {isEditMode && (
          <Form.Item name="isActive" label="Trạng thái" valuePropName="checked">
            <Switch checkedChildren="Hoạt động" unCheckedChildren="Bị khóa" />
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};

export default UserForm;
