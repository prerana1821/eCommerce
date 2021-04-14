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
        reject({ success: false, status: 404, message: "Login Unsuccessful" });
      }
    }, 3000);
  });
};

let id = 123;

export const fakeSignUpApi = (username, password, email) => {
  return new Promise((resolve, reject) => {
    const userName = findUserByUserName(username);
    setTimeout(() => {
      if (!userName?.username) {
        Users.push({ id: id++, username, password, email });
        resolve({ success: true, status: 200, message: "Login Successful" });
      } else {
        reject({
          success: false,
          status: 404,
          message: "Username Already Exists",
        });
      }
    }, 3000);
  });
};
