import React from "react";
import { useUser } from "../User";
import { useAuth } from "../Auth";
import { findUserById } from "../utils";
import { useLocation } from "react-router";

export const Checkout = () => {
  const { userState } = useUser();
  const { user } = useAuth();
  const currentUser = findUserById(userState, user._id);
  const { state } = useLocation();

  console.log({ state });

  console.log("Checkout", { currentUser });

  const totalPrice = () => {
    return currentUser.cart.reduce((value, item) => {
      return value + item.quantity * item.price;
    }, 0);
  };

  const address = currentUser.addresses.find((item) => item._id === state.id);

  return (
    <div className='checkout-main'>
      <h2>Order Summary</h2>
      <div>
        <h3>Address</h3>
        <div className='card order-card'>
          <p>Name: {address.name}</p>
          <p>Phone Number: {address.phoneNumber}</p>
          <p>
            City: {address.city} - {address.zipCode}
          </p>
          <p>
            Address: {address.address} {address.state} {address.country}
          </p>
          <p>Address Type: {address.addressType}</p>
        </div>
      </div>
      <div>
        <h3>Cart Details</h3>
        <div>
          {currentUser.cart.map((item) => {
            return (
              <div key={item._id} className='card secondary checkout-card'>
                <p>Name: {item.name}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: {item.price}</p>
              </div>
            );
          })}
          <p>Total Price: ₹ {totalPrice()}</p>
        </div>
      </div>
      <div className='proceed'>
        <button className='btn btn-pad primary'>Proceed to Checkout</button>
      </div>
    </div>
  );
};
