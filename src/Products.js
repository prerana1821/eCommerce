import { useData } from "./DataProvider";
import { useCart } from "./CartProvider";

export const Products = ({ setRoute }) => {
  const { loading, rangedData } = useData();
  const { cartState, cartDispatch } = useCart();

  // console.log({ loading });

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

  // const isProdInWishList = (item) => {
  //   return cartState.wishList.map((prod) => {
  //     if (prod.id === item.id) {
  //       return <i className='fas fa-lg fa-heart'></i>;
  //     } else {
  //       return <i className='far fa-lg fa-heart'></i>;
  //     }
  //   });
  // };

  const isProdInWishList = (item) => {
    return cartState.wishList.map((prod) => {
      if (prod.id === item.id) {
        return "fas fa-lg fa-heart";
      } else {
        return "far fa-lg fa-heart";
      }
    });
  };

  return (
    <div className='products'>
      <h2 className='center-txt ctn'>{loading}</h2>
      {rangedData.map((product) => {
        return (
          <div className='card' key={product.id}>
            <img className='card-img' src={product.image} alt={product.name} />
            <div className='bdge-sm pink'>NEW</div>
            <div className='card-info'>
              <p>{product.name}</p>
              <div className='card-info-details'>
                <h5>
                  {product.material} - {product.brand}
                </h5>
                <div className='badge-ratings'>
                  <h5>{product.ratings}</h5>
                  <i className='fa fa-star'></i>
                </div>
              </div>
              <h5>
                {product.inStock ? "In Stock" : "Out of Stock"} :
                {product.fastDelivery ? " Fast Delivery" : " 3 days +"}
              </h5>
              <h5>{product.level}</h5>
              <div className='card-details'>
                <h5>Price: {product.price}</h5>
                <button
                  onClick={() => {
                    console.log(cartState.wishList);
                    // return cartState.wishList.map((item) => {
                    //   console.log("Hello");
                    //   if (item.id === product.id) {
                    //     console.log("there");
                    //     return cartDispatch({
                    //       type: "REMOVE_FROM_WISHLIST",
                    //       payload: product,
                    //     });
                    //   } else {
                    //     console.log("not there");
                    return cartDispatch({
                      type: "ADD_TO_WISHLIST",
                      payload: product,
                      // });
                      // }
                    });
                    // return cartDispatch({ type: "ADD_TO_WISHLIST", payload: product });
                  }}
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
                    <i className='fas fa-lg fa-heart'></i>
                  ) : ( */}
                  {/* <i className='far fa-lg fa-heart'></i> */}
                  <i className={`${isProdInWishList(product)}`}></i>
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
