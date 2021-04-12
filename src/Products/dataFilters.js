export const getSearchedData = (productList, searchString) => {
  return productList.filter((item) => {
    return item.name.toLowerCase().includes(searchString.toLowerCase());
  });
};

export const getSortedData = (productList, sortBy) => {
  if (sortBy === "PRICE_LOW_TO_HIGH") {
    return productList.sort((a, b) => a["price"] - b["price"]);
  }
  if (sortBy === "PRICE_HIGH_TO_LOW") {
    return productList.sort((a, b) => b["price"] - a["price"]);
  }
  return productList;
};

export const getFilteredData = (
  productList,
  { showFastDelivery, showInventoryAll }
) => {
  return productList
    .filter(({ fastDelivery }) => (showFastDelivery ? fastDelivery : true))
    .filter(({ inStock }) => (showInventoryAll ? true : inStock));
};

export const getSelectedLevelData = (productList, selectedRange) => {
  return selectedRange
    ? productList.filter((item) => {
        return item.level === selectedRange;
      })
    : productList;
};

export const getSelectedCategoryData = (productList, category) => {
  return category
    ? productList.filter((item) => {
        return item.category === category;
      })
    : productList;
};

export const getRangedPrice = (productList, priceRange) => {
  return productList.filter((item) => {
    return item.price <= priceRange;
  });
};

export const getRatings = (productList, ratings) => {
  return productList.filter((item) => {
    return item.ratings <= ratings;
  });
};
