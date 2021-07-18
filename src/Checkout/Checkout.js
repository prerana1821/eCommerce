import React from "react";
import { useUser } from "../User";
import { useLocation } from "react-router";
import { totalPrice } from "../utils";

export const Checkout = () => {
  const { userState } = useUser();
  const { state } = useLocation();
  const address = userState.addresses.find((item) => item._id === state.id);

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
          {userState.cart.map((item) => {
            return (
              <div key={item._id} className='card secondary checkout-card'>
                <p>Name: {item.name}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Price: {item.price}</p>
              </div>
            );
          })}
          <p>Total Price: ₹ {totalPrice(userState)}</p>
        </div>
      </div>
      <div className='proceed'>
        <button className='btn btn-pad primary'>Proceed to Checkout</button>
      </div>
    </div>
  );
};
