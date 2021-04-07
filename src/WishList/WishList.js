import { useCart } from "../Cart";
import {
  addToCartApi,
  incrementQuantityFromCartApi,
  deleteFromWishListApi,
} from "../api-calls";
import "./WishList.css";

const found = (array, id) => {
  return !!array.find((item) => item.id === id);
};

export const WishList = () => {
  const { cartState, cartDispatch } = useCart();

  // const addToCartApi = async (product, dispatch) => {
  //   try {
  //     dispatch({ type: "STATUS", payload: "Item Adding to Cart...." });
  //     const response = await axios.post("api/cartItems", {
  //       cartItem: product,
  //     });
  //     if (response.status === 201) {
  //       dispatch({ type: "ADD_TO_CART", payload: product });
  //     }
  //   } catch (error) {
  //     dispatch({ type: "STATUS", payload: "Couldn't add item to cart.." });
  //   } finally {
  //     dispatch({ type: "STATUS", payload: "" });
  //   }
  // };

  // const deleteFromWishListApi = async (product, dispatch) => {
  //   try {
  //     dispatch({
  //       type: "STATUS",
  //       payload: "Removing Item from Wishlist....",
  //     });
  //     const response = await axios.delete(`api/wishListItems/${product.id}`);
  //     if (response.status === 204) {
  //       dispatch({ type: "REMOVE_FROM_WISHLIST", payload: product });
  //     }
  //   } catch (error) {
  //     dispatch({
  //       type: "STATUS",
  //       payload: "Couldn't remove item to Wishlist..",
  //     });
  //   } finally {
  //     dispatch({ type: "STATUS", payload: "" });
  //   }
  // };

  // const incrementQuantityFromCartApi = async (product, dispatch) => {
  //   try {
  //     dispatch({
  //       type: "STATUS",
  //       payload: "Increasing Quantity..",
  //     });
  //     const response = await axios.put(`api/cartItems/${product.id}`, {
  //       cartItem: { ...product, quantity: product.quantity + 1 },
  //     });
  //     if (response.status === 200) {
  //       dispatch({ type: "INCREMENT_QUANTITY", payload: product });
  //     }
  //   } catch (error) {
  //     dispatch({
  //       type: "STATUS",
  //       payload: "Couldn't increase quantity in the cart..",
  //     });
  //   } finally {
  //     dispatch({ type: "STATUS", payload: "" });
  //   }
  // };

  return (
    <div className='products'>
      <h3 className='info-txt'>
        {cartState.wishList.length === 0 &&
          "No products were added to the wishlist! (＞﹏＜)"}
      </h3>
      {cartState.wishList.map((product) => {
        return (
          <div className='card wishList-card' key={product.id}>
            <img className='card-img' src={product.image} alt='' />
            <button
              onClick={
                () => deleteFromWishListApi(product, cartDispatch)
                // cartDispatch({
                //   type: "REMOVE_FROM_WISHLIST",
                //   payload: product,
                // })
              }
              className='floating-act badge-close tertiary'
            >
              <i className='fas fa-lg fa-times'></i>
            </button>
            <div className='bdge-sm pink'>NEW</div>
            <div className='card-info'>
              <h3>{product.name}</h3>
              <h4>{product.material}</h4>
              <div className='card-details'>
                <p>{product.price}</p>
              </div>
            </div>
            <button
              className='btn btn-primary primary btn-card'
              onClick={() => {
                deleteFromWishListApi(product, cartDispatch);
                return found(cartState.cart, product.id)
                  ? incrementQuantityFromCartApi(product, cartDispatch)
                  : addToCartApi(product, cartDispatch);
                // cartDispatch({
                //   type: "ADD_TO_CART_FROM_WISHLIST",
                //   payload: product,
                // })}
              }}
            >
              Move to Cart
            </button>
          </div>
        );
      })}
    </div>
  );
};
