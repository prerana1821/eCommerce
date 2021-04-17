import { useUser } from "../User";
import "./Toast.css";

export const Toast = () => {
  const { userState } = useUser();
  return (
    <>
      <div className='toast tl-error status'>
        <div className='tl-content-error'>
          <i className='fas fa-check-circle'></i>
          <p>{userState.loading}</p>
        </div>
      </div>
    </>
  );
};
