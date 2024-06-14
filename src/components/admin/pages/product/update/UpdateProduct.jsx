import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as productService from "../../../../../services/ProductService";
import * as categoryService from "../../../../../services/CategoryService";
import Swal from "sweetalert2";

const UpdateProduct = () => {
  const { id } = useParams();
  const initData = {
    productName: "",
    productImage: "",
    productPrice: "",
    productSalePrice: "",
    productCategoryId: "",
    productStatus: "",
    productDescription: "",
  };

  const initProductData = {
    productName: "",
    productImage: "",
    productPrice: "",
    productSalePrice: "",
    productCategoryId: "",
    productStatus: "",
    productDescription: "",
  };

  const [apiData, setApiData] = useState(initProductData);
  const [postData, setPostData] = useState(initData);
  const [categories, setCategories] = useState([]);
  const [imgPreview, setImgPreview] = useState();
  const navigate = useNavigate();

  const fetchApiData = async () => {
    const [res, err] = await categoryService.findAll();
    if (res) {
      // console.log(res.data);
      setCategories(res.data);
    } else {
      console.log(err);
    }
  };

  const handleChangeValue = async (e) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };

  const handleChangeFile = async (e) => {
    setImgPreview(e.target.files[0]);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    const [result, error] = await productService.upload(formData);
    if (result) {
      setPostData({ ...postData, productImage: result.data });
    } else {
      console.log(error);
    }
  };

  const fetchProductById = async (id) => {
    const [result, error] = await productService.findById(id);
    if (result) {
      console.log(result.data);
      setApiData(result.data[0]);
    }
    if (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      productName: postData.productName
        ? postData.productName
        : apiData.productName,
      productImage: postData.productImage
        ? postData.productImage
        : apiData.productImage,
      productPrice: postData.productPrice
        ? postData.productPrice
        : apiData.productPrice,
      productSalePrice: postData.productSalePrice
        ? postData.productSalePrice
        : apiData.productSalePrice,
      productCategoryId: postData.productCategoryId
        ? postData.productCategoryId
        : apiData.productCategoryId,
      productStatus: postData.productStatus
        ? postData.productStatus
        : apiData.productStatus,
      productDescription: postData.productDescription
        ? postData.productDescription
        : apiData.productDescription,
    };
    console.log(data);

    const [result, error] = await productService.update(id, data);
    if (result) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Add Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/admin/product");
    } else {
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
    fetchApiData();
    fetchProductById(id);
  }, [id]);

  return (
    <div id="content-page" className="content-page">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12">
            <div className="iq-card">
              <div className="iq-card-header d-flex justify-content-between">
                <div className="iq-header-title">
                  <h4 className="card-title">Thêm mới sản phẩm</h4>
                </div>
              </div>
              <div className="iq-card-body">
                <form method="POST" onSubmit={(e) => handleSubmit(e)}>
                  <div className="form-group">
                    <label>Hình ảnh:</label>
                    <div className="custom-file">
                      <input
                        type="file"
                        className="custom-file-input"
                        name="productImage"
                        onChange={(e) => {
                          handleChangeFile(e);
                        }}
                        accept="image/png, image/jpeg"
                      />
                      <label className="custom-file-label">Choose file</label>
                    </div>
                  </div>
                  <div className="w-25">
                    {!imgPreview && (
                      <img
                        className="card-img"
                        alt="image"
                        src={apiData.productImage}
                      />
                    )}

                    {imgPreview && (
                      <img
                        className="card-img"
                        alt={imgPreview.name}
                        src={URL.createObjectURL(imgPreview)}
                      />
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="productName">Name</label>
                    <input
                      type="text"
                      name="productName"
                      className="form-control"
                      placeholder="Enter your name"
                      defaultValue={apiData.productName}
                      onChange={(e) => handleChangeValue(e)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                      type="text"
                      name="productPrice"
                      className="form-control"
                      placeholder="Enter your price"
                      defaultValue={apiData.productPrice}
                      onChange={(e) => handleChangeValue(e)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="productSalePrice">Sale Price</label>
                    <input
                      type="text"
                      name="productSalePrice"
                      className="form-control"
                      placeholder="Enter your sale price"
                      defaultValue={apiData.productSalePrice}
                      onChange={(e) => handleChangeValue(e)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="productCategoryId">Category</label>
                    <select
                      className="form-control"
                      name="productCategoryId"
                      onChange={(e) => handleChangeValue(e)}
                      id="exampleFormControlSelect1"
                    >
                      <option hidden>Danh mục sản phẩm</option>
                      {categories &&
                        categories.map((item) => {
                          return (
                            <option
                              value={item.categoryId}
                              key={item.categoryId}
                              selected={
                                item.categoryId === apiData.productCategoryId
                              }
                            >
                              {item.categoryName}
                            </option>
                          );
                        })}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Status</label>
                    <br />
                    <div className="form-check form-check-inline">
                      <label className="form-check-label">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="productStatus"
                          id="productStatus"
                          defaultValue={1}
                          defaultChecked={
                            apiData.productStatus === 1 ? "checked" : ""
                          }
                          onChange={(e) => handleChangeValue(e)}
                        />
                        Hiện
                      </label>
                      <label className="form-check-label ml-2">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="productStatus"
                          id="productStatus"
                          defaultChecked={
                            apiData.productStatus === 0 ? "checked" : ""
                          }
                          onChange={(e) => handleChangeValue(e)}
                        />
                        Ẩn
                      </label>
                      {console.log(apiData.productStatus)}
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="productDescription">
                      productDescription
                    </label>
                    <textarea
                      name="productDescription"
                      className="form-control"
                      id="productDescription"
                      placeholder="Enter your productDescription"
                      cols="20"
                      rows="5"
                      defaultValue={apiData.productDescription}
                      onChange={(e) => handleChangeValue(e)}
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
