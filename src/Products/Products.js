import { useData } from "../Products";
import { useCart } from "../Cart";
import { Link } from "react-router-dom";
import { found } from "../utils";
import { Filters } from "../Filters";
import {
  addToCartApi,
  addToWishListApi,
  deleteFromWishListApi,
} from "../api-calls";
import "./Products.css";
import { useAuth } from "../Auth";
import { LoginAlertModal } from "../LoginAlert";
import { useState } from "react";

export const Products = () => {
  const { loading, rangedData } = useData();
  const { cartState, cartDispatch } = useCart();
  const { login } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const isProdInCart = (item) => {
    return cartState.cart.reduce((acc, value) => {
      if (login) {
        if (item.id === value.id) {
          return "Go to Cart";
        } else {
          return acc;
        }
      } else {
        return acc;
      }
    }, "Add to Cart");
  };

  const isProdInWishList = (item) => {
    return cartState.wishList.reduce((icon, product) => {
      if (login) {
        return product.id === item.id ? (icon = "fas fa-lg fa-heart") : icon;
      } else {
        return icon;
      }
    }, "far fa-lg fa-heart");
  };

  const loginAlert = (msg) => {
    return setShowModal(true);
  };

  return (
    <div className='products'>
      <div className='main-filters'>
        <Filters />
      </div>
      <div className='product-listing'>
        <h2 className='center-txt ctn'>{loading}</h2>
        {rangedData.map((product) => {
          return (
            <div className='card' key={product.id}>
              <img
                className='card-img'
                src={product.image}
                alt={product.name}
              />
              <div className='bdge-sm pink'>
                {product.inStock ? "Stock" : "Sold"}
              </div>
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
                  {product.level} :
                  {product.fastDelivery ? " Fast Delivery" : " 3 days +"}
                </h5>
                <h5>Category: {product.category}</h5>
                <div className='card-details'>
                  <h5>Price: {product.price}</h5>
                  <button
                    onClick={
                      login
                        ? () => {
                            return cartState.wishList.reduce((acc, value) => {
                              return value.id === product.id
                                ? deleteFromWishListApi(product, cartDispatch)
                                : acc;
                            }, addToWishListApi(product, cartDispatch));
                          }
                        : () =>
                            loginAlert(
                              "Hey, you need to login in order to add items to wishlist"
                            )
                    }
                    className='floating-act secondary flt-tri'
                  >
                    <i className={`${isProdInWishList(product)}`}></i>
                  </button>
                </div>
              </div>

              <div>
                {found(cartState.cart, product.id) ? (
                  <Link to='/cart'>
                    <button className='btn btn-primary primary btn-card'>
                      <p>{isProdInCart(product)}</p>
                    </button>
                  </Link>
                ) : (
                  <button
                    className='btn btn-primary primary btn-card'
                    onClick={
                      login
                        ? () => addToCartApi(product, cartDispatch)
                        : () =>
                            loginAlert(
                              "Hey, you need to login in order to add items to cart"
                            )
                    }
                  >
                    <p>{isProdInCart(product)}</p>
                  </button>
                )}
              </div>
            </div>
          );
        })}
        {showModal && (
          <LoginAlertModal
            setShowModal={setShowModal}
            msg={"Hey, you need to login in order to add items"}
          />
        )}
      </div>
    </div>
  );
};
