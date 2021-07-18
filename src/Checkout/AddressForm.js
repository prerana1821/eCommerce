import { useReducer, useState } from "react";
import { useUser } from "../User";
import "./Address.css";
import { handleEditAddress, handleSubmit } from "./checkOutUtils";
import { addressTypes, countries, states } from "./formDB";
import { formReducer } from "./formReducer";

export const defaultFormState = {
  name: "",
  phoneNumber: "",
  zipCode: "",
  city: "",
  address: "",
  state: "Maharashtra",
  country: "India",
  addressType: "Home",
};

export const AddressForm = ({ setAddNewAddress, editAddID, setEditAdd }) => {
  const { userState, userDispatch } = useUser();
  const [msg, setMsg] = useState("");
  let editAddress = defaultFormState;
  if (editAddID) {
    editAddress = userState.addresses.find((item) => item._id === editAddID);
  }

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

  return (
    <div>
      <form
        onSubmit={
          editAddID
            ? (e) =>
                handleEditAddress({
                  e,
                  formState,
                  userDispatch,
                  editAddID,
                  setAddNewAddress,
                  formDispatch,
                  setMsg,
                  setEditAdd,
                  initialFormState,
                })
            : (e) =>
                handleSubmit({
                  e,
                  formState,
                  userDispatch,
                  setMsg,
                  setAddNewAddress,
                })
        }
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
              {states.map((state) => {
                return <option value={state}>{state}</option>;
              })}
            </select>

            <select
              className='input-select'
              value={formState.country}
              onChange={(e) =>
                formDispatch({ type: "SET_COUNTRY", payload: e.target.value })
              }
            >
              {countries.map((country) => {
                return <option value={country}>{country}</option>;
              })}
            </select>

            <div className='radio'>
              <p>Select the Address Type:</p>
              {addressTypes.map((addressType) => {
                return (
                  <label className='input-radio-label'>
                    <input
                      className='input-radio'
                      type='radio'
                      name='address-type'
                      value={addressType}
                      onChange={(e) =>
                        formDispatch({
                          type: "SET_ADDRESSTYPE",
                          payload: e.target.value,
                        })
                      }
                      checked={formState.addressType === addressType}
                    />
                    {addressType}
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
