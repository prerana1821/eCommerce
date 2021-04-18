export const Users = [
  {
    id: 1,
    username: "admin",
    email: "admin@gmail.com",
    password: "admin",
  },
];

export const findUserByUserName = (username) => {
  return Users.find((user) => user.username === username);
};

export const findUserByEmail = (email) => {
  return Users.find((user) => user.email === email);
};

export const fakeLoginApi = (username, password) => {
  return new Promise((resolve, reject) => {
    const userName = findUserByUserName(username);
    setTimeout(() => {
      if (userName?.password && userName.password === password) {
        resolve({
          userId: userName.id,
          success: true,
          status: 200,
          message: "Login Successful",
        });
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
        const newUser = { id: id++, username, password, email };
        Users.push(newUser);
        resolve({
          userId: newUser.id,
          success: true,
          status: 200,
          message: "Login Successful",
        });
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

const changePassword = (email, password) => {
  return Users.forEach((user) => {
    Object.keys(user).forEach((key) => {
      if (user.email === email) {
        user.password = password;
      }
    });
  });
};

export const fakeForgotPassApi = (email, password) => {
  return new Promise((resolve, reject) => {
    const userName = findUserByEmail(email);
    setTimeout(() => {
      if (userName?.email) {
        changePassword(email, password);
        console.log({ Users });
        resolve({
          userId: userName.id,
          success: true,
          status: 200,
          message: "Password Changed Successfully",
        });
      } else {
        reject({
          success: false,
          status: 404,
          message: "User does Exists",
        });
      }
    }, 3000);
  });
};
