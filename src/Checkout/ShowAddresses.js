import React from "react";
import { useState } from "react";
import { useUser } from "../User";
import { Link } from "react-router-dom";
import axios from "axios";
import { AddressForm } from "./AddressForm";
import { API_URL } from "../utils";

export const ShowAddresses = ({ setAddNewAddress, editAdd, setEditAdd }) => {
  const { userState, userDispatch } = useUser();

  const [chooseAddress, setChooseAddress] = useState(null);

  const editAddress = (id) => {
    setEditAdd({ toggle: true, editAddID: id });
  };

  const deleteAddress = async (id) => {
    try {
      userDispatch({ type: "STATUS", payload: "Deleting Address...." });
      const response = await axios.delete(
        `${API_URL}/user-details/address/${id}`
      );
      if (response.status === 200) {
        userDispatch({
          type: "DELETE_ADDRESS",
          payload: response.data.addresses,
        });
      }
    } catch (error) {
      userDispatch({
        type: "STATUS",
        payload: "Couldn't add address..",
      });
    } finally {
      userDispatch({ type: "STATUS", payload: "" });
    }
  };

  return (
    <>
      {editAdd.toggle && (
        <AddressForm
          editAddID={editAdd.editAddID}
          setAddNewAddress={setAddNewAddress}
          setEditAdd={setEditAdd}
        />
      )}
      <div className='show-addresses'>
        {userState.addresses.map((item) => {
          return (
            <div className='card card-address' key={item._id}>
              <input
                type='radio'
                name='address'
                value={item._id}
                checked={chooseAddress === item._id}
                onChange={(e) => setChooseAddress(e.target.value)}
              />
              <label>
                <div key={item._id}>
                  <h3>Name: {item.name}</h3>
                  <p>Phone Number: {item.phoneNumber}</p>
                  <p>City: {item.city}</p>
                  <p>
                    Address: {item.address} - {item.zipCode}
                  </p>
                  <p>
                    {item.state} - {item.country}
                  </p>
                  <p>Address Type: {item.addressType}</p>
                  <p>Cash on Delivery Avaliable</p>
                  <div className='address-actions'>
                    <button
                      className='btn btn-pad primary'
                      onClick={() => editAddress(item._id)}
                    >
                      <i className='far fa-edit'></i> Edit
                    </button>
                    <button
                      className='btn btn-pad secondary'
                      onClick={() => deleteAddress(item._id)}
                    >
                      <i className='fas fa-trash'></i> Delete
                    </button>
                  </div>
                  {chooseAddress === item._id && (
                    <div className='mg-top'>
                      <Link to='/checkout' state={{ id: chooseAddress }}>
                        <button className='btn btn-pad primary'>
                          Deliver to this Address
                        </button>
                      </Link>
                    </div>
                  )}
                </div>
              </label>
            </div>
          );
        })}
      </div>
    </>
  );
};
