export const dataReducer = (state, action) => {
  switch (action.type) {
    case "ADD_DATA":
      return { ...state, data: action.payload };
    case "ADD_CATEGORIES":
      return { ...state, categories: action.payload };
    case "STATUS":
      return {
        ...state,
        loading: action.payload,
      };
    case "CLEAR_FILTERS":
      return {
        ...state,
        showInventoryAll: true,
        showFastDelivery: false,
        sortBy: null,
        priceRange: 1000,
        level: "",
        ratings: 5,
        searchString: "",
        category: "",
      };
    case "SEARCH":
      return { ...state, searchString: action.payload };
    case "PRODUCT_DETAIL":
      return { ...state, productDetail: action.payload };
    case "TOGGLE_INVENTORY":
      return { ...state, showInventoryAll: !state.showInventoryAll };
    case "TOGGLE_DELIVERY":
      return { ...state, showFastDelivery: !state.showFastDelivery };
    case "SORT":
      return { ...state, sortBy: action.payload };
    case "PRICE_RANGE":
      return { ...state, priceRange: action.payload };
    case "RATINGS":
      return { ...state, ratings: action.payload };
    case "SELECT_LEVEL":
      return { ...state, level: action.payload };
    case "CATEGORY":
      return { ...state, category: action.payload };
    default:
      console.log("Something went wrong");
      break;
  }
};
