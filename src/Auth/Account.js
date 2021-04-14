import { useAuth } from "./AuthProvider";
export const Account = () => {
  const { logout } = useAuth();

  return (
    <div>
      <h2>Account</h2>
      <button className='btn btn-main' onClick={() => logout()}>
        Logout
      </button>
    </div>
  );
};
