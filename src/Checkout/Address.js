import { useState } from "react";
import { AddressForm } from "./AddressForm";
import "./Address.css";
import { ShowAddresses } from "./ShowAddresses";

export const Address = () => {
  const [addNewAddress, setAddNewAddress] = useState(false);

  return (
    <div className='address-management'>
      <h2>
        <i class='far fa-address-card'></i> Addresses
      </h2>
      {addNewAddress ? (
        <button
          className='btn btn-pad primary'
          onClick={() => setAddNewAddress(() => !addNewAddress)}
        >
          <i class='fas fa-backspace'></i> Go Back
        </button>
      ) : (
        <button
          className='btn btn-pad primary'
          onClick={() => setAddNewAddress(() => !addNewAddress)}
        >
          <i class='fas fa-plus'></i> Add new Address
        </button>
      )}
      {addNewAddress && (
        <AddressForm
          addNewAddress={addNewAddress}
          setAddNewAddress={setAddNewAddress}
        ></AddressForm>
      )}
      <ShowAddresses />
    </div>
  );
};
