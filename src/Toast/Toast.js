import { useUser } from "../User";
import "./Toast.css";
// import { useAuth } from "../Auth";
// import { findUserById } from "../utils";

export const Toast = () => {
  const { userState } = useUser();
  // const { user } = useAuth();
  // const currentUser = findUserById(userState, user._id);

  return (
    <>
      <div className='toast tl-error status'>
        <div className='tl-content-error'>
          <i className='fas fa-check-circle'></i>
          <p>{userState?.loading}</p>
        </div>
      </div>
    </>
  );
};
