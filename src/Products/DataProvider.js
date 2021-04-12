import { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const dataReducer = (state, action) => {
    switch (action.type) {
      case "ADD_DATA":
        return { ...state, data: action.payload };
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

  useEffect(() => {
    (async () => {
      try {
        dispatch({ type: "STATUS", payload: "Loading data from server..." });
        const response = await axios.get("api/products");
        const data = response.data.products;
        dispatch({ type: "ADD_DATA", payload: data });
      } catch (error) {
        dispatch({ type: "STATUS", payload: "Sorry, try again later.." });
      } finally {
        dispatch({ type: "STATUS", payload: "" });
      }
    })();
  }, []);

  const getSearchedData = (productList, searchString) => {
    return productList.filter((item) => {
      return item.name.toLowerCase().includes(searchString.toLowerCase());
    });
  };

  const getSortedData = (productList, sortBy) => {
    if (sortBy === "PRICE_LOW_TO_HIGH") {
      return productList.sort((a, b) => a["price"] - b["price"]);
    }
    if (sortBy === "PRICE_HIGH_TO_LOW") {
      return productList.sort((a, b) => b["price"] - a["price"]);
    }
    return productList;
  };

  function getFilteredData(
    productList,
    { showFastDelivery, showInventoryAll }
  ) {
    return productList
      .filter(({ fastDelivery }) => (showFastDelivery ? fastDelivery : true))
      .filter(({ inStock }) => (showInventoryAll ? true : inStock));
  }

  const getSelectedLevelData = (productList, selectedRange) => {
    return selectedRange
      ? productList.filter((item) => {
          return item.level === selectedRange;
        })
      : productList;
  };

  const getSelectedCategoryData = (productList, category) => {
    return category
      ? productList.filter((item) => {
          return item.category === category;
        })
      : productList;
  };

  const getRangedPrice = (productList, priceRange) => {
    return productList.filter((item) => {
      return item.price <= priceRange;
    });
  };

  const getRatings = (productList, ratings) => {
    return productList.filter((item) => {
      return item.ratings <= ratings;
    });
  };

  const [
    {
      data,
      loading,
      sortBy,
      showFastDelivery,
      showInventoryAll,
      priceRange,
      ratings,
      level,
      searchString,
      category,
    },
    dispatch,
  ] = useReducer(dataReducer, {
    data: [],
    loading: "",
    showInventoryAll: true,
    showFastDelivery: false,
    sortBy: null,
    priceRange: 1000,
    level: "",
    ratings: 5,
    searchString: "",
    category: "",
  });

  const searchedData = getSearchedData(data, searchString);
  const categoryData = getSelectedCategoryData(searchedData, category);
  const sortedData = getSortedData(categoryData, sortBy);
  const filteredData = getFilteredData(sortedData, {
    showFastDelivery,
    showInventoryAll,
  });
  const selectedLevelData = getSelectedLevelData(filteredData, level);
  const ratingsData = getRatings(selectedLevelData, ratings);
  const rangedData = getRangedPrice(ratingsData, priceRange);

  return (
    <DataContext.Provider
      value={{
        sortBy,
        rangedData,
        ratings,
        dispatch,
        priceRange,
        loading,
        searchString,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};
