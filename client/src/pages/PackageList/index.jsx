import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import http from "../../api/http";
import "./packageList.css";
import { toast } from "react-toastify";

const PackageList = () => {
  const [packages, setPackages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const [searchDebounce, setSearchDebounce] = useState("");
  const [pagination, setPagination] = useState({ page: 1, limit: 12 });
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const timeoutRef = useRef(null);
  const navigate = useNavigate();

  // Lấy danh sách category
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await http.get("/category");
        if (res.status === 200) {
          setCategories(res.data.metadata);
        }
      } catch (err) {}
    };
    fetchCategories();
  }, []);

  const fetchPackages = async () => {
    try {
      const res = await http.get("/package", {
        params: {
          page: pagination.page,
          limit: pagination.limit,
          search: searchDebounce,
          category: category || undefined,
        },
      });
      if (res.status === 200) {
        setPackages(res.data.metadata.packages);
        setTotalPages(res.data.metadata.pagination.totalPages);
        setTotal(res.data.metadata.pagination.total);
      }
    } catch (err) {
      toast.error(
        err.response.data.message || "Lỗi khi lấy danh sách gói dịch vụ"
      );
    }
  };

  useEffect(() => {
    fetchPackages();
    // eslint-disable-next-line
  }, [pagination, searchDebounce, category]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setSearchDebounce(value);
      setPagination((prev) => ({ ...prev, page: 1 }));
    }, 500);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setPagination((prev) => ({ ...prev, page: 1 }));
  };

  return (
    <section className="package-list-section py-5">
      <div className="container">
        <h2 className="mb-4 text-center text-uppercase text-white">
          Danh sách gói dịch vụ
        </h2>
        <div className="row mb-4 justify-content-center">
          <div className="col-md-4 mb-2 mb-md-0">
            <input
              type="text"
              className="form-control"
              placeholder="Tìm kiếm gói dịch vụ..."
              value={search}
              onChange={handleSearch}
            />
          </div>
          <div className="col-md-3">
            <select
              className="form-select"
              value={category}
              onChange={handleCategoryChange}
            >
              <option value="">Tất cả danh mục</option>
              {categories.map((cat) => (
                <option value={cat._id} key={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row g-4">
          {packages.length === 0 && (
            <div className="col-12 text-center text-muted">
              Không có gói dịch vụ nào.
            </div>
          )}
          {packages.map((pkg) => (
            <div className="col-md-4 col-lg-3" key={pkg._id}>
              <div className="package-card h-100 p-3 rounded shadow-sm bg-white d-flex flex-column">
                <div className="package-card-img mb-3 text-center">
                  <img
                    src={pkg.thumbnail?.url || "/img/component.png"}
                    alt={pkg.name}
                    className="img-fluid rounded"
                    style={{ maxHeight: 160, objectFit: "cover" }}
                  />
                </div>
                <h5 className="package-card-title mb-2 text-truncate">
                  {pkg.name}
                </h5>
                <div
                  className="package-card-desc mb-2 text-truncate"
                  title={pkg.description}
                >
                  {pkg.description}
                </div>
                <div className="package-card-price mb-2 fw-bold text-primary">
                  {pkg.price?.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </div>
                <button
                  className="btn btn-outline-primary mt-auto"
                  onClick={() => navigate(`/package/${pkg._id}`)}
                >
                  Xem chi tiết
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* Pagination */}
        {totalPages > 1 && (
          <nav className="mt-4 d-flex justify-content-center">
            <ul className="pagination">
              <li
                className={`page-item ${
                  pagination.page === 1 ? "disabled" : ""
                }`}
                onClick={() =>
                  pagination.page > 1 &&
                  setPagination({ ...pagination, page: pagination.page - 1 })
                }
              >
                <a className="page-link" href="#">
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
                  pagination.page === totalPages ? "disabled" : ""
                }`}
                onClick={() =>
                  pagination.page < totalPages &&
                  setPagination({ ...pagination, page: pagination.page + 1 })
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
    </section>
  );
};

export default PackageList;
