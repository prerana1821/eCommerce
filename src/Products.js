import { useData } from "./DataProvider";
import { useCart } from "./CartProvider";

export const Products = ({ setRoute }) => {
  const { loading, rangedData } = useData();
  const { cartState, cartDispatch } = useCart();

  const isProdInCart = (item) => {
    return cartState.cart.reduce((acc, value) => {
      if (item.id === value.id) {
        return "Go to Cart";
      } else {
        return acc;
      }
    }, "Add to Cart");
  };

  const isProdInWishList = (item) => {
    return cartState.wishList.reduce((icon, product) => {
      return product.id === item.id ? (icon = "fas fa-lg fa-heart") : icon;
    }, "far fa-lg fa-heart");
  };

  const found = (array, id) => {
    return !!array.find((item) => item.id === id);
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
                    return cartState.wishList.reduce((acc, value) => {
                      return value.id === product.id
                        ? cartDispatch({
                            payload: product,
                            type: "REMOVE_FROM_WISHLIST",
                          })
                        : acc;
                    }, cartDispatch({ type: "ADD_TO_WISHLIST", payload: product }));
                  }}
                  className='floating-act secondary flt-tri'
                >
                  <i className={`${isProdInWishList(product)}`}></i>
                </button>
              </div>
            </div>
            <button
              className='btn btn-primary primary btn-card'
              onClick={() => {
                return found(cartState.cart, product.id)
                  ? setRoute("cart")
                  : cartDispatch({ type: "ADD_TO_CART", payload: product });
              }}
            >
              <p>{isProdInCart(product)}</p>
            </button>
          </div>
        );
      })}
    </div>
  );
};
