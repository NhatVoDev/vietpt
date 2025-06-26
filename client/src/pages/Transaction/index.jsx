import { toast } from "react-toastify";
import "./transaction.css";
import { useEffect, useState, useRef, useCallback } from "react";
import http from "../../api/http";
import { Modal } from "antd";

const Transaction = () => {
  const [payments, setPayments] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleOpenModal = (payment) => {
    setSelectedPayment(payment);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPayment(null);
  };

  const handleDownloadImage = async (imageUrl) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      const fileName = imageUrl.split("/").pop();
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
      toast.error("Lỗi khi tải ảnh");
    }
  };

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await http.get("/payment/owner", {
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
          toast.error(
            response.data.message || "Lỗi khi lấy danh sách giao dịch"
          );
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Lỗi khi lấy danh sách giao dịch"
        );
      }
    };

    fetchPayments();
  }, [pagination, searchDebounce]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <section className="transaction-history-section">
      <div className="container-fluid">
        <main className="transaction-history__main p-3">
          <div className="transaction-wrapper">
            <div className="search-bar">
              <input
                type="text"
                placeholder="🔍 Tìm kiếm theo mã giao dịch..."
                value={search}
                onChange={handleSearch}
              />
              <span className="filter-icon">⚙️</span>
            </div>

            <div className="d-flex justify-content-between">
              <span className="title">Lịch sử giao dịch</span>
            </div>
            <div className="transaction-history">
              <table>
                <thead>
                  <tr>
                    <th>HỌ TÊN & NGÀY GIAO DỊCH</th>
                    <th>TRẠNG THÁI</th>
                    <th>TÊN GÓI DỊCH VỤ</th>
                    <th>HÀNH ĐỘNG</th>
                  </tr>
                </thead>
                <tbody>
                  {payments && payments.length > 0 ? (
                    payments.map((payment) => (
                      <tr key={payment._id}>
                        <td>
                          <div className="user-info">
                            <img
                              src={
                                payment.user.avatar || "/img/avatar-default.svg"
                              }
                              alt="avatar"
                              className="avatar-img"
                            />
                            <div className="text">
                              <div
                                className="name"
                                style={{
                                  margin: 0,
                                }}
                              >
                                {payment.user.lastName} {payment.user.firstName}
                              </div>
                              <div className="date">
                                {payment.paidAt
                                  ? new Date(payment.paidAt).toLocaleDateString(
                                      "vi-VN",
                                      {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                      }
                                    )
                                  : ""}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="status frontend">
                            {payment.status.toUpperCase()}
                          </span>
                        </td>
                        <td>{payment.package.name}</td>
                        <td>
                          <button
                            className="details-btn"
                            onClick={() => handleOpenModal(payment)}
                          >
                            Xem chi tiết
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} style={{ textAlign: "center" }}>
                        Không có dữ liệu
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="d-flex justify-content-between">
              <span className="title">Thống Kê Hoạt Động</span>
            </div>

            <div className="activity-stats">
              <div className="stats-grid">
                <div className="stat-item">
                  <div className="icondd">
                    <img
                      src="/img/giohang.png"
                      style={{ borderRadius: "28px" }}
                    />
                  </div>
                  <div className="value ">85,246</div>
                  <div className="label">Orders</div>
                </div>
                <div className="stat-item">
                  <div className="icondd">
                    <img src="/img/in.png" style={{ borderRadius: "28px" }} />
                  </div>
                  <div className="value">$96,147</div>
                  <div className="label">Income</div>
                </div>
                <div className="stat-item">
                  <div className="icondd">
                    <img src="/img/Bell.png" style={{ borderRadius: "28px" }} />
                  </div>
                  <div className="value">846</div>
                  <div className="label">Notifications</div>
                </div>
                <div className="stat-item">
                  <div className="icondd">
                    <img
                      src="/img/Credit card.png"
                      style={{ borderRadius: "28px" }}
                    />
                  </div>
                  <div className="value">$84,472</div>
                  <div className="label">Payment</div>
                </div>
              </div>
            </div>

            <nav
              aria-label="Phân trang giao dịch"
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
                    pagination.page === totalPages || totalPages === 0
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
      {selectedPayment && (
        <Modal
          title="Chi tiết giao dịch"
          open={isModalOpen}
          onCancel={handleCloseModal}
          footer={null}
          width={800}
        >
          <div className="modal-body">
            <div className="transaction-details">
              <p>
                <strong>Mã giao dịch:</strong> {selectedPayment.transactionCode}
              </p>
              <p>
                <strong>Trạng thái:</strong>{" "}
                <span className={`status ${selectedPayment.status}`}>
                  {selectedPayment.status.toUpperCase()}
                </span>
              </p>
              <p>
                <strong>Ngày thanh toán:</strong>{" "}
                {selectedPayment.paidAt
                  ? new Date(selectedPayment.paidAt).toLocaleString("vi-VN")
                  : "Chưa thanh toán"}
              </p>
              <hr />
              <h5>Thông tin gói</h5>
              <p>
                <strong>Tên gói:</strong> {selectedPayment.package.name}
              </p>
              <p>
                <strong>Mô tả:</strong> {selectedPayment.package.description}
              </p>
              <p>
                <strong>Danh mục:</strong>{" "}
                {selectedPayment.package.category?.name}
              </p>
              <p>
                <strong>Giá:</strong>{" "}
                {selectedPayment.package.price.toLocaleString("vi-VN")} VND
              </p>
              <p>
                <strong>Lượt thích:</strong>{" "}
                {selectedPayment.package.totalLikes}
              </p>
            </div>
            <hr />

            <h4>Hình ảnh của gói</h4>
            <div className="prompt-images">
              <div className="prompt-image-item">
                <p>
                  <strong>Thumbnail:</strong>
                </p>
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "1/1",
                    position: "relative",
                  }}
                >
                  <img
                    src={selectedPayment.package.thumbnail.url}
                    alt="Thumbnail"
                    className="prompt-thumbnail"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </div>
                <button
                  onClick={() =>
                    handleDownloadImage(selectedPayment.package.thumbnail.url)
                  }
                >
                  Tải thumbnail
                </button>
              </div>
            </div>
            <div className="prompt-images">
              {selectedPayment.package.images &&
                selectedPayment.package.images.map((image, index) => (
                  <div key={index} className="prompt-image-item">
                    <p>
                      <strong>Ảnh {index + 1}:</strong>
                    </p>
                    <div
                      style={{
                        width: "100%",
                        aspectRatio: "1/1",
                        position: "relative",
                      }}
                    >
                      <img
                        src={image.url}
                        alt={`Package image ${index + 1}`}
                        className="prompt-image"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                    <button onClick={() => handleDownloadImage(image.url)}>
                      Tải ảnh
                    </button>
                  </div>
                ))}
            </div>

            <hr />
            <h4>Prompts chi tiết</h4>
            <div className="prompts-list">
              {selectedPayment.package.prompts.map((prompt, index) => (
                <div key={index} className="prompt-item">
                  <h5>Prompt {index + 1}</h5>
                  <p>
                    <strong>Câu hỏi:</strong> {prompt.question}
                  </p>
                  <p>
                    <strong>Trả lời:</strong> {prompt.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Modal>
      )}
    </section>
  );
};

export default Transaction;
