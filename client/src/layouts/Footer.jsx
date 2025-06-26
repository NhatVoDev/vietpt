import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer pt-5 pb-4">
      <div className="container">
        <div className="row">
          <div className="col-6 col-md-2 footer__column">
            <h5 className="footer__title">Về VietPrompt</h5>
            <ul className="footer__list">
              <li className="footer__item">
                <a href="#" className="footer__link">
                  Giới thiệu
                </a>
              </li>
              <li className="footer__item">
                <a href="#" className="footer__link">
                  Tuyển dụng
                </a>
              </li>
              <li className="footer__item">
                <a href="#" className="footer__link">
                  Liên hệ
                </a>
              </li>
            </ul>
          </div>

          <div className="col-6 col-md-2 footer__column">
            <h5 className="footer__title">Phản hồi</h5>
            <ul className="footer__list">
              <li className="footer__item">
                <a href="#" className="footer__link">
                  Đánh giá
                </a>
              </li>
              <li className="footer__item">
                <a href="#" className="footer__link">
                  Tính năng
                </a>
              </li>
              <li className="footer__item">
                <a href="#" className="footer__link">
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          <div className="col-6 col-md-2 footer__column">
            <h5 className="footer__title">Thông tin</h5>
            <ul className="footer__list">
              <li className="footer__item">Fill text</li>
              <li className="footer__item">Fill text</li>
              <li className="footer__item">Fill text</li>
              <li className="footer__item">Fill text</li>
              <li className="footer__item">Fill text</li>
            </ul>
          </div>

          <div className="col-md-3 footer__column">
            <h5 className="footer__title">Tổng đài hỗ trợ</h5>
            <ul className="footer__list">
              <li className="footer__item">
                Mua hàng:
                <strong className="footer__item.content">0123 456 789</strong>
              </li>
              <li className="footer__item">
                Bảo hành:
                <strong className="footer__item.content">0123 456 789</strong>
              </li>
              <li className="footer__item">
                Khiếu nại:
                <strong className="footer__item.content">0123 456 789</strong>
              </li>
              <li className="footer__item">
                Email:
                <strong className="footer__item.content">
                  vietprompt@gmail.com
                </strong>
              </li>
            </ul>
          </div>

          <div className="col-md-3 footer__column">
            <h5 className="footer__title">Nền tảng</h5>
            <div className="footer__platform d-flex gap-2 mb-3">
              <img src="/img/App_Store_(iOS).svg.png" alt="App Store" />
              <img src="/img/Microsoft_Store_app_icon.png" alt="Google Play" />
              <img
                src="/img/google-play-icon-2048x2048-487quz63.png"
                alt="Huawei"
              />
            </div>
            <h5 className="footer__title">Subscribe</h5>
            <div className="footer__subscribe">
              <input
                type="text"
                className="form-control"
                placeholder="Get product updates"
              />
            </div>
          </div>
        </div>

        <div className="footer__bottom d-flex flex-column flex-md-row justify-content-between align-items-center pt-4 mt-4">
          <div className="footer__social d-flex align-items-center gap-3 mb-3 mb-md-0">
            <strong>Kết nối với chúng tôi</strong>
            <a href="#">
              <img src="/img/fb.png" />
            </a>
            <a href="#">
              <img src="/img/ig.png" />
            </a>
            <a href="#">
              <img src="/img/tt.png" />
            </a>
          </div>
          <div className="footer__copyright">
            © 2025 Fexties. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
