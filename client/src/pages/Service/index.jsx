
import "./service.css";
const servicePage = () => {
    return (
    <>
  <section className="service-section p-5">
      <div className="container-fluid">
        <div className="account-packages-content">
          <h2 className="section-title text-center mb-4">
            CÁC GÓI DỊCH VỤ TÀI KHOẢN
          </h2>
          <p className="section-subtitle text-center text-white mb-5">
            Giới thiệu về các gói dịch vụ nâng cấp tài khoản của VIETPROMPT
          </p>
          <div className="container d-flex justify-content-center gap-4">
            <div className="package-card-service">
              <h3 className="package-title">Gói Miễn Phí</h3>
              <p className="package-price">0 vnd</p>
              <ul className="package-features list-unstyled">
                <li>Responsive website design and development</li>
                <li>Basic SEO</li>
                <li>Community support</li>
              </ul>
              <button className="btn btn-primary package-button">Đăng ký ngay</button>
            </div>

            <div className="package-card-service active">
              <h3 className="package-title">Gói Trải Nghiệm</h3>
              <p className="package-price">50.000 vnd</p>
              <ul className="package-features list-unstyled">
                <li>Responsive website design and development</li>
                <li>Advanced SEO optimization</li>
                <li>Priority support</li>
                <li>PPC Management</li>
              </ul>
              <button className="btn btn-primary package-button">Đăng ký ngay</button>
            </div>

            <div className="package-card-service">
              <h3 className="package-title">Gói Cao Cấp</h3>
              <p className="package-price">300.000 vnd</p>
              <ul className="package-features list-unstyled">
                <li>Advanced business plan</li>
                <li>Full SEO and marketing</li>
                <li>Performance analysis and reporting</li>
                <li>Unlimited support</li>
              </ul>
              <button className="btn btn-primary package-button">Đăng ký ngay</button>
            </div>
          </div>
        </div>

        <div className="press-section text-white text-center">
          <div className="d-flex justify-content-center flex-wrap gap-5 align-items-center">
            <img src="/img/loginAdmin/tnyt.png" alt="New York Times" height="24" />
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
              <div className="col-auto d-flex align-items-center justify-content-center">
                <img src="/img/waverio.svg" alt="weavio" className="img-fluid" />
              </div>
              <div className="col-auto">
                <img src="/img/squareStore.svg" alt="squarestone" className="img-fluid" />
              </div>
              <div className="col-auto">
                <img src="/img/martino.svg" alt="martino" className="img-fluid" />
              </div>
              <div className="col-auto">
                <img src="/img/virogan.svg" alt="virogen" className="img-fluid" />
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
      <div class="dashboard__download text-center py-5 bg-light">
    <h6 class="dashboard__download-title mb-3">DOWNLOAD</h6>
    <div class="dashboard__logo mb-3">
      <img src="/img/logo.png" alt="Viet Prompt" height="172px" />
    </div>
    <div class="dashboard__store-buttons d-flex justify-content-center gap-3">
      <a href="#" class="btn btn-dark px-4"><img src="/img/Group.svg" /> Google Playstore</a>
      <a href="#" class="btn btn-dark px-4"><img src="/img/Symbols.svg" /> Apple Appstore</a>
      <a href="#" class="btn btn-dark px-4"><img src="/img/widnows-store 1.svg" /> Microsoft Store</a>
    </div>
  </div>
    </>
)
}
export default servicePage;