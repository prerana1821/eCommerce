import React from "react";
import { useState } from "react";
import { useUser } from "../User";
import { Link } from "react-router-dom";
import axios from "axios";
import { AddressForm } from "./AddressForm";

export const ShowAddresses = () => {
  const { userState, userDispatch } = useUser();
  const [editAdd, setEditAdd] = useState({ toggle: false, editAddID: "" });
  const [chooseAddress, setChooseAddress] = useState(null);

  const editAddress = (id) => {
    setEditAdd({ toggle: true, editAddID: id });
  };

  const deleteAddress = async (id) => {
    try {
      userDispatch({ type: "STATUS", payload: "Deleting Address...." });
      const response = await axios.delete(
        `https://api-prestore.prerananawar1.repl.co/user-details/address/${userState._id}/${id}`
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
      {editAdd.toggle && <AddressForm editAddID={editAdd.editAddID} />}
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
