import { useCallback, useEffect, useState, useRef } from "react";
import "./goiDichVu.css";
import http from "../../../api/http";
import PackageForm from "../../../components/PackageForm";
import { Modal } from "antd";
import { toast } from "react-toastify";

const PackageManager = () => {
  const [visible, setVisible] = useState(false);
  const [packages, setPackages] = useState([]);
  const [packageDetail, setPackageDetail] = useState(null);
  const [search, setSearch] = useState("");
  const [searchDebounce, setSearchDebounce] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  });
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [packageToDelete, setPackageToDelete] = useState(null);

  // Sử dụng useRef để lưu trữ timeoutId
  const timeoutRef = useRef(null);

  const showDeleteConfirm = (packageId, packageName) => {
    setPackageToDelete({ id: packageId, name: packageName });
    setDeleteModalVisible(true);
  };

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    // Clear timeout cũ nếu có
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set timeout mới
    timeoutRef.current = setTimeout(() => {
      setSearchDebounce(value);
      // Reset về trang 1 khi search
      setPagination((prev) => ({
        ...prev,
        page: 1,
      }));
    }, 500);
  };

  // Cleanup timeout khi component unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleDeleteConfirm = async () => {
    if (!packageToDelete) return;

    try {
      const response = await http.delete(`/package/${packageToDelete.id}`);
      if (response.status === 200) {
        toast.success(response.data.message || "Xóa gói dịch vụ thành công");
        setPagination({
          ...pagination,
          page: 1,
        });
        setDeleteModalVisible(false);
        setPackageToDelete(null);
      } else {
        toast.error(response.data.message || "Lỗi khi xóa gói dịch vụ");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Lỗi khi xóa gói dịch vụ");
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModalVisible(false);
    setPackageToDelete(null);
  };

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await http.get("/package", {
          params: {
            page: pagination.page,
            limit: pagination.limit,
            search: searchDebounce,
          },
        });
        if (response.status === 200) {
          setPackages(response.data.metadata.packages);
          setTotal(response.data.metadata.pagination.total);
          setTotalPages(response.data.metadata.pagination.totalPages);
        } else {
          toast.error(
            response.data.message || "Lỗi khi lấy danh sách gói dịch vụ"
          );
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Lỗi khi lấy danh sách gói dịch vụ"
        );
      }
    };
    fetchPackages();
  }, [pagination, searchDebounce]);

  return (
    <section className="goiDichVu-section">
      <div className="container-fluid">
        <div className="row">
          <main className="dashboard__main">
            <div className="p-4">
              <h4 className="mb-4 text-white">Quản lý gói dịch vụ</h4>
              <div className="d-flex justify-content-between">
                <div className="search-bar">
                  <input
                    type="text"
                    placeholder="Search package..."
                    onChange={(e) => handleSearch(e)}
                  />
                  <span className="filter-icon">🔍</span>
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setVisible(true)}
                >
                  Tạo gói dịch vụ mới
                </button>
              </div>
              <div
                className="table-responsive goiDichVu"
                style={{
                  height: "500px",
                  overflowY: "auto",
                }}
              >
                <table className="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Ảnh đại diện</th>
                      <th
                        style={{
                          minWidth: "150px",
                        }}
                      >
                        Tên gói
                      </th>
                      <th>Mô tả</th>
                      <th
                        style={{
                          minWidth: "120px",
                        }}
                      >
                        Giá (VNĐ)
                      </th>
                      <th
                        style={{
                          minWidth: "120px",
                        }}
                      >
                        Danh mục
                      </th>
                      <th
                        style={{
                          minWidth: "120px",
                        }}
                      >
                        Tổng lượt thích
                      </th>
                      <th
                        style={{
                          whiteSpace: "nowrap",
                        }}
                      >
                        Hành động
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {packages.map((item, index) => (
                      <tr key={item._id}>
                        <td>
                          {index + 1 + (pagination.page - 1) * pagination.limit}
                        </td>
                        <td>
                          <div
                            style={{
                              position: "relative",
                              width: "100px",
                              aspectRatio: "1/1",
                              border: "1px solid #ccc",
                            }}
                          >
                            <img
                              src={item?.thumbnail?.url}
                              alt="Ảnh đại diện"
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                              }}
                            />
                          </div>
                        </td>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>
                          {item?.price?.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </td>
                        <td>{item?.category?.name}</td>
                        <td
                          style={{
                            textAlign: "center",
                          }}
                        >
                          {item?.totalLikes?.toLocaleString("vi-VN")}
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-info mb-2 w-100"
                            onClick={() => {
                              setPackageDetail(item);
                              setVisible(true);
                            }}
                          >
                            Sửa
                          </button>
                          <button
                            className="btn btn-sm btn-danger w-100"
                            onClick={() =>
                              showDeleteConfirm(item._id, item.name)
                            }
                          >
                            Xóa
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

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
      <PackageForm
        visible={visible}
        onCancel={() => {
          setVisible(false);
          setPackageDetail(null);
        }}
        reset={() => {
          setPagination({
            page: 1,
            limit: 10,
          });
        }}
        initialValues={packageDetail}
      />

      <Modal
        title="Xác nhận xóa"
        open={deleteModalVisible}
        onOk={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        okText="Xóa"
        cancelText="Hủy"
        okButtonProps={{ danger: true }}
      >
        <p>
          Bạn có chắc chắn muốn xóa gói dịch vụ{" "}
          <strong>{packageToDelete?.name}</strong>?
        </p>
        <p>Hành động này không thể hoàn tác.</p>
      </Modal>
    </section>
  );
};

export default PackageManager;
