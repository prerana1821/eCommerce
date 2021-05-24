import { useData } from "../Products";
import { useUser } from "../User";
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
// import { findUserById } from "../utils";

export const Products = () => {
  const { loading, rangedData } = useData();
  const { userState, userDispatch } = useUser();
  const { user, login } = useAuth();
  const [showModal, setShowModal] = useState(false);
  console.log(user);
  console.log(userState);
  // const currentUser = findUserById(userState, user._id);

  const [sideNav, showSideNav] = useState(false);

  const handleClick = () => {
    showSideNav(true);
  };

  const handleClose = () => {
    showSideNav(false);
  };

  const isProdInCart = (item) => {
    return login
      ? userState?.cart.reduce((acc, value) => {
          if (item._id === value._id) {
            return "Go to Cart";
          } else {
            return acc;
          }
        }, "Add to Cart")
      : "Add to Cart";
  };

  const isProdInWishList = (item) => {
    return login
      ? userState?.wishList.reduce((icon, product) => {
          return product._id === item._id
            ? (icon = "fas fa-lg fa-heart")
            : icon;
        }, "far fa-lg fa-heart")
      : "far fa-lg fa-heart";
  };

  const loginAlert = (msg) => {
    return setShowModal(true);
  };

  return (
    <div className='products'>
      <div className='responsive-filter'>
        <h3>Filters</h3>
        <button className='resp-btn-filter' onClick={handleClick}>
          <i className='fas fa-filter'></i>
        </button>
      </div>
      <div className={sideNav ? "side-filters" : "main-filters"}>
        <div className='resp-heading-filter'>
          <h1>Apply Filters</h1>
          <button className='closebtn' onClick={handleClose}>
            <i className='fas fa-times'></i>
          </button>
        </div>
        <Filters />
      </div>
      <div className='product-listing'>
        <h2 className='center-txt ctn'>{loading}</h2>
        {rangedData.map((product) => {
          return (
            <div className='card' key={product._id}>
              <img
                className='card-img'
                src={product.image}
                alt={product.name}
              />
              <div className='bdge-sm pink'>
                {product.inStock ? "Stock" : "Sold"}
              </div>
              <Link to={`/products/${product._id}`}>
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
                          ? (e) => {
                              e.preventDefault();
                              return userState?.wishList.reduce(
                                (acc, value) => {
                                  return value._id === product._id
                                    ? deleteFromWishListApi(
                                        userState,
                                        product,
                                        userDispatch
                                      )
                                    : acc;
                                },
                                addToWishListApi(
                                  userState,
                                  product,
                                  userDispatch
                                )
                              );
                            }
                          : (e) => {
                              e.preventDefault();
                              loginAlert(
                                "Hey, you need to login in order to add items to wishlist"
                              );
                            }
                      }
                      className='floating-act secondary flt-tri'
                    >
                      <i className={`${isProdInWishList(product)}`}></i>
                    </button>
                  </div>
                </div>
              </Link>
              <div>
                {userState && found(userState.cart, product._id) ? (
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
                        ? () => addToCartApi(userState, product, userDispatch)
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
