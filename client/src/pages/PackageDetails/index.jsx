import { useParams } from "react-router-dom";
import "./packageDetails.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import http from "../../api/http";
import { useAuthStore } from "../../store/authStore";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import usePayment from "../../hooks/usePayment";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const PackageDetails = () => {
  const user = useAuthStore((state) => state.user);
  const { id } = useParams();
  const [packageDetail, setPackageDetail] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const { handleCreatePayment } = usePayment();

  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);

  // Comment states
  const [comments, setComments] = useState([]);
  const [myComment, setMyComment] = useState(null);
  const [commentInput, setCommentInput] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [commentPage, setCommentPage] = useState(1);
  const [commentTotalPages, setCommentTotalPages] = useState(1);
  const [commentTotal, setCommentTotal] = useState(0);
  const commentLimit = 5;

  useEffect(() => {
    const fetchPackage = async () => {
      // Reset state trước khi fetch để đảm bảo Swiper cũ bị hủy nếu có
      setPackageDetail(null); 
      try {
        const response = await http.get(`/package/detail/${id}`);
        if (response.status === 200) {
          setPackageDetail(response.data.metadata.package);
        } else {
          toast.error(response.data.message || "Lỗi khi lấy thông tin gói dịch vụ");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || "Lỗi khi lấy thông tin gói dịch vụ");
      }
    };
    if (id) {
        fetchPackage();
    }
  }, [id]);

  const handleFavorite = async () => {
    try {
      const response = await http.put(`/package/favorite/${id}`);
      if (response.status === 200) {
        toast.success(
          isFavorite
            ? "Bỏ khỏi danh sách yêu thích thành công"
            : "Thêm vào danh sách yêu thích thành công"
        );
        setIsFavorite(!isFavorite);
      } else {
        toast.error(response.data.message || "Lỗi khi yêu thích gói dịch vụ");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Lỗi khi yêu thích gói dịch vụ"
      );
    }
  };

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const response = await http.get(`/package/detail/${id}`);
        if (response.status === 200) {
          setPackageDetail(response.data.metadata.package);
        } else {
          toast.error(
            response.data.message || "Lỗi khi lấy thông tin gói dịch vụ"
          );
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Lỗi khi lấy thông tin gói dịch vụ"
        );
      }
    };
    fetchPackage();
  }, [id]);

  useEffect(() => {
    if (user && packageDetail) {
      setIsFavorite(user?.favorites?.includes(packageDetail?._id));
    }
  }, [user, packageDetail]);

  // Fetch comments
  const fetchComments = async (page = 1) => {
    try {
      const res = await http.get(`/comment/package/${id}`, {
        params: { page, limit: commentLimit },
      });
      if (res.status === 200) {
        setComments(res.data.metadata.comments);
        setCommentTotalPages(res.data.metadata.pagination.totalPages);
        setCommentTotal(res.data.metadata.pagination.total);
        // Tìm comment của user hiện tại
        if (user) {
          const found = res.data.metadata.comments.find(
            (c) => c.user?._id === user._id
          );
          setMyComment(found || null);
          setCommentInput(found ? found.content : "");
          setIsEditing(!!found);
        } else {
          setMyComment(null);
          setCommentInput("");
          setIsEditing(false);
        }
      }
    } catch (err) {
      toast.error("Lỗi khi tải bình luận");
    }
  };

  useEffect(() => {
    if (id) fetchComments(commentPage);
    // eslint-disable-next-line
  }, [id, user, commentPage]);

  // Gửi hoặc cập nhật comment
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!commentInput.trim()) {
      toast.error("Nội dung bình luận không được để trống");
      return;
    }
    try {
      if (myComment) {
        // Update comment (giả sử có API PUT /comment/:id)
        const res = await http.put(`/comment/${myComment._id}`, {
          content: commentInput,
        });
        if (res.status === 200) {
          toast.success("Cập nhật bình luận thành công");
          fetchComments(commentPage);
        }
      } else {
        // Add new comment
        const res = await http.post("/comment", {
          content: commentInput,
          package: id,
        });
        if (res.status === 201) {
          toast.success("Gửi bình luận thành công");
          setCommentInput("");
          fetchComments(1);
          setCommentPage(1);
        }
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Lỗi khi gửi/cập nhật bình luận"
      );
    }
  };

  // Xóa bình luận
  const handleDeleteComment = async (commentId, isAdmin = false) => {
    try {
      const url = isAdmin
        ? `/comment/admin/${commentId}`
        : `/comment/${commentId}`;
      const res = await http.delete(url);
      if (res.status === 200) {
        toast.success("Xóa bình luận thành công");
        fetchComments(commentPage);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Lỗi khi xóa bình luận");
    }
  };

  const PaymentMethodModal = ({ isOpen, onClose, onSelectMethod, price, packageId }) => {
    if (!isOpen) return null;
  
    return (
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content text-white" onClick={(e) => e.stopPropagation()}>
          <h4 className="mb-4">Chọn phương thức thanh toán</h4>
          <div className="d-grid gap-3">
            <button className="btn btn-primary btn-lg" onClick={() => onSelectMethod('vnpay')}>
              Thanh toán qua VNPay
            </button>
            <button className="btn btn-info btn-lg" onClick={() => onSelectMethod('payos')}>
              Thanh toán qua PayOS (QR, Thẻ nội địa/quốc tế)
            </button>
          </div>
          <button className="btn btn-secondary mt-4" onClick={onClose}>Hủy</button>
        </div>
      </div>
    );
  };

  // --- START: Hàm xử lý khi chọn phương thức thanh toán ---
  const handleSelectPaymentMethod = (method) => {
    if (packageDetail) {
      handleCreatePayment(packageDetail.price, packageDetail._id, method);
      setPaymentModalOpen(false); // Đóng modal sau khi gọi API
    }
  };
  // --- END: Hàm xử lý khi chọn phương thức thanh toán ---

  return (
    <section className="detail-prompt-section p-5">
      <div className="container-fluid">
        <div className="main-content-block">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="text-white mb-2">{packageDetail?.name}</h4>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="d-flex align-items-center gap-2">
              <div className="main-content-block-button">
                <span className="badge2 rounded-pill badge-style p-2">
                  {packageDetail?.category?.name}
                </span>
              </div>
            </div>
            <div className="d-flex align-items-center gap-2">
              {packageDetail?.tags?.map((tag, index) => (
                <div className="button-title" key={index}>
                  <span className="badge badge-category p-2">{tag}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="row g-3 mb-4">
            <div className="col-lg-8">
            {packageDetail && packageDetail.images && packageDetail.images.length > 0 ? (
                <Swiper
                  key={id} 
                  observer={true}
                  observeParents={true}
                  modules={[Navigation, Pagination, Scrollbar, A11y]}
                  spaceBetween={0}
                  slidesPerView={1}
                  loop={true}
                  navigation={true}
                  pagination={{ clickable: true }}
                  scrollbar={{ draggable: true }}
                >
                  {packageDetail.images.map((image, index) => (
                    <SwiperSlide
                      key={index}
                      style={{
                        width: "100%",
                        position: "relative",
                        aspectRatio: "16/9",
                      }}
                    >
                      <img
                        src={image.url}
                        alt={`${packageDetail.name} - ${index + 1}`}
                        style={{
                          objectFit: "cover",
                          width: "100%",
                          height: "100%",
                        }}
                        onLoad={(e) => e.target.closest('.swiper')?.swiper.update()}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <div style={{ 
                    width: "100%", 
                    aspectRatio: "16/9", 
                    backgroundColor: "#333",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white'
                }}>
                  ...
                </div>
              )}
            </div>
            <div className="col-lg-4">
              <div className="artist-info-block text-white h-100">
                <div className="group-info d-flex align-items-center">
                  <img
                    src={
                      packageDetail?.user?.avatar || "/img/avatar-default.svg"
                    }
                    className="rounded-circle me-3"
                    alt={packageDetail?.user?.name}
                    style={{
                      width: "50px",
                      height: "50px",
                    }}
                  />
                  <div>
                    <span
                      className="mb-0"
                      style={{ color: "#000", fontWeight: "bold" }}
                    >
                      {packageDetail?.user?.fullName}
                    </span>
                    <div
                      className=" small"
                      style={{ color: "#64656D", fontWeight: "bold" }}
                    >
                      @{packageDetail?.user?.email}
                    </div>
                  </div>
                </div>
                {user && (
                  <div className="d-flex flex-column">
                    <button
                      className="btn btn-add-favorite mb-3"
                      onClick={handleFavorite}
                    >
                      {isFavorite
                        ? "Bỏ khỏi danh sách yêu thích"
                        : "Thêm vào danh sách yêu thích"}
                    </button>
                    {user._id !== packageDetail?.user?._id && (
                      <button
                        className="btn btn-create-prompt mb-3"
                        onClick={() => setPaymentModalOpen(true)}
                      >
                        Mua
                      </button>
                    )}
                  </div>
                )}
                <div className="group-Exclusive-Version-Details">
                  <div className="verified-text">
                    Created:{" "}
                    {packageDetail?.createdAt
                      ? new Date(packageDetail?.createdAt).toLocaleDateString(
                          "vi-VN",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          }
                        )
                      : "N/A"}
                  </div>
                  <div className="exclusive-details-block">
                    <div className="exclusive-title">
                      Exclusive Version Details
                    </div>
                    <div className="content-grid">
                      <div></div>
                      <div className="value">
                        <span className="lora-badge">PRICE</span>
                        <div>
                          {packageDetail?.price?.toLocaleString("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          })}
                        </div>
                      </div>

                      <div>Category</div>
                      <div className="value">
                        {packageDetail?.category?.name}
                      </div>

                      <div>Description</div>
                      <div className="value">{packageDetail?.description}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="title-botom">
            <span className="mb-2">Crystalpunk Anime by ChronoKnight</span>
            <p className="background-p-style">Use at Strength: 0.8</p>
          </div>
        </div>

        <div className="press-section text-white text-center">
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

        {/* COMMENT SECTION */}
        <div className="comment-section mt-5">
          <h5 className="text-white mb-3">Bình luận ({commentTotal})</h5>
          {user ? (
            <form onSubmit={handleSubmitComment} className="mb-4">
              <textarea
                className="form-control mb-2"
                rows={3}
                placeholder="Nhập bình luận của bạn..."
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                maxLength={500}
              />
              <button type="submit" className="btn btn-primary">
                {myComment ? "Cập nhật bình luận" : "Gửi bình luận"}
              </button>
            </form>
          ) : (
            <div className="alert alert-info">
              Bạn cần đăng nhập để bình luận.
            </div>
          )}
          <div className="comment-list">
            {comments.length === 0 && (
              <div className="text-white-50">Chưa có bình luận nào.</div>
            )}
            {comments.map((c) => (
              <div
                key={c._id}
                className="comment-item mb-3 p-3 rounded bg-dark text-white"
              >
                <div className="d-flex align-items-center mb-2">
                  <img
                    src={c.user?.avatar || "/img/avatar-default.svg"}
                    alt="avatar"
                    className="rounded-circle me-2"
                    style={{ width: 32, height: 32, objectFit: "cover" }}
                  />
                  <strong>{c.user?.fullName}</strong>
                  <span className="ms-2 text-secondary small">
                    {new Date(c.updatedAt).toLocaleString("vi-VN")}
                  </span>
                  {user && c.user?._id === user._id && (
                    <span className="badge bg-info ms-2">
                      Bình luận của bạn
                    </span>
                  )}
                  {/* Nút xóa cho user là chủ comment hoặc admin */}
                  {user &&
                    (c.user?._id === user._id || user.role === "admin") && (
                      <button
                        className="btn btn-sm btn-danger ms-2"
                        onClick={() =>
                          handleDeleteComment(
                            c._id,
                            user.role === "admin" && c.user?._id !== user._id
                          )
                        }
                      >
                        Xóa
                      </button>
                    )}
                </div>
                <div>{c.content}</div>
              </div>
            ))}
          </div>
          {/* Pagination */}
          {commentTotalPages > 1 && (
            <nav className="mt-3 d-flex justify-content-center">
              <ul className="pagination">
                <li
                  className={`page-item ${commentPage === 1 ? "disabled" : ""}`}
                  onClick={() =>
                    commentPage > 1 && setCommentPage(commentPage - 1)
                  }
                >
                  <a className="page-link" href="#">
                    Trước
                  </a>
                </li>
                <li className="page-item active">
                  <a className="page-link" href="#">
                    {commentPage}
                  </a>
                </li>
                <li
                  className={`page-item ${
                    commentPage === commentTotalPages ? "disabled" : ""
                  }`}
                  onClick={() =>
                    commentPage < commentTotalPages &&
                    setCommentPage(commentPage + 1)
                  }
                >
                  <a className="page-link" href="#">
                    Sau
                  </a>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
       {/* --- START: Render Modal --- */}
       <PaymentMethodModal
        isOpen={isPaymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        onSelectMethod={handleSelectPaymentMethod}
      />
      {/* --- END: Render Modal --- */}
    </section>
  );
};

export default PackageDetails;
