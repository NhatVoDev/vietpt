import "./contact.css";

const Contact = () => {
  return (
    <section className="contact-section py-5 p-5">
      <div className="container">
        <div className="row ">
          <div className="col-lg-6 col-md-12 p-4">
            <div className="contact-info-wrapper h-100">
              <div>
                <h2 className="mb-5 fw-bold">
                  Thông tin liên lạc và đánh giá website
                </h2>
                <div className="contact-info">
                  <div className="d-flex align-items-center contact-info__item">
                    <i className="bi bi-envelope-fill"></i>
                    <span>VIETPROMPT@gmail.com</span>
                  </div>
                  <div className="d-flex align-items-center contact-info__item">
                    <i className="bi bi-telephone-fill"></i>
                    <span>+123 456 789</span>
                  </div>
                  <div className="d-flex align-items-center contact-info__item">
                    <i className="bi bi-geo-alt-fill"></i>
                    <span>123 Street 487 House</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="contact-info__social">
                  <a href="#">
                    <i className="bi bi-linkedin"></i>
                  </a>
                  <a href="#">
                    <i className="bi bi-behance"></i>
                  </a>
                  <a href="#">
                    <i className="bi bi-instagram"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-12 p-4">
            <div className="contact-form-wrapper ">
              <form>
                <div className="form-group">
                  <label className="form-label">Điều làm bạn thích thú?</label>
                  <div className="topics-container">
                    <input
                      type="radio"
                      id="topic1"
                      name="topic"
                      value="content1"
                      checked
                    />
                    <label htmlFor="topic1">Nội dung</label>

                    <input
                      type="radio"
                      id="topic2"
                      name="topic"
                      value="content2"
                    />
                    <label htmlFor="topic2">Nội dung</label>

                    <input
                      type="radio"
                      id="topic2"
                      name="topic"
                      value="content3"
                    />
                    <label htmlFor="topic2">Nội dung</label>

                    <input
                      type="radio"
                      id="topic2"
                      name="topic"
                      value="content4"
                    />
                    <label htmlFor="topic2">Nội dung</label>

                    <input
                      type="radio"
                      id="topic2"
                      name="topic"
                      value="other"
                    />
                    <label htmlFor="topic2">Khác</label>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="fullName" className="form-label">
                    Họ & Tên
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    className="form-control-custom"
                    placeholder="Nội dung"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Your email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="form-control-custom"
                    placeholder="email@gmail.com"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="review" className="form-label">
                    Đánh giá
                  </label>
                  <textarea
                    id="review"
                    className="form-control-custom"
                    rows="4"
                  ></textarea>
                </div>

                <button type="submit" className="btn-send">
                  Send message
                </button>
              </form>
            </div>
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
      </div>
    </section>
  );
};

export default Contact;
