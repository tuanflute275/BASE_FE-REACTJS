import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/login/Login";
import { adminRoutes, clientRoutes } from "./routes/Routes";
import { useSelector } from "react-redux";
import { selectUserData } from "./redux/reducers/user";

const ProtectedRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  const userData = useSelector(selectUserData);
  const isAuthenticated = userData?.id;
  return (
    <Routes>
      {adminRoutes.map((route, index) => {
        const element = route.protected ? (
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            {route.element}
          </ProtectedRoute>
        ) : (
          route.element
        );

        return <Route exact key={index} path={route.path} element={element} />;
      })}
        
      {clientRoutes.map((route, index) => {
        return (
          <Route exact key={index} path={route.path} element={route.element} />
        );
      })}
    </Routes>
  );
}

export default App;
