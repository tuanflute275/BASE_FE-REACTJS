import AdminMasterLayout from "../components/admin/layouts/AdminMasterLayout";
import AddCategory from "../components/admin/pages/category/add/AddCategory";
import ListCategory from "../components/admin/pages/category/list/ListCategory";
import UpdateCategory from "../components/admin/pages/category/update/UpdateCategory";
import AdminHome from "../components/admin/pages/home/AdminHome";
import AddProduct from "../components/admin/pages/product/add/AddProduct";
import ListProduct from "../components/admin/pages/product/list/ListProduct";
import UpdateProduct from "../components/admin/pages/product/update/UpdateProduct";
import Login from "../components/login/Login";
import UserMasterLayout from "../components/user/layouts/UserMasterLayout";
import Detail from "../components/user/pages/detail/Detail";
import Home from "../components/user/pages/home/Home";
import Shop from "../components/user/pages/shop/Shop";

export const adminRoutes = [
  {
    path: "/login",
    element: <Login />,
    protected: false
  },
  {
    path: "/admin",
    element: <AdminMasterLayout child={<AdminHome />} />,
    protected: true
  },
  {
    path: "admin/category",
    element: <AdminMasterLayout child={<ListCategory />} />,
    protected: true
  },
  {
    path: "admin/category/add",
    element: <AdminMasterLayout child={<AddCategory />} />,
    protected: true
  },
  {
    path: "admin/category/update/:id",
    element: <AdminMasterLayout child={<UpdateCategory />} />,
    protected: true
  },
  {
    path: "admin/product",
    element: <AdminMasterLayout child={<ListProduct />} />,
    protected: true
  },
  {
    path: "admin/product/add",
    element: <AdminMasterLayout child={<AddProduct />} />,
    protected: true
  },
  {
    path: "admin/product/update/:id",
    element: <AdminMasterLayout child={<UpdateProduct />} />,
    protected: true
  }
];

export const clientRoutes = [
  {
    path: "",
    element: <UserMasterLayout child={<Home />} />,
  },
  {
    path: "/",
    element: <UserMasterLayout child={<Home />} />,
  },
  {
    path: "/shop",
    element: <UserMasterLayout child={<Shop />} />,
  },
  {
    path: "/detail/:id",
    element: <UserMasterLayout child={<Detail />} />,
  },
];
