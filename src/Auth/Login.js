// import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../AuthProvider";

export const Login = () => {
  const { login, setLogin } = useAuth();
  //   const { state } = useLocation();
  //   const navigate = useNavigate();

  //   const loginHandler = () => {};

  return (
    <div>
      <h2>Login</h2>
      <button onClick={() => setLogin(!login)}>
        {login ? "Logout" : "Login"}
      </button>
    </div>
  );
};
