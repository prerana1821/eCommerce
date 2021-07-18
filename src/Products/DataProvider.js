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
import { API_URL } from "../utils";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  useEffect(() => {
    (async () => {
      try {
        dispatch({
          type: "STATUS",
          payload: { loading: "Loading data from server..." },
        });
        const response = await axios.get(`${API_URL}/products`);
        const data = response.data.products;
        dispatch({ type: "ADD_DATA", payload: data });
        dispatch({
          type: "STATUS",
          payload: { loading: "" },
        });
      } catch (error) {
        console.log(error.response);
        dispatch({
          type: "STATUS",
          payload: { error: "Sorry, try again later.." },
        });
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        dispatch({
          type: "STATUS",
          payload: { loading: "Loading categories from server..." },
        });
        const response = await axios.get(`${API_URL}/categories`);
        const data = response.data.categories;
        dispatch({ type: "ADD_CATEGORIES", payload: data });
        dispatch({
          type: "STATUS",
          payload: { loading: "" },
        });
      } catch (error) {
        dispatch({
          type: "STATUS",
          payload: { error: "Sorry, try again later.." },
        });
      }
    })();
  }, []);

  const [
    {
      data,
      status,
      sortBy,
      productDetail,
      categories,
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
    categories: [],
    status: { loading: "", success: "", error: "" },
    showInventoryAll: true,
    productDetail: {},
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
        categories,
        productDetail,
        dispatch,
        priceRange,
        status,
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
