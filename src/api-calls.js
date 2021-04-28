import axios from "axios";

export const addToCartApi = async (currentUser, product, dispatch) => {
  console.log({ currentUser });
  console.log({ product });
  try {
    dispatch({ type: "STATUS", payload: "Item Adding to Cart...." });
    // const response = await axios.post("api/cartItems", {
    //   cartItem: product,
    // });
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
  } finally {
    dispatch({ type: "STATUS", payload: "" });
  }
};

export const deleteItemFromCartApi = async (currentUser, product, dispatch) => {
  console.log({ currentUser });
  console.log({ product });
  try {
    dispatch({
      type: "STATUS",
      payload: "Removing Item from Cart....",
    });
    // const response = await axios.delete(`api/cartItems/${product.id}`);
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
  } finally {
    dispatch({ type: "STATUS", payload: "" });
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
    // const response = await axios.put(`api/cartItems/${product.id}`, {
    //   cartItem: { ...product, quantity: product.quantity + 1 },
    // });
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
  } finally {
    dispatch({ type: "STATUS", payload: "" });
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
    // const response = await axios.put(`api/cartItems/${product.id}`, {
    //   cartItem: { ...product, quantity: product.quantity - 1 },
    // });
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
  } finally {
    dispatch({ type: "STATUS", payload: "" });
  }
};

export const addToWishListApi = async (currentUser, product, dispatch) => {
  try {
    dispatch({ type: "STATUS", payload: "Item Adding to Wishlist...." });
    // const response = await axios.post("api/wishListItems", {
    //   wishListItem: product,
    // });
    const response = await axios.post(
      `https://api-prestore.prerananawar1.repl.co/user-details/wishlist/${currentUser._id}`,
      {
        id: product._id,
      }
    );
    console.log(response);
    if (response.status === 201) {
      dispatch({ type: "ADD_TO_WISHLIST", payload: product });
    }
  } catch (error) {
    dispatch({ type: "STATUS", payload: "Couldn't add item to Wishlist.." });
  } finally {
    dispatch({ type: "STATUS", payload: "" });
  }
};

export const deleteFromWishListApi = async (currentUser, product, dispatch) => {
  try {
    dispatch({ type: "STATUS", payload: "Removing Item from Wishlist...." });
    const response = await axios.delete(
      `https://api-prestore.prerananawar1.repl.co/user-details/wishlist/${currentUser._id}/${product._id}`
    );
    // const response = await axios.delete(`api/wishListItems/${product.id}`);
    if (response.status === 200) {
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
