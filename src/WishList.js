import { useData } from "./DataProvider";

export const WishList = () => {
  const { state, dispatch } = useData();
  return (
    <div>
      {state.map((product) => {
        return (
          product.wishlist && (
            <div className='card' key={product.id}>
              <img className='card-img' src={product.image} alt='' />
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
                  dispatch({ type: "ADD_TO_CART", payload: product })
                }
              >
                Move to Cart
              </button>
            </div>
          )
        );
      })}
    </div>
  );
};
