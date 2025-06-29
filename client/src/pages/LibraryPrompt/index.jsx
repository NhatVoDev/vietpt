import React, { useEffect } from 'react';
import Swiper from 'swiper/bundle'; // Import Swiper
import 'swiper/css/bundle'; // Import Swiper styles
import './libraryPrompt.css'; // Import file CSS của bạn

const LibraryPrompt = () => {

  // Logic JavaScript sẽ được đưa vào useEffect
  useEffect(() => {
    // Khởi tạo Swiper
    const swiper = new Swiper(".mySwiper", {
        effect: "coverflow",
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 150,
            modifier: 2,
            slideShadows: false,
        },
        loop: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });

    // Hàm cân bằng chiều cao của các item FAQ
    function matchFaqItemHeights() {
        const leftItems = document.querySelectorAll('.col-md-6:nth-child(1) .faq-item');
        const rightItems = document.querySelectorAll('.col-md-6:nth-child(2) .faq-item');
        
        if (!leftItems.length || !rightItems.length) return;

        const itemCount = Math.min(leftItems.length, rightItems.length);

        for (let i = 0; i < itemCount; i++) {
            leftItems[i].style.height = 'auto';
            rightItems[i].style.height = 'auto';

            const leftHeight = leftItems[i].offsetHeight;
            const rightHeight = rightItems[i].offsetHeight;
            const maxHeight = Math.max(leftHeight, rightHeight);

            leftItems[i].style.height = rightItems[i].style.height = maxHeight + 'px';
        }
    }

    // Gắn event listener
    window.addEventListener('load', matchFaqItemHeights);
    window.addEventListener('resize', matchFaqItemHeights);

    // Chạy lần đầu khi component được mount
    matchFaqItemHeights();

    // Cleanup function để gỡ bỏ event listener khi component bị unmount
    return () => {
        window.removeEventListener('load', matchFaqItemHeights);
        window.removeEventListener('resize', matchFaqItemHeights);
        // Hủy Swiper instance để tránh rò rỉ bộ nhớ
        if (swiper) swiper.destroy(true, true);
    };
  }, []); // Mảng rỗng đảm bảo useEffect chỉ chạy một lần sau khi component mount

  return (
    <>
      {/* Header đã được chuyển thành component dùng chung trong MainLayout, 
          nên chúng ta sẽ không render nó ở đây nữa. */}

      <section className="library-Prompt-section py-5 p-5">
        <div className="container-fluid">
          <div className="text-center">
            <img src="/img/logo.png" style={{ width: '207.852px', height: '182.079px' }} alt="VietPrompt Logo" />
            <p>Trang web bộ prompt AI – nơi kiến kho tàng tri thức ảnh nghệ thuật chỉ với một vài khoảnh khắc.</p>
            <div className="search-bar d-flex justify-content-center">
              <input type="text" className="form-control" placeholder="Tìm kiếm prompt..." />
              <button className="btn btn-search">Search</button>
              <button className="btn btn-random-prompt ms-2"><i className="bi bi-dice-3-fill"></i></button>
            </div>
          </div>

          <div className="press-section text-white text-center">
            <div className="d-flex justify-content-center flex-wrap gap-5 align-items-center">
              <img src="/img/loginAdmin/tnyt.png" alt="New York Times" height="24" />
              <div style={{ fontSize: '16px', fontWeight: 700 }}>Prompt on VIETPROMPT</div>
              <img src="/img/loginAdmin/twpt.png" alt="Washington Post" height="24" />
              <img src="/img/loginAdmin/buni.png" alt="Business Insider" height="24" />
              <img src="/img/loginAdmin/abc.png" alt="ABC" height="24" />
              <img src="/img/loginAdmin/politico.png" alt="Politico" height="24" />
              <img src="/img/loginAdmin/tec.png" alt="TechCrunch" height="24" />
              <img src="/img/loginAdmin/fast.png" alt="Fast Company" height="24" />
            </div>
          </div>

          <div className="dashboard__partners py-3 text-center">
            <div className="container-fluid">
              <div className="row justify-content-between align-items-center">
                <div className="col-auto d-flex align-items-center justify-content-center"><img src="/img/waverio.svg" alt="weavio" className="img-fluid" /></div>
                <div className="col-auto"><img src="/img/squareStore.svg" alt="squarestone" className="img-fluid" /></div>
                <div className="col-auto"><img src="/img/martino.svg" alt="martino" className="img-fluid" /></div>
                <div className="col-auto"><img src="/img/virogan.svg" alt="virogen" className="img-fluid" /></div>
                <div className="col-auto"><img src="/img/vertex.svg" alt="vertex" className="img-fluid" /></div>
                <div className="col-auto"><img src="/img/aromix.svg" alt="aromix" className="img-fluid" /></div>
                <div className="col-auto"><img src="/img/fireli.svg" alt="freli" className="img-fluid" /></div>
                <div className="col-auto text-white">Natroma</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="image-carousel-section">
        <div className="container-fluid">
          <div className="swiper mySwiper">
            <div className="swiper-wrapper">
              <div className="swiper-slide">
                <img src="/img/thuvien1.png" alt="Prompt 1" />
              </div>
              <div className="swiper-slide">
                <img src="/img/anh2.png" alt="Prompt 2" />
              </div>
              <div className="swiper-slide">
                <img src="/img/anh4.png" alt="Prompt 3" />
              </div>
              <div className="swiper-slide">
                <img src="/img/rong.png" alt="Prompt 4" />
              </div>
              <div className="swiper-slide">
                <img src="/img/anh2.png" alt="Prompt 5" />
              </div>
            </div>
          </div>
          <div className="swiper-pagination mt-3"></div>

          <div className="carousel-controls text-center mt-3">
            <button className="btn me-2 btn-favorites">THÊM YÊU THÍCH</button>
            <button className="btn me-2 btn-details">XEM CHI TIẾT</button>
            <button className="btn btn-create-prompt">MUA PROMPT</button>
          </div>
        </div>
      </section>

      <section className="faq-section py-5">
        <div className="container">
          <div className="faqs-label text-center text-uppercase mb-3">FAQs</div>
          <h2 className="text-white text-center">Hỏi & Đáp</h2>
          <p className="text-center text-white-50 mb-5">Bạn thắc mắc khi sử dụng Vietprompt? Dưới đây là những câu hỏi phổ biến để giúp bạn dễ dàng bắt đầu và khai thác tối đa tính năng nền tảng.</p>
          <div className="row">
            <div className="col-md-6">
              <div className="faq-item">
                <div>
                  <span>1. Làm sao để mua PROMPT tại VietPrompt?</span>
                  <p>Chỉ cần <a href="#">CLICK</a> vào đây, VIETPROMPT sẽ đưa bạn đến trang đăng kí tài khoản. Nếu bạn đã là thành viên, hãy <a href="#">ĐĂNG NHẬP</a>.</p>
                </div>
                <div className="faq-icon-box"> <i className="bi bi-dash-lg"></i></div>
              </div>
              <div className="faq-item">
                <div>
                  <span>2. Tôi có thể kiểm tra PROMPT trước khi mua không?</span>
                  <p>Chỉ cần <a href="#">CLICK</a> và VIETPROMPT sẽ đưa bạn đến mục tìm kiếm ngay lập tức.</p>
                </div>
                <div className="faq-icon-box"> <i className="bi bi-dash-lg"></i></div>
              </div>
              <div className="faq-item">
                <div>
                  <span>3. Tôi có thể hoàn lại PROMPT đã mua không?</span>
                  <p>Có. Bạn có thể nhấn vào <a href="#">“Thêm yêu thích”</a> sau khi đã lựa được prompt ưng ý từ thư viện prompt..</p>
                </div>
                <div className="faq-icon-box"> <i className="bi bi-dash-lg"></i></div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="faq-item">
                <div>
                  <span>4. Tôi có thể thanh toán qua giao dịch ở đâu?</span>
                  <p>Bạn có thể xem chi tiết các gói tại trang Gói dịch vụ trên thanh menu chính hoặc<a href="#">CLICK HERE.</a>.</p>
                </div>
                <div className="faq-icon-box"> <i className="bi bi-dash-lg"></i></div>
              </div>
              <div className="faq-item">
                <div>
                  <span>5. Làm sao để nâng cấp tài khoản VIP?</span>
                  <p>Vào Tài khoản của tôi, Nâng cấp gói, Chọn gói hoặc<a href="#">CLICK HERE</a> để tham khảo ngay các gói khác.</p>
                </div>
                <div className="faq-icon-box"> <i className="bi bi-dash-lg"></i></div>
              </div>
              <div className="faq-item">
                <div>
                  <span>6. Tôi có cần tạo tài khoản để sử dụng VietPrompt không?</span>
                  <p>Bạn chỉ cần click vào mục Liên hệ trong thanh menu hoặc <a href="#">CLICK HERE</a> để được hỗ trợ ngay.</p>
                </div>
                <div className="faq-icon-box"> <i className="bi bi-dash-lg"></i></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="dashboard__download text-center py-5 bg-light">
        <h6 className="dashboard__download-title mb-3">DOWNLOAD</h6>
        <div className="dashboard__logo mb-3">
          <img src="/img/logo.png" alt="Viet Prompt" height="172px" />
        </div>
        <div className="dashboard__store-buttons d-flex justify-content-center gap-3">
          <a href="#" className="btn btn-dark px-4"><img src="/img/Group.svg" alt="" /> Google Playstore</a>
          <a href="#" className="btn btn-dark px-4"><img src="/img/Symbols.svg" alt="" /> Apple Appstore</a>
          <a href="#" className="btn btn-dark px-4"><img src="/img/widnows-store 1.svg" alt="" /> Microsoft Store</a>
        </div>
      </div>
      {/* Footer cũng sẽ được render bởi MainLayout, nên ta không cần nó ở đây */}
    </>
  );
};

export default LibraryPrompt;