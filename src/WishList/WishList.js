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

  return (
    <div className='products products-wishlist'>
      <h3 className='info-txt'>
        {cartState.wishList.length === 0 &&
          "No products were added to the wishlist! (＞﹏＜)"}
      </h3>
      {cartState.wishList.map((product) => {
        return (
          <div className='card wishList-card' key={product.id}>
            <img className='card-img' src={product.image} alt='' />
            <button
              onClick={() => deleteFromWishListApi(product, cartDispatch)}
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
