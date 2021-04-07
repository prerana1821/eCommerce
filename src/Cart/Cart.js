import { useCart } from "../Cart";
import axios from "axios";
import "./Cart.css";

export const Cart = ({ changeRoute }) => {
  const { cartState, cartDispatch } = useCart();

  function totalPrice() {
    return cartState.cart.reduce((acc, value) => {
      return acc + value.quantity * value.price;
    }, 0);
  }

  const deleteItemFromCartApi = async (product, dispatch) => {
    try {
      dispatch({
        type: "STATUS",
        payload: "Removing Item from Cart....",
      });
      const response = await axios.delete(`api/cartItems/${product.id}`);
      if (response.status === 204) {
        dispatch({ type: "REMOVE_FROM_CART", payload: product });
      }
    } catch (error) {
      dispatch({
        type: "STATUS",
        payload: "Couldn't remove item to cart..",
      });
    } finally {
      dispatch({ type: "STATUS", payload: "" });
    }
  };

  const incrementQuantityFromCartApi = async (product, dispatch) => {
    try {
      dispatch({
        type: "STATUS",
        payload: "Increasing Quantity..",
      });
      const response = await axios.put(`api/cartItems/${product.id}`, {
        cartItem: { ...product, quantity: product.quantity + 1 },
      });
      if (response.status === 200) {
        dispatch({ type: "INCREMENT_QUANTITY", payload: product });
      }
    } catch (error) {
      dispatch({
        type: "STATUS",
        payload: "Couldn't increase quantity in the cart..",
      });
    } finally {
      dispatch({ type: "STATUS", payload: "" });
    }
  };

  const decrementQuantityFromCartApi = async (product, dispatch) => {
    try {
      dispatch({
        type: "STATUS",
        payload: "Increasing Quantity..",
      });
      const response = await axios.put(`api/cartItems/${product.id}`, {
        cartItem: { ...product, quantity: product.quantity - 1 },
      });
      if (response.status === 200) {
        dispatch({ type: "DECREMENT_QUANTITY", payload: product });
      }
    } catch (error) {
      dispatch({
        type: "STATUS",
        payload: "Couldn't increase quantity in the cart..",
      });
    } finally {
      dispatch({ type: "STATUS", payload: "" });
    }
  };

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
          <button
            onClick={() => changeRoute("products")}
            className='btn primary btn-shop'
          >
            Shop Now
          </button>
        </div>
      ) : (
        <div>
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
                    onClick={
                      () => deleteItemFromCartApi(product, cartDispatch)
                      // cartDispatch({
                      //   type: "REMOVE_FROM_CART",
                      //   payload: product,
                      // })
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
                          onClick={
                            () =>
                              incrementQuantityFromCartApi(
                                product,
                                cartDispatch
                              )
                            // cartDispatch({
                            //   type: "INCREMENT_QUANTITY",
                            //   payload: product,
                            // })
                          }
                          className='floating-act badge-close tertiary'
                        >
                          <i className='fas fa-lg fa-plus'></i>
                        </button>
                        <p>{product.quantity}</p>
                        <button
                          onClick={
                            () =>
                              decrementQuantityFromCartApi(
                                product,
                                cartDispatch
                              )
                            // cartDispatch({
                            //   type: "DECREMENT_QUANTITY",
                            //   payload: product,
                            // })
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
                  <h4>₹ {totalPrice()}</h4>
                </div>
                <div>
                  {cartState.cart.map((item) => {
                    return (
                      <div className='item-price-details'>
                        <p>
                          <span>{item.quantity}</span> x{" "}
                          <span>{item.name}</span>
                        </p>
                        <p>
                          <span>₹ {totalItemPrice(item)}</span>
                        </p>
                      </div>
                    );
                  })}
                </div>
                <div className='item-price-details'>
                  <p>Delivery Charges :</p>
                  <p> Free</p>
                </div>
              </div>
              <hr className='hr' />
              <div className='checkout'>
                <div className='item-price-details'>
                  <h4 className='center-txt'>Total Amount: </h4>
                  <h4 className='center-txt'> ₹ {totalPrice()}/-</h4>
                </div>
                <button className='btn btn-checkout primary'>CHECKOUT</button>
                <div className='item-price-details'>
                  <small>Total price incl GST*</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
