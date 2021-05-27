import axios from "axios";

export const addToCartApi = async (currentUser, product, dispatch) => {
  try {
    dispatch({ type: "STATUS", payload: "Item Adding to Cart...." });
    const response = await axios.post(
      `https://api-prestore.prerananawar1.repl.co/user-details/cart/${currentUser._id}`,
      {
        id: product._id,
      }
    );
    if (response.status === 201) {
      dispatch({ type: "ADD_TO_CART", payload: product });
    }
  } catch (error) {
    dispatch({ type: "STATUS", payload: "Couldn't add item to cart.." });
  }
};

export const deleteItemFromCartApi = async (currentUser, product, dispatch) => {
  try {
    dispatch({
      type: "STATUS",
      payload: "Removing Item from Cart....",
    });
    const response = await axios.delete(
      `https://api-prestore.prerananawar1.repl.co/user-details/cart/${currentUser._id}/${product._id}`
    );
    if (response.status === 200) {
      dispatch({ type: "REMOVE_FROM_CART", payload: product });
    }
  } catch (error) {
    dispatch({
      type: "STATUS",
      payload: "Couldn't remove item to cart..",
    });
  }
};

export const incrementQuantityFromCartApi = async (
  currentUser,
  product,
  dispatch
) => {
  try {
    dispatch({
      type: "STATUS",
      payload: "Increasing Quantity..",
    });
    const response = await axios.post(
      `https://api-prestore.prerananawar1.repl.co/user-details/cart/${currentUser._id}/${product._id}`,
      {
        ...product,
        quantity: product.quantity + 1,
      }
    );
    if (response.status === 200) {
      dispatch({ type: "INCREMENT_QUANTITY", payload: product });
    }
  } catch (error) {
    dispatch({
      type: "STATUS",
      payload: "Couldn't increase quantity in the cart..",
    });
  }
};

export const decrementQuantityFromCartApi = async (
  currentUser,
  product,
  dispatch
) => {
  try {
    dispatch({
      type: "STATUS",
      payload: "Increasing Quantity..",
    });
    const response = await axios.post(
      `https://api-prestore.prerananawar1.repl.co/user-details/cart/${currentUser._id}/${product._id}`,
      {
        ...product,
        quantity: product.quantity - 1,
      }
    );
    if (response.status === 200) {
      dispatch({ type: "DECREMENT_QUANTITY", payload: product });
    }
  } catch (error) {
    dispatch({
      type: "STATUS",
      payload: "Couldn't increase quantity in the cart..",
    });
  }
};

export const addToWishListApi = async (currentUser, product, dispatch) => {
  try {
    dispatch({ type: "STATUS", payload: "Item Adding to Wishlist...." });
    const response = await axios.post(
      `https://api-prestore.prerananawar1.repl.co/user-details/wishlist/${currentUser._id}`,
      {
        id: product._id,
      }
    );
    if (response.status === 201) {
      dispatch({ type: "ADD_TO_WISHLIST", payload: product });
    }
  } catch (error) {
    dispatch({ type: "STATUS", payload: "Couldn't add item to Wishlist.." });
  }
};

export const deleteFromWishListApi = async (currentUser, product, dispatch) => {
  try {
    dispatch({ type: "STATUS", payload: "Removing Item from Wishlist...." });
    const response = await axios.delete(
      `https://api-prestore.prerananawar1.repl.co/user-details/wishlist/${currentUser._id}/${product._id}`
    );
    if (response.status === 200) {
      dispatch({ type: "REMOVE_FROM_WISHLIST", payload: product });
    }
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: "STATUS",
      payload: "Couldn't remove item to Wishlist..",
    });
  }
};
