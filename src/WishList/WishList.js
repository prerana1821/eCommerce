import { useUser } from "../User";
import {
  addToCartApi,
  incrementQuantityFromCartApi,
  deleteFromWishListApi,
} from "../api-calls";
import "./WishList.css";
import { found } from "../utils";
import { EmptyProductsCard } from "./../EmptyProductsCard";

export const WishList = () => {
  const { userState, userDispatch } = useUser();

  return (
    <div className='products products-wishlist'>
      {userState?.wishList.length === 0 && (
        <EmptyProductsCard
          title='Your Wish List is Empty'
          body='There are no items in your wishlist.'
        />
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
                <p>Price: {product.price}</p>
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
