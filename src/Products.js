import { useData } from "./DataProvider";
import { useCart } from "./CartProvider";

export const Products = () => {
  const { state, dispatch } = useData();
  const { cartDispatch } = useCart();

  return (
    <div>
      {state.map((product) => {
        return (
          <div className='card' key={product.id}>
            <img className='card-img' src={product.image} alt={product.name} />
            <div className='bdge-sm pink'>NEW</div>
            <div className='card-info'>
              <h3>{product.name}</h3>
              <h4>{product.material}</h4>
              <div className='card-details'>
                <p>Price: {product.price}</p>
                <button
                  onClick={() =>
                    dispatch({ type: "ADD_TO_WISHLIST", payload: product })
                  }
                  className='floating-act secondary flt-tri'
                >
                  {product.wishList ? (
                    <i class='fas fa-lg fa-heart'></i>
                  ) : (
                    <i className='far fa-lg fa-heart'></i>
                  )}
                </button>
              </div>
            </div>
            <button
              className='btn btn-primary primary btn-card'
              onClick={() =>
                cartDispatch({ type: "ADD_TO_CART", payload: product })
              }
            >
              Add to Cart
            </button>
          </div>
        );
      })}
    </div>
  );
};
