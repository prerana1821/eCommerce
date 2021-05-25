import { useAuth } from "../Auth";
import { useData } from "../Products";
import { useUser } from "../User";
import "./Toast.css";

export const Toast = () => {
  const { userState } = useUser();
  const { status } = useAuth();
  const { status: productStatus } = useData();

  return (
    <>
      <div className='toast tl-error status'>
        <div className='tl-content-error'>
          <i className='fas fa-check-circle'></i>
          <p>
            {userState?.loading ||
              status.error ||
              status.success ||
              productStatus.error}
          </p>
        </div>
      </div>
    </>
  );
};
