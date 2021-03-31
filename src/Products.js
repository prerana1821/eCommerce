import { useData } from "./DataProvider";
import { useCart } from "./CartProvider";

export const Products = ({ setRoute }) => {
  const { rangedData } = useData();
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
    <div className='products'>
      {rangedData.map((product) => {
        // isProdInCart(product);
        return (
          <div className='card' key={product.id}>
            <img className='card-img' src={product.image} alt={product.name} />
            <div className='bdge-sm pink'>NEW</div>
            <div className='card-info'>
              <h3>{product.name}</h3>
              <div className='card-info-details'>
                <h4>
                  {product.material} - {product.brand}
                </h4>
                <div className='badge-ratings'>
                  <p>{product.ratings}</p>
                  <i class='fa fa-star'></i>
                </div>
              </div>
              <h4>
                {product.inStock ? "In Stock" : "Out of Stock"} :
                {product.fastDelivery ? " Fast Delivery" : " 3 days +"}
              </h4>

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
