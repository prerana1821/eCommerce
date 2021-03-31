import { useData } from "./DataProvider";
import { useCart } from "./CartProvider";

export const Products = ({ setRoute }) => {
  const { state } = useData();
  const { cartState, cartDispatch } = useCart();

  //   const isProdInCart = (item) => {
  //     return cartState.cart.map((prod) => {
  //       if (prod.id === item.id) {
  //         // setRoute("cart");
  //         return <p>Go to Cart</p>;
  //       } else {
  //         return <p>Add to Cart</p>;
  //       }
  //     });
  //   };

  //   const isProdInWishList = (item) => {
  //     return cartState.wishList.map((prod) => {
  //       if (prod.id === item.id) {
  //         return <i className='fas fa-lg fa-heart'></i>;
  //       } else {
  //         return <i className='far fa-lg fa-heart'></i>;
  //       }
  //     });
  //   };

  return (
    <div>
      {state.map((product) => {
        // isProdInCart(product);
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
                    cartDispatch({ type: "WISHLIST", payload: product })
                  }
                  className='floating-act secondary flt-tri'
                >
                  {/* {isProdInWishList(product)} */}
                  {/* {cartState.wishList.map((prod) => {
                    if (prod.id === product.id) {
                      return <i className='fas fa-lg fa-heart'></i>;
                    } else {
                      return <i className='far fa-lg fa-heart'></i>;
                    }
                  })} */}
                  {/* {cartState.wishList ? (
                    <i class='fas fa-lg fa-heart'></i>
                  ) : ( */}
                  <i className='far fa-lg fa-heart'></i>
                  {/*)} */}
                </button>
              </div>
            </div>
            <button
              className='btn btn-primary primary btn-card'
              onClick={() =>
                cartDispatch({ type: "ADD_TO_CART", payload: product })
              }
            >
              <p>Add to Cart</p>
              {/* {isProdInCart(product)} */}
            </button>
          </div>
        );
      })}
    </div>
  );
};
