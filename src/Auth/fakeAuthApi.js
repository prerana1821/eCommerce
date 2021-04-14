export const Users = [
  {
    id: 1,
    username: "admin",
    email: "admin@gmail.com",
    password: "admin",
  },
  {
    id: 2,
    username: "prerana",
    email: "name@gmail.com",
    password: "siddhi",
  },
  {
    id: 3,
    username: "nawar",
    email: "surname@gmail.com",
    password: "mejari",
  },
];

export const findUserByUserName = (username) => {
  return Users.find((user) => user.username === username);
};

export const fakeLoginApi = (username, password) => {
  return new Promise((resolve, reject) => {
    const userName = findUserByUserName(username);
    setTimeout(() => {
      if (userName?.password && userName.password === password) {
        resolve({ success: true, status: 200, message: "Login Successful" });
      } else {
        reject({ success: false, status: 404, message: "Login Unssuccessful" });
      }
    }, 3000);
  });
};
