import { useData } from "../Products";
import { useUser } from "../User";
import { Link } from "react-router-dom";
import { found, isProdInCart, isProdInWishList, loginAlert } from "../utils";
import { Filters } from "../Filters";
import {
  addToCartApi,
  addToWishListApi,
  deleteFromWishListApi,
} from "../api-calls";
import "./Products.css";
import { useAuth } from "../Auth";
import { LoginAlertModal } from "../LoginAlert";
import Loading from "./../images/loading.svg";
import { useState } from "react";

export const Products = () => {
  const { status, rangedData } = useData();
  const { userState, userDispatch } = useUser();
  const [showModal, setShowModal] = useState(false);
  const [sideNav, showSideNav] = useState(false);
  const { token } = useAuth();

  const openSideNav = () => {
    showSideNav(true);
  };

  const closeSideNav = () => {
    showSideNav(false);
  };

  return (
    <div className='products'>
      <div className='responsive-filter'>
        <h3>Filters</h3>
        <button className='resp-btn-filter' onClick={openSideNav}>
          <i className='fas fa-filter'></i>
        </button>
      </div>
      <div className={sideNav ? "side-filters" : "main-filters"}>
        <div className='resp-heading-filter'>
          <h1>Apply Filters</h1>
          <button className='closebtn' onClick={closeSideNav}>
            <i className='fas fa-times'></i>
          </button>
        </div>
        <Filters />
      </div>
      <div className='product-listing'>
        <h2 className='center-txt ctn'>
          {status.loading && (
            <img src={Loading} alt='loading' className='loading' />
          )}
        </h2>
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
                        token
                          ? (e) => {
                              e.preventDefault();
                              return userState?.wishList.reduce(
                                (acc, value) => {
                                  return value._id === product._id
                                    ? deleteFromWishListApi(
                                        product,
                                        userDispatch
                                      )
                                    : acc;
                                },
                                addToWishListApi(product, userDispatch)
                              );
                            }
                          : (e) => {
                              e.preventDefault();
                              loginAlert(
                                "Hey, you need to login in order to add items to wishlist",
                                setShowModal
                              );
                            }
                      }
                      className='floating-act secondary flt-tri'
                    >
                      <i
                        className={`${isProdInWishList(
                          product,
                          userState,
                          token
                        )}`}
                      ></i>
                    </button>
                  </div>
                </div>
              </Link>
              <div>
                {userState && found(userState.cart, product._id) ? (
                  <Link to='/cart'>
                    <button className='btn btn-primary primary btn-card'>
                      <p>{isProdInCart(product, userState, token)}</p>
                    </button>
                  </Link>
                ) : (
                  <button
                    className='btn btn-primary primary btn-card'
                    onClick={
                      token
                        ? () => addToCartApi(product, userDispatch)
                        : () =>
                            loginAlert(
                              "Hey, you need to login in order to add items to cart",
                              setShowModal
                            )
                    }
                  >
                    <p>{isProdInCart(product, userState, token)}</p>
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
