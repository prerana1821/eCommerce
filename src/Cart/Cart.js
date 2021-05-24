import { useUser } from "../User";
import {
  deleteItemFromCartApi,
  incrementQuantityFromCartApi,
  decrementQuantityFromCartApi,
} from "../api-calls";
import "./Cart.css";
import { Link } from "react-router-dom";
import { CheckoutCard } from "./CheckoutCard";

export const Cart = () => {
  const { userState, userDispatch } = useUser();

  return (
    <div className='products products-cart'>
      {userState?.cart.length === 0 ? (
        <div className='card cart-empty-card'>
          <h3>Your Cart is Empty</h3>
          <hr className='hr' />
          <p className='mg-1'>There are no items in your cart.</p>
          <Link to='/products'>
            <button className='btn primary btn-shop'>Shop Now</button>
          </Link>
        </div>
      ) : (
        <div className='products products-cart'>
          <div>
            {userState?.cart.map((product) => {
              return (
                <div className='card-horizontal' key={product._id}>
                  <img
                    className='card-horizontal-img'
                    src={product.image}
                    alt=''
                  />
                  <button
                    onClick={() =>
                      deleteItemFromCartApi(userState, product, userDispatch)
                    }
                    className='floating-act badge-close tertiary'
                  >
                    <i className='fas fa-lg fa-times'></i>
                  </button>
                  <div className='card-info'>
                    <h3>{product.name}</h3>
                    <small>{product.color}</small>
                    <div className='card-details-horizontal'>
                      <div className='card-quant'>
                        <button
                          onClick={() =>
                            incrementQuantityFromCartApi(
                              userState,
                              product,
                              userDispatch
                            )
                          }
                          className='floating-act badge-close tertiary'
                        >
                          <i className='fas fa-lg fa-plus'></i>
                        </button>
                        <p>{product.quantity}</p>
                        <button
                          onClick={() =>
                            decrementQuantityFromCartApi(
                              userState,
                              product,
                              userDispatch
                            )
                          }
                          className='floating-act badge-close tertiary'
                        >
                          <i className='fas fa-minus'></i>
                        </button>
                      </div>
                      <p>Rs. {product.price}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <CheckoutCard />
        </div>
      )}
    </div>
  );
};
