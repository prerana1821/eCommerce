import { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";
import {
  getSearchedData,
  getFilteredData,
  getRangedPrice,
  getRatings,
  getSelectedCategoryData,
  getSelectedLevelData,
  getSortedData,
} from "./dataFilters";
import { dataReducer } from "./dataReducer";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  useEffect(() => {
    (async () => {
      try {
        dispatch({ type: "STATUS", payload: "Loading data from server..." });
        // const response = await axios.get("api/products");
        const response = await axios.get(
          "https://api-prestore.prerananawar1.repl.co/products"
        );
        // console.log({ response });
        const data = response.data.products;
        dispatch({ type: "ADD_DATA", payload: data });
      } catch (error) {
        dispatch({ type: "STATUS", payload: "Sorry, try again later.." });
      } finally {
        dispatch({ type: "STATUS", payload: "" });
      }
    })();
  }, []);

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
        category,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};
