import { useCallback, useEffect, useState, useRef } from "react";
import "./paymentManager.css";
import http from "../../../api/http";
import { Modal } from "antd";
import { toast } from "react-toastify";

const PaymentManager = () => {
  const [payments, setPayments] = useState([]);
  const [paymentDetail, setPaymentDetail] = useState(null);
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [searchDebounce, setSearchDebounce] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  });
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const timeoutRef = useRef(null);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setSearchDebounce(value);
      setPagination((prev) => ({ ...prev, page: 1 }));
    }, 500);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const fetchPayments = useCallback(async () => {
    try {
      const response = await http.get("/payment/admin", {
        params: {
          page: pagination.page,
          limit: pagination.limit,
          search: searchDebounce,
        },
      });
      if (response.status === 200) {
        setPayments(response.data.metadata.payments);
        setTotal(response.data.metadata.pagination.total);
        setTotalPages(response.data.metadata.pagination.totalPages);
      } else {
        toast.error(response.data.message || "Lỗi khi lấy danh sách payment");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Lỗi khi lấy danh sách payment"
      );
    }
  }, [pagination, searchDebounce]);

  useEffect(() => {
    fetchPayments();
  }, [pagination, searchDebounce]);

  return (
    <section className="paymentManager-section">
      <div className="container-fluid">
        <div className="row">
          <main className="dashboard__main">
            <div className="dashboard__package-services p-4">
              <h4 className="mb-4 text-white">Quản lý giao dịch thanh toán</h4>
              <div className="d-flex justify-content-between">
                <div className="search-bar">
                  <input
                    type="text"
                    placeholder="Tìm kiếm mã giao dịch, user, gói..."
                    value={search}
                    onChange={handleSearch}
                  />
                  <span className="filter-icon">🔍</span>
                </div>
              </div>
              <div
                className="table-responsive paymentManager"
                style={{ height: "500px", overflowY: "auto" }}
              >
                <table className="table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Mã giao dịch</th>
                      <th>Người dùng</th>
                      <th>Gói dịch vụ</th>
                      <th>Số tiền</th>
                      <th>Trạng thái</th>
                      <th>Ngày thanh toán</th>
                      <th>Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((item, index) => (
                      <tr key={item._id}>
                        <td>
                          {index + 1 + (pagination.page - 1) * pagination.limit}
                        </td>
                        <td>{item.transactionCode}</td>
                        <td>
                          {item.user?.lastName} {item.user?.firstName}
                          <br />
                          <span style={{ fontSize: 12, color: "#888" }}>
                            {item.user?.email}
                          </span>
                        </td>
                        <td>{item.package?.name}</td>
                        <td>
                          {item.package?.price?.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </td>
                        <td>
                          <span
                            className={`badge ${
                              item.status === "success"
                                ? "bg-success"
                                : item.status === "pending"
                                ? "bg-warning"
                                : "bg-danger"
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td>
                          {item.paidAt
                            ? new Date(item.paidAt).toLocaleString("vi-VN")
                            : "-"}
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-info w-100"
                            onClick={() => {
                              setPaymentDetail(item);
                              setVisible(true);
                            }}
                          >
                            Xem chi tiết
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <nav
                aria-label="Phân trang payment"
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
                      tabIndex="-1"
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
      <Modal
        title="Chi tiết giao dịch thanh toán"
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        {paymentDetail && (
          <div>
            <p>
              <strong>Mã giao dịch:</strong> {paymentDetail.transactionCode}
            </p>
            <p>
              <strong>Người dùng:</strong> {paymentDetail.user?.lastName}{" "}
              {paymentDetail.user?.firstName} ({paymentDetail.user?.email})
            </p>
            <p>
              <strong>Gói dịch vụ:</strong> {paymentDetail.package?.name}
            </p>
            <p>
              <strong>Số tiền:</strong>{" "}
              {paymentDetail.package?.price?.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </p>
            <p>
              <strong>Trạng thái:</strong>{" "}
              <span
                className={`badge ${
                  paymentDetail.status === "success"
                    ? "bg-success"
                    : paymentDetail.status === "pending"
                    ? "bg-warning"
                    : "bg-danger"
                }`}
              >
                {paymentDetail.status}
              </span>
            </p>
            <p>
              <strong>Ngày thanh toán:</strong>{" "}
              {paymentDetail.paidAt
                ? new Date(paymentDetail.paidAt).toLocaleString("vi-VN")
                : "-"}
            </p>
            <p>
              <strong>Phương thức:</strong> {paymentDetail.paymentMethod}
            </p>
            {paymentDetail.note && (
              <p>
                <strong>Ghi chú:</strong> {paymentDetail.note}
              </p>
            )}
          </div>
        )}
      </Modal>
    </section>
  );
};

export default PaymentManager;
