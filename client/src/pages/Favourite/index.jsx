import { useEffect, useState } from "react";
import "./favourite.css";
import http from "../../api/http";
import { toast } from "react-toastify";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";

const FavouritePage = () => {
  const navigate = useNavigate();
  const [prompts, setPrompts] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await http.get("/category");
        if (response.status === 200) {
          setCategories(response.data.metadata);
        } else {
          toast.error(response.data.message || "Lỗi khi lấy dữ liệu");
        }
      } catch (error) {
        toast.error(error.response.data.message || "Lỗi khi lấy dữ liệu");
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchPrompts = async () => {
      try {
        const response = await http.get("/package/favorites", {
          params: {
            categoryId: categoryId,
          },
        });
        if (response.status === 200) {
          setPrompts(response.data.metadata.packages);
        } else {
          toast.error(response.data.message || "Lỗi khi lấy dữ liệu");
        }
      } catch (error) {
        toast.error(error.response.data.message || "Lỗi khi lấy dữ liệu");
      }
    };

    fetchPrompts();
  }, [categoryId]);

  return (
    <section
      className="favourite-section"
      style={{ width: "calc(100% - 250px)" }}
    >
      <div className="container-fluid">
        <main className="dashboard__main">
          <span className="name">Bộ lọc</span>
          <div className="filter-buttons">
            <div
              className="group-filter-buttons"
              onClick={() => setCategoryId("")}
            >
              <img
                src="/img/select.svg"
                style={{ width: "28.8px", height: "28.8px" }}
              />
              <label
                className="filter-option"
                style={{
                  color: categoryId === "" ? "#0084ff" : "#00e0ff",
                  borderColor: categoryId === "" ? "#0084ff" : "#00e0ff",
                }}
              >
                <span>Tất cả</span>
              </label>
            </div>
            {categories.map((category) => (
              <div
                className="group-filter-buttons"
                key={category._id}
                onClick={() => setCategoryId(category._id)}
              >
                <img
                  src="/img/select.svg"
                  style={{
                    width: "28.8px",
                    height: "28.8px",
                  }}
                />
                <label
                  className="filter-option"
                  style={{
                    color: categoryId === category._id ? "#0084ff" : "#00e0ff",
                    borderColor:
                      categoryId === category._id ? "#0084ff" : "#00e0ff",
                  }}
                >
                  <span>{category.name}</span>
                </label>
              </div>
            ))}
          </div>
          {prompts.length > 0 ? (
            <>
              <div className="mt-4">
                <Swiper
                  slidesPerView={3}
                  spaceBetween={50}
                  pagination={{
                    clickable: true,
                  }}
                  modules={[Pagination]}
                >
                  {prompts.map((prompt, index) => (
                    <SwiperSlide
                      key={index}
                      onClick={() => navigate(`/package/${prompt._id}`)}
                    >
                      <div
                        style={{
                          position: "relative",
                          aspectRatio: "3/4",
                        }}
                      >
                        <img
                          src={prompt.thumbnail.url}
                          alt="Prompt 1"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                      <div className="image-caption">
                        <img
                          src={prompt.user.avatar || "/img/avatar-default.svg"}
                          alt="Avatar"
                          className="avatar"
                          style={{
                            width: "35px",
                            height: "35px",
                            borderRadius: "50%",
                            padding: 0,
                            backgroundColor: "#fff",
                          }}
                        />
                        <span className="username">{prompt.user.fullName}</span>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              <div className="carousel-controls text-center mt-3">
                <button className="btn me-2">Thêm yêu thích</button>
                <button className="btn me-2">Xem chi tiết</button>
                <button className="btn ">Tạo prompt mới</button>
              </div>
            </>
          ) : (
            <div className="label-no-data">Không có dữ liệu</div>
          )}
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

export default FavouritePage;
