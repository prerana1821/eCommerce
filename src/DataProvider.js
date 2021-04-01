import { createContext, useContext, useReducer, useEffect } from "react";
import axios from "axios";
// import faker from "faker";

// faker.seed(123);

// const data = [...Array(60)].map((item) => ({
//   id: faker.random.uuid(),
//   name: faker.commerce.productName(),
//   image: faker.random.image(),
//   price: faker.commerce.price(),
//   material: faker.commerce.productMaterial(),
//   brand: faker.lorem.word(),
//   quantity: 0,
//   inStock: faker.random.boolean(),
//   fastDelivery: faker.random.boolean(),
//   ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
//   offer: faker.random.arrayElement([
//     "Save 50",
//     "70% bonanza",
//     "Republic Day Sale",
//   ]),
//   idealFor: faker.random.arrayElement([
//     "Men",
//     "Women",
//     "Girl",
//     "Boy",
//     "Senior",
//   ]),
//   level: faker.random.arrayElement([
//     "beginner",
//     "amateur",
//     "intermediate",
//     "advanced",
//     "professional",
//   ]),
//   color: faker.commerce.color(),
// }));

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const dataReducer = (state, action) => {
    switch (action.type) {
      case "ADD_DATA":
        return { ...state, data: action.payload };
      case "LOAD_STATUS":
        return { ...state, loading: action.payload ? "Loading..." : "" };
      case "TOGGLE_INVENTORY":
        return { ...state, showInventoryAll: !state.showInventoryAll };
      case "TOGGLE_DELIVERY":
        return { ...state, showFastDelivery: !state.showFastDelivery };
      case "SORT":
        return { ...state, sortBy: action.payload };
      case "PRICE_RANGE":
        return { ...state, priceRange: action.payload };
      case "SELECT_LEVEL":
        return { ...state, level: action.payload };
      default:
        console.log("Something went wrong");
        break;
    }
  };

  useEffect(() => {
    (async () => {
      try {
        dispatch({ type: "LOAD_STATUS", payload: true });
        const response = await axios.get("api/products");
        const data = response.data.products;
        console.log({ data });
        dispatch({ type: "ADD_DATA", payload: data });
      } catch (error) {
      } finally {
        dispatch({ type: "LOAD_STATUS", payload: false });
      }
    })();
  }, []);

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
    { showFastDeliveryOnly, showInventoryAll }
  ) {
    return productList
      .filter(({ fastDelivery }) =>
        showFastDeliveryOnly ? fastDelivery : true
      )
      .filter(({ inStock }) => (showInventoryAll ? true : inStock));
  }

  const getSelectedLevelData = (productList, selectedRange) => {
    return productList.filter((item) => {
      return item.level === selectedRange;
    });
  };

  const getRangedPrice = (productList, priceRange) => {
    console.log({ priceRange });
    return productList.filter((item) => {
      return item.price < Number(priceRange);
    });
  };

  const [
    {
      data,
      loading,
      sortBy,
      showFastDeliveryOnly,
      showInventoryAll,
      priceRange,
      level,
    },
    dispatch,
  ] = useReducer(dataReducer, {
    data: [],
    loading: "",
    showInventoryAll: true,
    showFastDelivery: false,
    sortBy: null,
    priceRange: 1000,
    level: "beginner",
  });

  const sortedData = getSortedData(data, sortBy);
  const filteredData = getFilteredData(sortedData, {
    showFastDeliveryOnly,
    showInventoryAll,
  });
  const selectedLevelData = getSelectedLevelData(filteredData, level);
  const rangedData = getRangedPrice(selectedLevelData, priceRange);

  console.log("!!!!!!!!!", { priceRange });

  console.log(rangedData);

  return (
    <DataContext.Provider value={{ sortBy, rangedData, dispatch, loading }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};
