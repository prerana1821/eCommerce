import { useCart } from "../Cart";
import "./Toast.css";

export const Toast = () => {
  const { cartState } = useCart();
  return (
    <>
      <div className='toast tl-error status'>
        <div className='tl-content-error'>
          <i className='fas fa-check-circle'></i>
          <p>{cartState.loading}</p>
        </div>
      </div>
    </>
  );
};
