import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as categoryService from "../../../../../services/CategoryService";
import Swal from "sweetalert2";

const ListCategory = () => {
  const [apiData, setApiData] = useState([]);
  const [deleteState, setDeleteState] = useState(false);
  const [keyword, setKeyword] = useState("");

  //pagination
  const fetchApiData = async () => {
    const [res, err] = await categoryService.findAll();
    if (res) {
      console.log(res.data)
      setApiData(res.data);
    } else {
      console.log(err);
    }
  };


  const handleChangeValue = async (e) => {
    setKeyword(e.target.value);
  };

  const handleDelete = async (id) => {
    // console.log(id);
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
      const [res, err] = await categoryService.remove(id);
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
                  <h4 className="card-title">Danh sách danh mục</h4>
                </div>

                <div className="iq-card-header-toolbar d-flex align-items-center">
                  <Link to={"/admin/category/add"} className="btn btn-primary">
                    Thêm danh mục mới
                  </Link>
                </div>
              </div>

              <div className="iq-card-body">
                <div className="col-lg-4 p-0">
                  <form className="d-flex">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search in Category.."
                      name="keywords"
                      onChange={(e) => handleChangeValue(e)}
                    />
                  </form>
                </div>
                <div className="table-responsive">
                  <table
                    className="data-tables table table-striped table-bordered"
                    style={{ width: "100%" }}
                  >
                    <thead>
                      <tr>
                        <th>STT</th>
                        <th>Tên danh mục</th>
                        <th>Trạng thái</th>
                        <th>Hoạt động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {apiData &&
                        apiData.map((item) => {
                            return (
                              <tr key={item.categoryId}>
                                <td>{item.categoryId}</td>
                                <td>{item.name}</td>
                                <td>
                                  {item.isActive ? "Hiện" : "Ẩn"}
                                </td>
                                <td>
                                  <div className="flex align-items-center list-user-action">
                                    <Link
                                      to={`/admin/category/update/${item.categoryId}`}
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
                                        handleDelete(item.categoryId)
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListCategory;
