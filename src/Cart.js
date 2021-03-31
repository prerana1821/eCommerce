import { useCart } from "./CartProvider";

export const Cart = () => {
  const { cartState, cartDispatch } = useCart();

  function totalPrice() {
    return cartState.cart.reduce((acc, value) => {
      return acc + value.quantity * value.price;
    }, 0);
  }

  return (
    <div>
      {cartState.cart.map((product) => {
        return (
          <div className='card-horizontal' key={product.id}>
            <img className='card-horizontal-img' src={product.image} alt='' />
            <button
              onClick={() =>
                cartDispatch({
                  type: "REMOVE_FROM_CART",
                  payload: product,
                })
              }
              className='floating-act badge-close tertiary'
            >
              <i className='fas fa-lg fa-times'></i>
            </button>
            <div className='card-info'>
              <h3>{product.name}</h3>
              <small>{product.color}</small>
              <div className='card-details-horizontal'>
                <div className='card-quant'>
                  <button
                    onClick={() =>
                      cartDispatch({
                        type: "INCREMENT_QUANTITY",
                        payload: product,
                      })
                    }
                    className='floating-act badge-close tertiary'
                  >
                    <i className='fas fa-lg fa-plus'></i>
                  </button>
                  <p>{product.quantity}</p>
                  <button
                    onClick={() =>
                      cartDispatch({
                        type: "DECREMENT_QUANTITY",
                        payload: product,
                      })
                    }
                    className='floating-act badge-close tertiary'
                  >
                    <i className='fas fa-minus'></i>
                  </button>
                </div>
                <p>{product.price}</p>
              </div>
            </div>
          </div>
        );
      })}
      <h3 className='center-txt'>Total Price: {totalPrice()}</h3>
    </div>
  );
};
