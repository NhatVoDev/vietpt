import "./payment-failure.css";

const PaymentFailure = () => {
  return (
    <section className="payment-successful-section py-5 p-5">
      <div className="container-fluid">
        <div className="payment-success-message text-center text-white mb-5">
          <span className="display-2 fw-bolder text-uppercase">
            Thanh toán
            <br />
            Thất bại!
          </span>
          <p className="lead mt-3">
            Cảm ơn đã sử dụng dịch vụ!
            <br />
            Vui lòng thử lại!
          </p>
        </div>

        <div className="press-section text-white text-center">
          <div className="d-flex justify-content-center flex-wrap gap-5 align-items-center">
            <img
              src="/img/loginAdmin/tnyt.png"
              alt="New York Times"
              height="24"
            />
            <div style={{ fontSize: "16px", fontWeight: "700" }}>
              Prompt on VIETPROMPT
            </div>
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
      </div>
    </section>
  );
};

export default PaymentFailure;
