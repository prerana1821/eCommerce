import { useUser } from "../User";
import {
  addToCartApi,
  incrementQuantityFromCartApi,
  deleteFromWishListApi,
} from "../api-calls";
import "./WishList.css";
import { found } from "../utils";
import { Link } from "react-router-dom";
import { findUserById } from "../utils";
import { useAuth } from "../Auth";

export const WishList = () => {
  const { userState, userDispatch } = useUser();
  const { user } = useAuth();
  const currentUser = findUserById(userState, user.id);

  return (
    <div className='products products-wishlist'>
      {currentUser?.wishList.length === 0 && (
        <div className='card cart-empty-card'>
          <h3>Your Wish List is Empty</h3>
          <hr className='hr' />
          <p className='mg-1'>There are no items in your wishlist.</p>
          <Link to='/products'>
            <button className='btn primary btn-shop'>Shop Now</button>
          </Link>
        </div>
      )}
      {currentUser?.wishList.map((product) => {
        return (
          <div className='card wishList-card' key={product.id}>
            <img className='card-img' src={product.image} alt='' />
            <button
              onClick={() =>
                deleteFromWishListApi(currentUser, product, userDispatch)
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
                deleteFromWishListApi(currentUser, product, userDispatch);
                return found(currentUser?.cart, product.id)
                  ? incrementQuantityFromCartApi(
                      currentUser,
                      product,
                      userDispatch
                    )
                  : addToCartApi(currentUser, product, userDispatch);
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
