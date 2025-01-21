import AdminMasterLayout from "../components/admin/layouts/AdminMasterLayout";
import AddCategory from "../components/admin/pages/category/add/AddCategory";
import ListCategory from "../components/admin/pages/category/list/ListCategory";
import UpdateCategory from "../components/admin/pages/category/update/UpdateCategory";
import AdminHome from "../components/admin/pages/home/AdminHome";
import AddProduct from "../components/admin/pages/product/add/AddProduct";
import ListProduct from "../components/admin/pages/product/list/ListProduct";
import UpdateProduct from "../components/admin/pages/product/update/UpdateProduct";
import UserMasterLayout from "../components/user/layouts/UserMasterLayout";
import Detail from "../components/user/pages/detail/Detail";
import Home from "../components/user/pages/home/Home";
import Shop from "../components/user/pages/shop/Shop";

export const adminRoutes = [
  {
    path: "/admin",
    element: <AdminMasterLayout child={<AdminHome />} />,
  },
  {
    path: "admin/category",
    element: <AdminMasterLayout child={<ListCategory />} />,
  },
  {
    path: "admin/category/add",
    element: <AdminMasterLayout child={<AddCategory />} />,
  },
  {
    path: "admin/category/update/:id",
    element: <AdminMasterLayout child={<UpdateCategory />} />,
  },
  {
    path: "admin/product",
    element: <AdminMasterLayout child={<ListProduct />} />,
  },
  {
    path: "admin/product/add",
    element: <AdminMasterLayout child={<AddProduct />} />,
  },
  {
    path: "admin/product/update/:id",
    element: <AdminMasterLayout child={<UpdateProduct />} />,
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
