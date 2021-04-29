import axios from "axios";
import React from "react";
import { useReducer, useState } from "react";
import { useAuth } from "../Auth";
import { useUser } from "../User";
import { findUserById } from "../utils";
import "./Address.css";

const defaultFormState = {
  name: "",
  phoneNumber: "",
  zipCode: "",
  city: "",
  address: "",
  state: "Maharashtra",
  country: "India",
  addressType: "Home",
};

export const AddressForm = ({ addNewAddress, setAddNewAddress, editAddID }) => {
  const { userState, userDispatch } = useUser();
  const { user } = useAuth();
  const currentUser = findUserById(userState, user._id);

  const states = [
    "Andhra Pradesh",
    "Assam",
    "Goa",
    "Kerala",
    "Maharashtra",
    "Bihar",
    "Gujarat",
    "Haryana",
    "Manipur",
    "Sikkim",
  ];

  console.log({ editAddID });
  let editAddress = defaultFormState;

  if (editAddID) {
    editAddress = currentUser.addresses.find((item) => item._id === editAddID);
  }

  console.log(defaultFormState);
  console.log(editAddress);

  console.log(editAddress);

  const countries = ["India"];

  const addressTypes = ["Home", "Office"];

  const formReducer = (state, { type, payload }) => {
    switch (type) {
      case "SET_NAME":
        return { ...state, name: payload };
      case "SET_PHONENO":
        return { ...state, phoneNumber: payload };
      case "SET_ZIPCODE":
        return { ...state, zipCode: payload };
      case "SET_CITY":
        return { ...state, city: payload };
      case "SET_ADDRESS":
        return { ...state, address: payload };
      case "SET_STATE":
        return { ...state, state: payload };
      case "SET_COUNTRY":
        return { ...state, country: payload };
      case "SET_ADDRESSTYPE":
        return { ...state, addressType: payload };
      case "RESET_FORM":
        return payload;
      default:
        break;
    }
    return state;
  };

  const [msg, setMsg] = useState("");

  const initialFormState = {
    name: editAddress.name,
    phoneNumber: editAddress.phoneNumber,
    zipCode: editAddress.zipCode,
    city: editAddress.city,
    address: editAddress.address,
    state: editAddress.state,
    country: editAddress.country,
    addressType: editAddress.addressType,
  };

  const [formState, formDispatch] = useReducer(formReducer, initialFormState);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (/\+?\d[\d -]{8,12}\d/.test(formState.phoneNumber)) {
      if (/^[1-9][0-9]{5}$/.test(formState.zipCode)) {
        console.log({ formState });
        console.log({ user });
        try {
          userDispatch({ type: "STATUS", payload: "Adding Address...." });
          const response = await axios.post(
            `https://api-prestore.prerananawar1.repl.co/user-details/address/${currentUser._id}`,
            {
              newAddress: { ...formState },
            }
          );
          if (response.status === 201) {
            userDispatch({
              type: "ADD_ADDRESS",
              payload: response.data.address,
            });
          }
          setMsg("");
          setAddNewAddress(false);
        } catch (error) {
          userDispatch({
            type: "STATUS",
            payload: "Couldn't add address..",
          });
        } finally {
          userDispatch({ type: "STATUS", payload: "" });
        }
      } else {
        setMsg("Please enter a valid Indian Zip-Code");
      }
    } else {
      setMsg("Please enter a valid 10 digit phone number");
    }
  };

  const handleEditAddress = async (e) => {
    e.preventDefault();
    if (/\+?\d[\d -]{8,12}\d/.test(formState.phoneNumber)) {
      if (/^[1-9][0-9]{5}$/.test(formState.zipCode)) {
        console.log({ formState });
        console.log({ user });
        try {
          userDispatch({
            type: "STATUS",
            payload: "Adding Updated Address....",
          });
          const response = await axios.post(
            `https://api-prestore.prerananawar1.repl.co/user-details/address/${currentUser._id}/${editAddID}`,
            {
              updateAddress: { ...formState },
            }
          );
          if (response.status === 200) {
            userDispatch({
              type: "EDIT_ADDRESS",
              payload: { id: editAddID, address: response.data.address },
            });
            console.log("Hello");
            console.log({ addNewAddress });
            setMsg("");
            setAddNewAddress(false);
            formDispatch({
              type: "RESET_FORM",
              payload: initialFormState,
            });
          }
        } catch (error) {
          userDispatch({
            type: "STATUS",
            payload: "Couldn't update address..",
          });
        } finally {
          userDispatch({ type: "STATUS", payload: "" });
        }
      } else {
        setMsg("Please enter a valid Indian Zip-Code");
      }
    } else {
      setMsg("Please enter a valid 10 digit phone number");
    }
  };

  return (
    <div>
      <form
        onSubmit={editAddID ? handleEditAddress : handleSubmit}
        className='address-form'
      >
        <div className='flex-input'>
          <div className='input'>
            <input
              type='text'
              className='input-txt'
              required
              value={formState.name}
              onChange={(e) =>
                formDispatch({ type: "SET_NAME", payload: e.target.value })
              }
            />
            <span className='flt-label'>Your Name</span>
          </div>

          <div className='input'>
            <input
              type='number'
              className='input-txt'
              required
              value={formState.phoneNumber}
              onChange={(e) =>
                formDispatch({ type: "SET_PHONENO", payload: e.target.value })
              }
            />
            <span className='flt-label'>Phone Number</span>
          </div>
        </div>

        <div className='flex-input'>
          <div className='input'>
            <input
              type='number'
              className='input-txt'
              required
              value={formState.zipCode}
              onChange={(e) =>
                formDispatch({ type: "SET_ZIPCODE", payload: e.target.value })
              }
            />
            <span className='flt-label'>Zip Code</span>
          </div>

          <div className='input'>
            <input
              type='text'
              className='input-txt'
              required
              value={formState.city}
              onChange={(e) =>
                formDispatch({ type: "SET_CITY", payload: e.target.value })
              }
            />
            <span className='flt-label'>City</span>
          </div>
        </div>

        <div className='flex-input'>
          <div className='input'>
            <textarea
              className='input-txtarea'
              cols='20'
              rows='10'
              required
              value={formState.address}
              onChange={(e) =>
                formDispatch({ type: "SET_ADDRESS", payload: e.target.value })
              }
            ></textarea>
            <span className='flt-label'>Address</span>
          </div>

          <div>
            <select
              className='input-select'
              value={formState.state}
              onChange={(e) =>
                formDispatch({ type: "SET_STATE", payload: e.target.value })
              }
            >
              {states.map((stte) => {
                return <option value={stte}>{stte}</option>;
              })}
            </select>

            <select
              className='input-select'
              value={formState.country}
              onChange={(e) =>
                formDispatch({ type: "SET_COUNTRY", payload: e.target.value })
              }
            >
              {countries.map((cntry) => {
                return <option value={cntry}>{cntry}</option>;
              })}
            </select>

            <div className='radio'>
              <p>Select the Address Type:</p>
              {addressTypes.map((addType) => {
                return (
                  <label className='input-radio-label'>
                    <input
                      className='input-radio'
                      type='radio'
                      name='address-type'
                      value={addType}
                      onChange={(e) =>
                        formDispatch({
                          type: "SET_ADDRESSTYPE",
                          payload: e.target.value,
                        })
                      }
                      checked={formState.addressType === addType}
                    />
                    {addType}
                  </label>
                );
              })}
            </div>
          </div>
        </div>
        <div className='flex-input center-div'>
          <p>{msg}</p>
        </div>
        <div className='flex-input center-div'>
          <button className='btn  btn-pad primary' type='submit'>
            {editAddID ? "Save Address" : "Add Address"}
          </button>
          <button
            className='btn  btn-pad secondary'
            onClick={() => {
              setAddNewAddress(false);
              return formDispatch({
                type: "RESET_FORM",
                payload: initialFormState,
              });
            }}
            type='reset'
          >
            Discard
          </button>
        </div>
      </form>
    </div>
  );
};
