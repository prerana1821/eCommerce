import { useUser } from "../User";
import {
  addToCartApi,
  incrementQuantityFromCartApi,
  deleteFromWishListApi,
} from "../api-calls";
import "./WishList.css";
import { found } from "../utils";
import { Link } from "react-router-dom";
// import { findUserById } from "../utils";
// import { useAuth } from "../Auth";

export const WishList = () => {
  const { userState, userDispatch } = useUser();
  // const { user } = useAuth();
  // const currentUser = findUserById(userState, user._id);

  return (
    <div className='products products-wishlist'>
      {userState?.wishList.length === 0 && (
        <div className='card cart-empty-card'>
          <h3>Your Wish List is Empty</h3>
          <hr className='hr' />
          <p className='mg-1'>There are no items in your wishlist.</p>
          <Link to='/products'>
            <button className='btn primary btn-shop'>Shop Now</button>
          </Link>
        </div>
      )}
      {userState?.wishList.map((product) => {
        return (
          <div className='card wishList-card' key={product._id}>
            <img className='card-img' src={product.image} alt='' />
            <button
              onClick={() =>
                deleteFromWishListApi(userState, product, userDispatch)
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
                deleteFromWishListApi(userState, product, userDispatch);
                return found(userState?.cart, product._id)
                  ? incrementQuantityFromCartApi(
                      userState,
                      product,
                      userDispatch
                    )
                  : addToCartApi(userState, product, userDispatch);
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
