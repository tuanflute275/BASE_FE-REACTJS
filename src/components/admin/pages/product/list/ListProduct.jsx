import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as productService from "../../../../../services/ProductService";
import Swal from "sweetalert2";

const ListProduct = () => {
  const [apiData, setApiData] = useState([]);
  const [deleteState, setDeleteState] = useState(false);
  const [keyword, setKeyword] = useState("");

  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = apiData.slice(firstIndex, lastIndex);
  const npage = Math.ceil(apiData.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  const fetchApiData = async () => {
    const [res, err] = await productService.findAll();
    if (res) {
      // console.log(res);
      setApiData(res.data);
    } else {
      console.log(err);
    }
  };

  const prePage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const changePage = (page) => {
    setCurrentPage(page);
  };

  const nextPage = () => {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const btnScroll = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleChangeValue = async (e) => {
    setKeyword(e.target.value);
  };

  const handleDelete = async (id) => {
    console.log(id);
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const [res, err] = await productService.remove(id);
      if (res) {
        setDeleteState(!deleteState);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Deleted",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      if (err) {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Delete failed",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  useEffect(() => {
    fetchApiData();
  }, [deleteState]);

  return (
    <div id="content-page" className="content-page">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="iq-card">
              <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-title">
                  <h4 className="card-title">Danh sách sản phẩm</h4>
                </div>
                <div className="iq-card-header-toolbar d-flex align-items-center">
                  <Link to={"/admin/product/add"} className="btn btn-primary">
                    Thêm mới
                  </Link>
                </div>
              </div>
              <div className="iq-card-body">
                <div className="col-lg-4 p-0">
                  <form className="d-flex">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search in Product.."
                      name="keywords"
                      onChange={(e) => handleChangeValue(e)}
                    />
                  </form>
                </div>
                <div className="table-responsive">
                  <table className="data-tables table table-striped table-bordered">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Sale Price</th>
                        <th>Category</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {apiData &&
                        records
                          .filter((item) => {
                            return keyword.toLocaleLowerCase() === ""
                              ? item
                              : item.productName
                                  .toLowerCase()
                                  .includes(keyword);
                          })
                          .map((item) => {
                            return (
                              <tr key={item.productId}>
                                <td>{item.productId}</td>
                                <td>
                                  <img
                                    style={{ width: "100px" }}
                                    src={item.productImage}
                                    alt={item.productName}
                                    className="card-img"
                                  />
                                </td>
                                <td>{item.productName}</td>
                                <td>{item.productPrice}</td>
                                <td>{item.productSalePrice}</td>
                                <td>{item.productCategoryName}</td>
                                <td>
                                  {item.productStatus === 1 ? "Hiện" : "Ẩn"}
                                </td>
                                <td>
                                  <div className="flex align-items-center list-user-action">
                                    <Link
                                      to={`/admin/product/update/${item.productId}`}
                                      className="bg-primary"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title="Sửa"
                                    >
                                      <i className="ri-pencil-line"></i>
                                    </Link>
                                    <button
                                      className="bg-primary"
                                      data-toggle="tooltip"
                                      data-placement="top"
                                      title=""
                                      data-original-title="Xoá"
                                      onClick={() =>
                                        handleDelete(item.productId)
                                      }
                                      style={{
                                        fontSize: "16px",
                                        width: "25px",
                                        height: "25px",
                                        textAlign: "center",
                                        lineHeight: "20px",
                                        margin: "0px 3px",
                                        borderRadius: "5px",
                                        display: "inline-block",
                                        border: "none",
                                        transition: "0.3s ease",
                                      }}
                                    >
                                      <i className="ri-delete-bin-line"></i>
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                    </tbody>
                  </table>
                  <nav aria-label="...">
                    <ul className="pagination">
                      <li
                        className={`page-item ${
                          currentPage === 1 ? "disabled" : ""
                        }`}
                      >
                        <a className="page-link" href="#" onClick={prePage}>
                          Previous
                        </a>
                      </li>
                      {numbers.map((n, i) => (
                        <li
                          className={`page-item ${
                            currentPage === n ? "active" : ""
                          }`}
                          key={i}
                        >
                          <a
                            className="page-link"
                            href="#"
                            onClick={() => changePage(n)}
                          >
                            {n}
                          </a>
                        </li>
                      ))}
                      <li
                        className={`page-item ${
                          currentPage === npage ? "disabled" : ""
                        }`}
                      >
                        <a className="page-link" href="#" onClick={nextPage}>
                          Next
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListProduct;
