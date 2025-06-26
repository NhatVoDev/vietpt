import React from "react";
import "./admin.css";

const AdminPage = () => {
  return (
    <section className="dashboard">
      <div className="container-fluid">
        <main className="dashboard__main p-3">
          <div className="dashboard__stats row text-center mb-4">
            <div className="col-md-3 mb-3">
              <div className="dashboard__card1 card p-3 d-flex flex-column align-items-center">
                <div className="icon_card mb-2">
                  <img
                    src="/img/Image 15.png"
                    style={{ width: "26px", height: "25px" }}
                  />
                </div>
                <div className="so_card mb-1">
                  <p>$3.456K</p>
                </div>
                <div className="title_card d-flex justify-content-between w-100 px-2">
                  <p className="mb-0 text-start">Total views</p>
                  <p className="mb-0 text-end">0.43%</p>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="dashboard__card1 card p-3 d-flex flex-column align-items-center">
                <div className="icon_card mb-2">
                  <img
                    src="/img/giohang.png"
                    style={{ width: "26px", height: "25px" }}
                  />
                </div>
                <div className="so_card mb-1">
                  <p>$45,2K</p>
                </div>
                <div className="title_card d-flex justify-content-between w-100 px-2">
                  <p className="mb-0 text-start">Total Profit</p>
                  <p className="mb-0 text-end">4.35%</p>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="dashboard__card1 card p-3 d-flex flex-column align-items-center">
                <div className="icon_card mb-2">
                  <img
                    src="/img/tui.png"
                    style={{ width: "26px", height: "25px" }}
                  />
                </div>
                <div className="so_card mb-1">
                  <p>2.450</p>
                </div>
                <div className="title_card d-flex justify-content-between w-100 px-2">
                  <p className="mb-0 text-start">Total Product</p>
                  <p className="mb-0 text-end">2.59%</p>
                </div>
              </div>
            </div>

            <div className="col-md-3 mb-3">
              <div className="dashboard__card1 card p-3 d-flex flex-column align-items-center">
                <div className="icon_card mb-2">
                  <img
                    src="/img/nguoi.png"
                    style={{ width: "26px", height: "25px" }}
                  />
                </div>
                <div className="so_card mb-1">
                  <p>3.456</p>
                </div>
                <div className="title_card d-flex justify-content-between w-100 px-2">
                  <p className="mb-0 text-start">Total Users</p>
                  <p className="mb-0 text-end">0.95%</p>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard__charts row mb-4">
            <div className="col-md-7">
              <div className="dashboard__card2 card p-3">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="chartType"
                        checked
                      />
                      <label className="form-check-label text-primary fw-bold">
                        Total Revenue
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="chartType"
                      />
                      <label className="form-check-label text-info fw-bold">
                        Total Sales
                      </label>
                    </div>
                  </div>
                  <div className="btn-group">
                    <button className="btn btn-sm">Day</button>
                    <button className="btn btn-sm">Week</button>
                    <button className="btn btn-sm">Month</button>
                  </div>
                </div>
                <canvas id="chartStatistics"></canvas>
              </div>
            </div>

            <div className="col-md-5">
              <div className="dashboard__card2 card p-3">
                <div className="d-flex justify-content-between align-items-center">
                  <h6 className="mb-0 fw-bold">Profit this week</h6>
                  <select className="form-select form-select-sm w-auto">
                    <option selected>This Week</option>
                    <option>Last Week</option>
                  </select>
                </div>
                <canvas id="chartProfit"></canvas>
              </div>
            </div>
          </div>

          <div className="dashboard__watched row text-center">
            <div className="col-md-4 mb-3">
              <div className="dashboard__card3 p-3">
                <div className="icon_card3">
                  <img src="/img/notification.svg" />
                </div>
                <div>
                  <p>2/8 Watched</p>
                  <p>Product Design</p>
                </div>
                <div
                  style={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img src="/img/more.svg" />
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="dashboard__card3 p-3">
                <div className="icon_card3">
                  <img src="/img/notification.svg" />
                </div>
                <div>
                  <div>
                    <p>2/8 Watched</p>
                  </div>
                  <div>
                    <p>Product Design</p>
                  </div>
                </div>
                <div
                  style={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img src="/img/more.svg" />
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="dashboard__card3 p-3">
                <div className="icon_card3">
                  <img src="/img/notification.svg" />
                </div>
                <div>
                  <p>2/8 Watched</p>
                  <p>Product Design</p>
                </div>
                <div
                  style={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <img src="/img/more.svg" />
                </div>
              </div>
            </div>
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
    </section>
  );
};

export default AdminPage;
