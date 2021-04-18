// import { useAuth } from "../Auth/AuthProvider";
// import { found } from "../utils";

// export const userReducer = (userState, action) => {
//   switch (action.type) {
//     case "LOAD_DATA_TO_CART":
//       return {
//         ...userState,
//         cart: action.payload,
//       };
//     case "LOAD_DATA_TO_WIHSLIST":
//       return {
//         ...userState,
//         wishList: action.payload,
//       };
//     case "STATUS":
//       return {
//         ...userState,
//         loading: action.payload,
//       };
//     case "ADD_TO_CART":
//       return {
//         ...userState,
//         cart: [...userState.cart, { ...action.payload, quantity: 1 }],
//       };
//     case "REMOVE_FROM_CART":
//       return {
//         ...userState,
//         cart: userState.cart.filter((item) => {
//           return item.id !== action.payload.id;
//         }),
//       };
//     case "ADD_TO_WISHLIST":
//       return {
//         ...userState,
//         wishList: [...userState.wishList, action.payload],
//       };
//     case "REMOVE_FROM_WISHLIST":
//       return {
//         ...userState,
//         wishList: userState.wishList.filter(
//           (item) => item.id !== action.payload.id
//         ),
//       };
//     case "INCREMENT_QUANTITY":
//       return {
//         ...userState,
//         cart: userState.cart.map((item) => {
//           return item.id === action.payload.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item;
//         }),
//       };
//     case "DECREMENT_QUANTITY":
//       return {
//         ...userState,
//         cart: userState.cart.map((item) => {
//           return item.id === action.payload.id
//             ? { ...item, quantity: item.quantity - 1 }
//             : item;
//         }),
//       };
//     case "ADD_TO_CART_FROM_WISHLIST":
//       return {
//         ...userState,
//         cart: found(userState.cart, action.payload.id)
//           ? userState.cart.map((value) => {
//               return value.id === action.payload.id
//                 ? { ...action.payload, quantity: value.quantity + 1 }
//                 : value;
//             })
//           : [...userState.cart, { ...action.payload, quantity: 1 }],
//         wishList: userState.wishList.filter((item) => {
//           return item.id !== action.payload.id;
//         }),
//       };
//     default:
//       console.log("Something went wrong");
//       break;
//   }

//   return userState;
// };
