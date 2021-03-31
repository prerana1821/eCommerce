import { useCart } from "./CartProvider";

export const Cart = () => {
  const { cartState, cartDispatch } = useCart();

  return (
    <div>
      {cartState.map((product) => {
        return (
          <div className='card-horizontal' key={product.id}>
            <img className='card-horizontal-img' src={product.image} alt='' />
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
    </div>
  );
};
