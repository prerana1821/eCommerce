import { useAuth } from "./AuthProvider";
import "./Account.css";

export const Account = () => {
  const { user, logout } = useAuth();

  console.log({ user });

  return (
    <div className='account'>
      <h2>Hello {user.username}</h2>
      <p>{user.email}</p>
      <button className='btn btn-main' onClick={() => logout()}>
        Logout
      </button>
    </div>
  );
};
