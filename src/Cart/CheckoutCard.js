import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../User";
import { totalPrice } from "../utils";

export const CheckoutCard = () => {
  const { userState } = useUser();

  const totalItemPrice = (item) => {
    return item.quantity * item.price;
  };

  return (
    <div>
      <div className='card card-checkout'>
        <h2>Price Details - {userState?.cart.length} Items</h2>
        <div>
          <div className='item-price-details'>
            <h4 className='center-txt'>Total Price:</h4>
            <h4>{totalPrice(userState)}</h4>
          </div>
          <div>
            {userState?.cart.map((item) => {
              return (
                <div className='item-price-details'>
                  <p>
                    <span>
                      <bold>{item.quantity}</bold>
                    </span>
                    x <span>{item.name}</span>
                  </p>
                  <p>
                    <span>
                      <bold>₹ {totalItemPrice(item)}</bold>
                    </span>
                  </p>
                </div>
              );
            })}
          </div>
          <div className='item-price-details'>
            <p>Delivery Charges :</p>
            <p> FREE</p>
          </div>
        </div>
        <hr className='hr' />
        <div className='checkout'>
          <div className='item-price-details'>
            <h4 className='center-txt'>Total Amount: </h4>
            <h4 className='center-txt'>
              <bold> ₹ {totalPrice(userState)} /-</bold>
            </h4>
          </div>
          <Link to='/address'>
            <button className='btn btn-checkout primary'>CHECKOUT</button>
          </Link>
          <div className='item-price-details'>
            <small>Total price inc GST*</small>
          </div>
        </div>
      </div>
    </div>
  );
};
