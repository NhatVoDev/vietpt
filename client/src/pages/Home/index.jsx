import React from "react";
import "./about.css";

const HomePage = () => {
  return (
    <>
      <section className="hero text-center pt-3">
        <div className="container position-relative">
          <h1 className="hero__main-title text-uppercase mb-2">Vietprompt</h1>
          <h2 className="hero__slogan mb-4">CHẠM Ý TƯỞNG - BẬT SÁNG TẠO</h2>
          <p className="hero__description mb-5">
            VietPrompt là hệ thống thư viện prompt AI X8 mạnh mẽ hàng đầu tại
            Việt Nam. <br />
            Giúp người dùng dễ dàng khai thác sức mạnh của AI, nâng cao hiệu quả
            công việc.
          </p>

          <div className="hero__illustration-wrapper">
            <div className="hero__circle-icons">
              <div className="dashboard__logo hero__center-logo">
                <img src="/img/logo.png" alt="Viet Prompt" />
              </div>
              <i className="bi bi-play icon-pos-1" alt="icon"></i>
              <i className="bi bi-briefcase icon-pos-2" alt="icon"></i>
              <i className="bi bi-calendar icon-pos-3" alt="icon"></i>
              <i className="bi bi-cpu icon-pos-4" alt="icon"></i>
              <i className="bi bi-globe icon-pos-5" alt="icon"></i>
              <i className="bi bi-share icon-pos-6" alt="icon"></i>
              <i className="bi bi-file-earmark-text icon-pos-7" alt="icon"></i>
              <i className="bi bi-gear icon-pos-8" alt="icon"></i>
              <i className="bi bi-search icon-pos-9" alt="icon"></i>
              <i className="bi bi-info-circle icon-pos-10" alt="icon"></i>
              <i className="bi bi-lightning-charge icon-pos-11" alt="icon"></i>
              <i className="bi bi-music-note-beamed icon-pos-12" alt="icon"></i>
              <i className="bi bi-chat-dots icon-pos-13" alt="icon"></i>
              <i className="bi bi-book icon-pos-14" alt="icon"></i>
              <i className="bi bi-cup-hot icon-pos-15" alt="icon"></i>
              <i className="bi bi-image icon-pos-16" alt="icon"></i>
              <i className="bi bi-mic icon-pos-17" alt="icon"></i>
              <i className="bi bi-cpu icon-pos-18" alt="icon"></i>
            </div>
          </div>
        </div>

        {/* Logo brands */}
        <div className="dashboard__partners py-3 mb-5 text-center">
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
      </section>

      <section className="features py-5">
        <div className="container text-center">
          <h3 className="features__main-title text-uppercase mb-3">
            CÁC TÍNH NĂNG CỦA VIETPROMPT
          </h3>
          <p className="features__description mb-5">
            VIETPROMPT cung cấp một hệ sinh thái hỗ trợ sáng tạo, tìm kiếm, và
            tùy biến prompt cho AI một cách hiệu quả, phù hợp với nhu cầu cá
            nhân và chuyên nghiệp. Với các tính năng thông minh, VietPrompt giúp
            người dùng tiết kiệm thời gian, nâng cao chất lượng đầu ra, và tối
            ưu hóa trải nghiệm sử dụng công cụ AI.
          </p>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="feature-box p-4 rounded text-center">
                <div className="feature-box__icon-wrapper">
                  <i className="bi bi-clock-fill"></i>
                </div>
                <h5 className="feature-box__title mb-2">Hỗ Trợ 24/7</h5>
                <p className="feature-box__text">
                  Luôn sẵn sàng trực tuyến để hỗ trợ người dùng ngay khi cần,
                  tăng hiệu suất làm việc và đảm bảo trải nghiệm liền mạch.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-box p-4 rounded text-center">
                <div className="feature-box__icon-wrapper">
                  <i className="bi bi-lightning-charge-fill"></i>
                </div>
                <h5 className="feature-box__title mb-2">Phản hồi tức thì</h5>
                <p className="feature-box__text">
                  Tìm được prompt phù hợp chỉ trong vài giây, giúp tiết kiệm
                  thời gian và tối ưu hiệu quả sử dụng công cụ AI.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-box p-4 rounded text-center">
                <div className="feature-box__icon-wrapper">
                  <i className="bi bi bi-gear"></i>
                </div>
                <h5 className="feature-box__title mb-2">
                  Cá nhân hóa thông minh
                </h5>
                <p className="feature-box__text">
                  Gợi ý prompt dựa trên lịch sử, sở thích và lĩnh vực quan tâm
                  của bạn – mang đến trải nghiệm phù hợp và chuyên biệt.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-box p-4 rounded text-center">
                <div className="feature-box__icon-wrapper">
                  <i className="bi bi-sliders"></i>
                </div>
                <h5 className="feature-box__title mb-2">Tối ưu linh hoạt</h5>
                <p className="feature-box__text">
                  Tạo ra các prompt được tối ưu hóa cho từng loại nội dung, từ
                  văn bản đến hình ảnh và video.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-box p-4 rounded text-center">
                <div className="feature-box__icon-wrapper">
                  <i className="bi bi-globe2"></i>
                </div>
                <h5 className="feature-box__title mb-2">Hỗ trợ đa ngôn ngữ</h5>
                <p className="feature-box__text">
                  Với khả năng hỗ trợ nhiều ngôn ngữ, VietPrompt phá bỏ rào cản,
                  kết nối người dùng toàn cầu.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-box p-4 rounded text-center">
                <div className="feature-box__icon-wrapper">
                  <i className="bi bi bi-book-fill"></i>
                </div>
                <h5 className="feature-box__title mb-2">Kết nối liền mạch</h5>
                <p className="feature-box__text">
                  Tích hợp API giúp người dùng dễ dàng kết nối với các ứng dụng
                  và nền tảng khác.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="resources py-3">
        <div className="container text-center">
          <div className="row g-4 align-items-center">
            <div className="col-md-6 resources__gallery">
              <div className="resources__gallery-grid">
                <img
                  src="/img/a1.jpg"
                  alt="Resource 1"
                  className="img-fluid rounded resource-img-item resource-img-tall"
                />
                <img
                  src="/img/a2.jpg"
                  alt="Resource 2"
                  className="img-fluid rounded resource-img-item"
                />
                <img
                  src="/img/a3.jpg"
                  alt="Resource 3"
                  className="img-fluid rounded resource-img-item"
                />
                <img
                  src="/img/a4.jpg"
                  alt="Resource 4"
                  className="img-fluid rounded resource-img-item resource-img-tall"
                />
                <img
                  src="/img/a5.jpg"
                  alt="Resource 5"
                  className="img-fluid rounded resource-img-item"
                />
                <img
                  src="/img/a6.jpg"
                  alt="Resource 6"
                  className="img-fluid rounded resource-img-item"
                />
                <img
                  src="/img/a7.jpg"
                  alt="Resource 7"
                  className="img-fluid rounded resource-img-item resource-img-tall"
                />
                <img
                  src="/img/a2.jpg"
                  alt="Resource 8"
                  className="img-fluid rounded resource-img-item"
                />
                <img
                  src="/img/a1.jpg"
                  alt="Resource 9"
                  className="img-fluid rounded resource-img-item"
                />
              </div>
            </div>
            <div className="col-md-6 resources__stats">
              <h3 className="resources__title text-uppercase mb-5">
                NGUỒN TÀI NGUYÊN ĐẾN TỪ VIETPROMPT
              </h3>
              <div className="row g-4">
                <div className="col-6">
                  <div className="stat-box p-4 text-center rounded">
                    <h4 className="stat-box__number">500K+</h4>
                    <p className="stat-box__text">
                      500.000+ tài nguyên chọn lọc, hỗ trợ tìm kiếm và lưu trữ.
                    </p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="stat-box p-4 text-center rounded">
                    <h4 className="stat-box__number">100M+</h4>
                    <p className="stat-box__text">
                      100M prompt cao cấp, đa dạng chủ đề.
                    </p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="stat-box p-4 text-center rounded">
                    <h4 className="stat-box__number">0.01sec</h4>
                    <p className="stat-box__text">
                      Phản hồi siêu nhanh, xử lý khối lượng lớn tức thì.
                    </p>
                  </div>
                </div>
                <div className="col-6">
                  <div className="stat-box p-4 text-center rounded">
                    <h4 className="stat-box__number">100K+</h4>
                    <p className="stat-box__text">
                      Truy cập 100.000 prompt phổ biến, miễn phí. Phù hợp cho
                      người mới.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="reviews">
        <img
          src="/img/logo.png"
          alt="Logo VietPrompt"
          className="reviews__logo"
        />
        <div className="reviews__container">
          {/* BÊN TRÁI */}
          <div className="reviews__left">
            <h2 className="reviews__title">
              Lượt truy cập và
              <br />
              đánh giá tổng quan
            </h2>
            <p className="reviews__description">
              Vietprompt tự hào là nền tảng được nhiều người dùng tin tưởng với
              lượt truy cập tăng trưởng liên tục và hàng loạt đánh giá 5 sao
              trên các nền tảng uy tín.
            </p>
            <p className="reviews__commitment">
              Chúng tôi cam kết mang đến trải nghiệm tối ưu, nội dung chất lượng
              và công cụ hỗ trợ sáng tạo hiệu quả nhất cho cộng đồng người dùng
              AI.
            </p>
            <div className="d-flex align-items-center gap-3 mb-3">
              <div style={{ width: 40, height: 40 }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
                  <circle cx="32" cy="32" r="32" fill="#e0faff" />
                  <circle cx="32" cy="32" r="24" fill="#419eb2" />
                  <text
                    x="50%"
                    y="62%"
                    textAnchor="middle"
                    fontSize="24"
                    fill="white"
                    fontFamily="Arial, sans-serif"
                  >
                    ⌘
                  </text>
                </svg>
              </div>
              <strong>Hơn 10.000 lượt truy cập mỗi tháng</strong>
            </div>
            <div className="d-flex align-items-center gap-3">
              <div style={{ width: 40, height: 40 }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
                  <circle cx="32" cy="32" r="32" fill="#e0faff" />
                  <circle cx="32" cy="32" r="24" fill="#419eb2" />
                  <text
                    x="50%"
                    y="62%"
                    textAnchor="middle"
                    fontSize="24"
                    fill="white"
                    fontFamily="Arial, sans-serif"
                  >
                    ⌘
                  </text>
                </svg>
              </div>
              <strong>Đánh giá 5.0★ trên Google Play,Apple Store</strong>
            </div>
          </div>

          {/* BÊN PHẢI */}
          <div className="reviews__right">
            {[...Array(6)].map((_, idx) => (
              <div className="review-card " key={idx}>
                <div className="review-card__platform-icon google-play-icon mb-3">
                  <img src="/img/Symbols.svg" alt="platform" />
                </div>
                <div className="d-flex justify-content-around">
                  <div className="review-card__avatar-container">
                    <img
                      className="review-card__avatar"
                      src="/img/avtgt.png"
                      alt="avatar"
                    />
                    <div className="review-card__heart-icon"></div>
                  </div>
                  <div className="review-card__info">
                    <h4 className="review-card__name">Mira Thomson</h4>
                    <div className="review-card__stars">★★★★★</div>
                    <div className="review-card__rating-platform">
                      Rated <b>5.0</b> on Google Playstore
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
