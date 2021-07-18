import { useEffect, useState } from "react";
import { useAuth } from "../Auth";
import { useData } from "../Products";
import { useUser } from "../User";
import "./Toast.css";

export const Toast = ({
  userStateLoading,
  statusError,
  statusSuccess,
  productStatusError,
}) => {
  const { userDispatch } = useUser();
  const { setStatus } = useAuth();
  const { dispatch } = useData();
  const [toastVisibility, setToastVisibility] = useState(true);

  useEffect(() => {
    const toastVisible = setTimeout(() => {
      setToastVisibility(false);
      userDispatch({ type: "STATUS", payload: "" });
      dispatch({ type: "STATUS", payload: { error: "" } });
      setStatus({ loading: "", success: "", error: "" });
    }, 2000);
    return () => {
      clearTimeout(toastVisible);
    };
  }, [userStateLoading, statusSuccess, statusError, productStatusError]);

  return (
    <>
      {toastVisibility && (
        <div className='toast tl-error status'>
          <div className='tl-content-error'>
            <i className='fas fa-check-circle'></i>
            <p>
              {userStateLoading ||
                statusError ||
                statusSuccess ||
                productStatusError}
            </p>
          </div>
        </div>
      )}
    </>
  );
};
