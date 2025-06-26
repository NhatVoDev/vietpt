import { useCallback, useEffect, useState, useRef } from "react";
import "./userManager.css";
import http from "../../../api/http";
import UserForm from "../../../components/UserForm"; // Đã được tạo
import { Modal } from "antd";
import { toast } from "react-toastify";

const UserManager = () => {
  const [visible, setVisible] = useState(false);
  const [users, setUsers] = useState([]);
  const [userDetail, setUserDetail] = useState(null);
  const [search, setSearch] = useState("");
  const [searchDebounce, setSearchDebounce] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  });
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [userToToggle, setUserToToggle] = useState(null);

  const timeoutRef = useRef(null);

  const showToggleConfirm = (user) => {
    setUserToToggle(user);
    setDeleteModalVisible(true);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setSearchDebounce(value);
      setPagination((prev) => ({
        ...prev,
        page: 1,
      }));
    }, 500);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleToggleConfirm = async () => {
    if (!userToToggle) return;

    try {
      const response = await http.delete(`/user/${userToToggle._id}`);
      if (response.status === 200) {
        const message = response.data.metadata.isActive
          ? "Kích hoạt người dùng thành công"
          : "Khóa người dùng thành công";
        toast.success(message);
        fetchUsers(); // Tải lại danh sách
        setDeleteModalVisible(false);
        setUserToToggle(null);
      } else {
        toast.error(response.data.message || "Lỗi khi thay đổi trạng thái");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Lỗi khi thay đổi trạng thái"
      );
    }
  };

  const handleToggleCancel = () => {
    setDeleteModalVisible(false);
    setUserToToggle(null);
  };

  const fetchUsers = useCallback(async () => {
    try {
      const response = await http.get("/user", {
        params: {
          page: pagination.page,
          limit: pagination.limit,
          search: searchDebounce,
        },
      });
      if (response.status === 200) {
        setUsers(response.data.metadata.users);
        // Cần cập nhật API để trả về thông tin phân trang
        setTotal(response.data.metadata.pagination.total);
        setTotalPages(response.data.metadata.pagination.totalPages);
      } else {
        toast.error(
          response.data.message || "Lỗi khi lấy danh sách người dùng"
        );
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Lỗi khi lấy danh sách người dùng"
      );
    }
  }, [pagination, searchDebounce]);

  useEffect(() => {
    fetchUsers();
  }, [pagination, searchDebounce]);

  return (
    <section className="userManager-section">
      <div className="container-fluid">
        <div className="row">
          <main className="dashboard__main">
            <div className="dashboard__package-services p-4">
              <h4 className="mb-4 text-white">Quản lý Người dùng</h4>
              <div className="d-flex justify-content-between">
                <div className="search-bar">
                  <input
                    type="text"
                    placeholder="Tìm kiếm người dùng..."
                    value={search}
                    onChange={handleSearch}
                  />
                  <span className="filter-icon">🔍</span>
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setVisible(true)}
                >
                  Tạo người dùng mới
                </button>
              </div>
              <div
                className="table-responsive userManager"
                style={{
                  height: "500px",
                  overflowY: "auto",
                }}
              >
                <table className="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th
                        style={{
                          textAlign: "center",
                        }}
                      >
                        Ảnh đại diện
                      </th>
                      <th>Họ và Tên</th>
                      <th>Email</th>
                      <th>Vai trò</th>
                      <th>Trạng thái</th>
                      <th>Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((item, index) => (
                      <tr key={item._id}>
                        <td>
                          {index + 1 + (pagination.page - 1) * pagination.limit}
                        </td>
                        <td
                          style={{
                            textAlign: "center",
                          }}
                        >
                          <img
                            src={item?.avatar || "/img/avatar-default.svg"}
                            alt="Avatar"
                            style={{
                              width: "50px",
                              height: "50px",
                              objectFit: "cover",
                              border: "1px solid",
                            }}
                          />
                        </td>
                        <td>{item.fullName}</td>
                        <td>{item.email}</td>
                        <td>
                          <span
                            className={`badge ${
                              item.role === "admin"
                                ? "bg-success"
                                : "bg-secondary"
                            }`}
                          >
                            {item.role}
                          </span>
                        </td>
                        <td>
                          <span
                            className={`badge ${
                              item.isActive ? "bg-success" : "bg-danger"
                            }`}
                          >
                            {item.isActive ? "Hoạt động" : "Bị khóa"}
                          </span>
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-info mb-2 w-100"
                            onClick={() => {
                              setUserDetail(item);
                              setVisible(true);
                            }}
                          >
                            Sửa
                          </button>
                          <button
                            className={`btn btn-sm ${
                              item.isActive ? "btn-danger" : "btn-success"
                            } w-100`}
                            onClick={() => showToggleConfirm(item)}
                          >
                            {item.isActive ? "Khóa" : "Mở khóa"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* Pagination sẽ được thêm sau khi API hỗ trợ */}
              <nav
                aria-label="Phân trang gói dịch vụ"
                className="mt-4 d-flex justify-content-center"
              >
                <ul className="pagination">
                  <li
                    className={`page-item ${
                      pagination.page === 1 ? "disabled user-select-none" : ""
                    }`}
                    onClick={() => {
                      if (pagination.page > 1) {
                        setPagination({
                          ...pagination,
                          page: pagination.page - 1,
                        });
                      }
                    }}
                  >
                    <a
                      className="page-link"
                      href="#"
                      tabindex="-1"
                      aria-disabled="true"
                    >
                      Trước
                    </a>
                  </li>
                  <li className="page-item active">
                    <a className="page-link" href="#">
                      {pagination.page}
                    </a>
                  </li>
                  <li
                    className={`page-item ${
                      pagination.page === totalPages
                        ? "disabled user-select-none"
                        : ""
                    }`}
                    onClick={() => {
                      if (pagination.page < totalPages) {
                        setPagination({
                          ...pagination,
                          page: pagination.page + 1,
                        });
                      }
                    }}
                  >
                    <a className="page-link" href="#">
                      Sau
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </main>
        </div>
      </div>

      <UserForm
        visible={visible}
        setVisible={setVisible}
        fetchUsers={fetchUsers}
        userDetail={userDetail}
        setUserDetail={setUserDetail}
      />

      <Modal
        title={
          userToToggle?.isActive
            ? "Xác nhận khóa người dùng"
            : "Xác nhận mở khóa người dùng"
        }
        open={deleteModalVisible}
        onOk={handleToggleConfirm}
        onCancel={handleToggleCancel}
        okText={userToToggle?.isActive ? "Khóa" : "Mở khóa"}
        cancelText="Hủy"
      >
        <p>
          Bạn có chắc chắn muốn {userToToggle?.isActive ? "khóa" : "mở khóa"}{" "}
          người dùng <strong>{userToToggle?.fullName}</strong>?
        </p>
      </Modal>
    </section>
  );
};

export default UserManager;
