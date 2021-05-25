import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useData } from "../Products";
import { useUser } from "../User";
import { Link } from "react-router-dom";
import { found, isProdInCart, isProdInWishList, loginAlert } from "../utils";
import {
  addToCartApi,
  addToWishListApi,
  deleteFromWishListApi,
} from "../api-calls";
import { useAuth } from "../Auth";
import { LoginAlertModal } from "../LoginAlert";
import Loading from "./../images/loading.svg";
import "./ProductDetail.css";

export const ProductDetail = () => {
  const { id } = useParams();
  const { status, productDetail, dispatch } = useData();
  const { userState, userDispatch } = useUser();
  const { login } = useAuth();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        dispatch({
          type: "STATUS",
          payload: { loading: "Loading data from server..." },
        });
        const response = await axios.get(
          `https://api-prestore.prerananawar1.repl.co/products/${id}`
        );
        const data = response.data.product;
        dispatch({ type: "PRODUCT_DETAIL", payload: data });
      } catch (error) {
        dispatch({
          type: "STATUS",
          payload: { error: "Sorry, try again later.." },
        });
      } finally {
        dispatch({ type: "STATUS", payload: { loading: "" } });
      }
    })();
  }, [id]);

  return (
    <div className='product-details'>
      <p>
        {status.loading && (
          <img src={Loading} alt='loading' className='loading' />
        )}
      </p>
      <div className='product-detail'>
        <img
          className='product-detail-img'
          src={productDetail.image}
          alt={productDetail.name}
        />
        <div className='product-detail-info'>
          <div>
            <h2>{productDetail.name}</h2>
            <p>Category: {productDetail.category}</p>
            <p>Brand: {productDetail.brand}</p>
            <p>Price: {productDetail.price}</p>
            <p>
              Delivery:{" "}
              {productDetail.fastDelivery
                ? "Fast Delivery Avaiable"
                : "3 Days +"}
            </p>
            <hr className='product-detail-divider' />
            <ul className='product-detail-list'>
              <li>Ideal for: {productDetail.idealFor}</li>
              <li>Level: {productDetail.level}</li>
              <li>Material: {productDetail.material}</li>
            </ul>
          </div>
          <div className='product-detail-actions'>
            <div>
              <button
                onClick={
                  login
                    ? () => {
                        return userState?.wishList.reduce((acc, value) => {
                          return value._id === productDetail._id
                            ? deleteFromWishListApi(
                                userState,
                                productDetail,
                                userDispatch
                              )
                            : acc;
                        }, addToWishListApi(userState, productDetail, userDispatch));
                      }
                    : () =>
                        loginAlert(
                          "Hey, you need to login in order to add items to wishlist",
                          setShowModal
                        )
                }
                className='floating-act secondary flt-tri'
              >
                <i
                  className={`${isProdInWishList(
                    productDetail,
                    userState,
                    login
                  )}`}
                ></i>
              </button>
            </div>
            <div>
              {userState && found(userState.cart, productDetail._id) ? (
                <Link to='/cart'>
                  <button className='btn primary btn-pad-sm'>
                    <p>{isProdInCart(productDetail, userState, login)}</p>
                  </button>
                </Link>
              ) : (
                <button
                  className='btn primary btn-pad-sm'
                  onClick={
                    login
                      ? () =>
                          addToCartApi(userState, productDetail, userDispatch)
                      : () =>
                          loginAlert(
                            "Hey, you need to login in order to add items to cart",
                            setShowModal
                          )
                  }
                >
                  <p>{isProdInCart(productDetail, userState, login)}</p>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <LoginAlertModal
          setShowModal={setShowModal}
          msg={"Hey, you need to login in order to add items"}
        />
      )}
    </div>
  );
};
