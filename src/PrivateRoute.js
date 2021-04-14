import { Navigate, Route } from "react-router";
import { useAuth } from "./AuthProvider";

export const PrivateRoute = ({ path, ...props }) => {
  const { login } = useAuth();
  return login ? (
    <Route {...props} path={path} />
  ) : (
    <Navigate replace state={{ from: path }} to='/login' />
  );
};
