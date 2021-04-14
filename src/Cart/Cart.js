import { useCart } from "../Cart";
import {
  deleteItemFromCartApi,
  incrementQuantityFromCartApi,
  decrementQuantityFromCartApi,
} from "../api-calls";

import "./Cart.css";
import { Link } from "react-router-dom";

export const Cart = () => {
  const { cartState, cartDispatch } = useCart();

  function totalPrice() {
    return cartState.cart.reduce((acc, value) => {
      return acc + value.quantity * value.price;
    }, 0);
  }

  const totalItemPrice = (item) => {
    return item.quantity * item.price;
  };

  return (
    <div className='products products-cart'>
      {cartState.cart.length === 0 ? (
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
            {cartState.cart.map((product) => {
              return (
                <div className='card-horizontal' key={product.id}>
                  <img
                    className='card-horizontal-img'
                    src={product.image}
                    alt=''
                  />
                  <button
                    onClick={() => deleteItemFromCartApi(product, cartDispatch)}
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
                            incrementQuantityFromCartApi(product, cartDispatch)
                          }
                          className='floating-act badge-close tertiary'
                        >
                          <i className='fas fa-lg fa-plus'></i>
                        </button>
                        <p>{product.quantity}</p>
                        <button
                          onClick={() =>
                            decrementQuantityFromCartApi(product, cartDispatch)
                          }
                          className='floating-act badge-close tertiary'
                        >
                          <i className='fas fa-minus'></i>
                        </button>
                      </div>
                      <p>{product.price}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div>
            <div className='card card-checkout'>
              <h2>Price Details - {cartState.cart.length} Items</h2>
              <div>
                <div className='item-price-details'>
                  <h4 className='center-txt'>Total Price:</h4>
                  <h4>{totalPrice()}</h4>
                </div>
                <div>
                  {cartState.cart.map((item) => {
                    return (
                      <div className='item-price-details'>
                        <p>
                          <span>
                            <bold>{item.quantity}</bold>
                          </span>
                          x <span>{item.name}</span>
                        </p>
                        <p>
                          <span>
                            <bold>₹ {totalItemPrice(item)}</bold>
                          </span>
                        </p>
                      </div>
                    );
                  })}
                </div>
                <div className='item-price-details'>
                  <p>Delivery Charges :</p>
                  <p> FREE</p>
                </div>
              </div>
              <hr className='hr' />
              <div className='checkout'>
                <div className='item-price-details'>
                  <h4 className='center-txt'>Total Amount: </h4>
                  <h4 className='center-txt'>
                    <bold> ₹ {totalPrice()} /-</bold>
                  </h4>
                </div>
                <button className='btn btn-checkout primary'>CHECKOUT</button>
                <div className='item-price-details'>
                  <small>Total price inc GST*</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
