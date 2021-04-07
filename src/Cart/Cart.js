import { useCart } from "../Cart";
import axios from "axios";
import "./Cart.css";

export const Cart = () => {
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

  return (
    <div className='products'>
      <h3>
        {cartState.cart.length === 0 && "No products were added to the cart"}
      </h3>
      {cartState.cart.map((product) => {
        return (
          <div className='card-horizontal' key={product.id}>
            <img className='card-horizontal-img' src={product.image} alt='' />
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
                      () => incrementQuantityFromCartApi(product, cartDispatch)
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
                      () => decrementQuantityFromCartApi(product, cartDispatch)
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
      <h3 className='center-txt'>Total Price: {totalPrice()}</h3>
    </div>
  );
};
