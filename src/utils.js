export const found = (array, id) => {
  return !!array.find((item) => item.id === id);
};

export const findUserById = (array, id) => {
  return array.find((user) => user.id === id);
};
