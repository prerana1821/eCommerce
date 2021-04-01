import { useCart } from "./CartProvider";

export const WishList = () => {
  const { cartState, cartDispatch } = useCart();
  return (
    <div className='products'>
      {cartState.wishList.map((product) => {
        return (
          <div className='card' key={product.id}>
            <img className='card-img' src={product.image} alt='' />
            <button
              onClick={() =>
                cartDispatch({
                  type: "REMOVE_FROM_WISHLIST",
                  payload: product,
                })
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
              onClick={() =>
                cartDispatch({
                  type: "ADD_TO_CART_FROM_WISHLIST",
                  payload: product,
                })
              }
            >
              Move to Cart
            </button>
          </div>
        );
      })}
    </div>
  );
};
