export const found = (array, id) => {
  return !!array.find((item) => item._id === id);
};

export const findUserById = (array, id) => {
  return array.find((user) => user._id === id);
};
