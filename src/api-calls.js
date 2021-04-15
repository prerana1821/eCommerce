import axios from "axios";

export const addToCartApi = async (product, dispatch) => {
  try {
    dispatch({ type: "STATUS", payload: "Item Adding to Cart...." });
    const response = await axios.post("api/cartItems", {
      cartItem: product,
    });
    if (response.status === 201) {
      dispatch({ type: "ADD_TO_CART", payload: product });
    }
  } catch (error) {
    dispatch({ type: "STATUS", payload: "Couldn't add item to cart.." });
  } finally {
    dispatch({ type: "STATUS", payload: "" });
  }
};

export const deleteItemFromCartApi = async (product, dispatch) => {
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

export const incrementQuantityFromCartApi = async (product, dispatch) => {
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

export const decrementQuantityFromCartApi = async (product, dispatch) => {
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

export const addToWishListApi = async (product, dispatch) => {
  try {
    dispatch({ type: "STATUS", payload: "Item Adding to Wishlist...." });
    const response = await axios.post("api/wishListItems", {
      wishListItem: product,
    });
    if (response.status === 201) {
      dispatch({ type: "ADD_TO_WISHLIST", payload: product });
    }
  } catch (error) {
    dispatch({ type: "STATUS", payload: "Couldn't add item to Wishlist.." });
  } finally {
    dispatch({ type: "STATUS", payload: "" });
  }
};

export const deleteFromWishListApi = async (product, dispatch) => {
  try {
    dispatch({ type: "STATUS", payload: "Removing Item from Wishlist...." });
    const response = await axios.delete(`api/wishListItems/${product.id}`);
    if (response.status === 204) {
      dispatch({ type: "REMOVE_FROM_WISHLIST", payload: product });
    }
  } catch (error) {
    dispatch({
      type: "STATUS",
      payload: "Couldn't remove item to Wishlist..",
    });
  } finally {
    dispatch({ type: "STATUS", payload: "" });
  }
};
