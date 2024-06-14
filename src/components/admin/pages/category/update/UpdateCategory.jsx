import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as categoryService from "../../../../../services/CategoryService";
import Swal from "sweetalert2";

const UpdateCategory = () => {
  const { id } = useParams();

  const initState = {
    categoryName: "",
    categoryStatus: 1,
  };

  const initData = {
    categoryName: "",
    categoryStatus: 1,
  };

  const [apiData, setApiData] = useState(initData);
  const [postData, setPostData] = useState(initState);
  const navigate = useNavigate();

  const fetchApiData = async (id) => {
    const [result, error] = await categoryService.findById(id);
    if (result) {
      // console.log(result);
      setApiData(result.data);
    } else {
      console.log(error);
    }
  };

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newData = {
      categoryName: postData.categoryName
        ? postData.categoryName
        : apiData.categoryName,
      categoryStatus: postData.categoryStatus
        ? postData.categoryStatus
        : apiData.categoryStatus,
    };

    console.log(newData);

    const [result, error] = await categoryService.update(id, newData);
    console.log(result);
    if (result) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Add Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/admin/category");
    }
    if (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Add Failed",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(error);
    }
  };

  useEffect(() => {
    fetchApiData(id);
    // console.log(id);
    console.log(apiData);
  }, []);
  return (
    <div id="content-page" className="content-page">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="iq-card">
              <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-title">
                  <h4 className="card-title">Thêm danh mục</h4>
                </div>
              </div>
              <div className="iq-card-body">
                <form onSubmit={(e) => handleSubmit(e)}>
                  <div className="form-group">
                    <label>Tên danh mục:</label>
                    <input
                      type="text"
                      name="categoryName"
                      className="form-control"
                      placeholder="Nhập tên danh mục tại đây..."
                      defaultValue={apiData.categoryName}
                      onChange={(e) => handleChangeValue(e)}
                    />
                  </div>
                  <div className="form-group">
                    <label className="d-block">Giới tính:</label>
                    <div className="custom-control custom-radio custom-control-inline">
                      <input
                        type="radio"
                        id="status"
                        name="categoryStatus"
                        className="custom-control-input"
                        defaultChecked={
                          apiData.categoryStatus === 1 ? "checked" : ""
                        }
                        value={1}
                        onChange={(e) => handleChangeValue(e)}
                      />
                      <label className="custom-control-label" htmlFor="status">
                        Hiện
                      </label>
                    </div>
                    <div className="custom-control custom-radio custom-control-inline">
                      <input
                        type="radio"
                        id="status2"
                        name="categoryStatus"
                        className="custom-control-input"
                        defaultChecked={
                          apiData.categoryStatus === 0 ? "checked" : ""
                        }
                        value={0}
                        onChange={(e) => handleChangeValue(e)}
                      />
                      <label className="custom-control-label" htmlFor="status2">
                        Ẩn
                      </label>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Gửi
                  </button>
                  <Link to={"/admin/category"} className="btn btn-danger ml-2">
                    Trở lại
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateCategory;
