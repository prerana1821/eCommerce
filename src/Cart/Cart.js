import { useUser } from "../User";
import {
  deleteItemFromCartApi,
  incrementQuantityFromCartApi,
  decrementQuantityFromCartApi,
} from "../api-calls";
import "./Cart.css";
import { CheckoutCard } from "./CheckoutCard";
import { EmptyProductsCard } from "./../EmptyProductsCard";

export const Cart = () => {
  const { userState, userDispatch } = useUser();

  return (
    <div className='products products-cart'>
      {userState?.cart.length === 0 ? (
        <EmptyProductsCard
          title='Your Cart is Empty'
          body='There are no items in your cart.'
        />
      ) : (
        <div className='products products-cart'>
          <div>
            {userState?.cart.map((product) => {
              return (
                <div className='card-horizontal' key={product._id}>
                  <img
                    className='card-horizontal-img'
                    src={product.image}
                    alt={product.name}
                  />
                  <button
                    onClick={() => deleteItemFromCartApi(product, userDispatch)}
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
                            incrementQuantityFromCartApi(product, userDispatch)
                          }
                          className='floating-act badge-close tertiary'
                        >
                          <i className='fas fa-lg fa-plus'></i>
                        </button>
                        <p>{product.quantity}</p>
                        {product.quantity > 1 && (
                          <button
                            onClick={() =>
                              decrementQuantityFromCartApi(
                                product,
                                userDispatch
                              )
                            }
                            className='floating-act badge-close tertiary'
                          >
                            <i className='fas fa-minus'></i>
                          </button>
                        )}
                      </div>
                      <p>Rs. {product.price}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <CheckoutCard />
        </div>
      )}
    </div>
  );
};
