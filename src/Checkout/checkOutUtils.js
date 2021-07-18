import axios from "axios";
import { API_URL } from "../utils";

export const handleSubmit = async ({
  e,
  formState,
  userDispatch,
  setMsg,
  setAddNewAddress,
}) => {
  e.preventDefault();

  if (/\+?\d[\d -]{8,12}\d/.test(formState.phoneNumber)) {
    if (/^[1-9][0-9]{5}$/.test(formState.zipCode)) {
      try {
        userDispatch({ type: "STATUS", payload: "Adding Address...." });
        const response = await axios.post(`${API_URL}/user-details/address`, {
          newAddress: { ...formState },
        });
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

export const handleEditAddress = async ({
  e,
  formState,
  userDispatch,
  editAddID,
  setAddNewAddress,
  formDispatch,
  setMsg,
  setEditAdd,
  initialFormState,
}) => {
  e.preventDefault();
  if (/\+?\d[\d -]{8,12}\d/.test(formState.phoneNumber)) {
    if (/^[1-9][0-9]{5}$/.test(formState.zipCode)) {
      try {
        userDispatch({
          type: "STATUS",
          payload: "Adding Updated Address....",
        });
        const response = await axios.post(
          `${API_URL}/user-details/address/${editAddID}`,
          {
            updateAddress: { ...formState },
          }
        );
        if (response.status === 200) {
          userDispatch({
            type: "EDIT_ADDRESS",
            payload: { id: editAddID, address: response.data.address },
          });
          setMsg("");
          setEditAdd(false);
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
