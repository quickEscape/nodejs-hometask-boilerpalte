const { user } = require("../models/user");
const { error } = require("../services/service");

const createUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during creation
  const err = validateUser(req.body, user);
  if (err.error) {
    res.status(400).json(err);
  } else {
    next();
  }
};

const updateUserValid = createUserValid;

const userFieldError = (field) => error(`User ${field} is invalid value`);

const validateUser = (userData, userModel) => {
  for (const key of Object.keys(userData)) {
    if (userModel[key] === undefined) {
      return error("User have excessive field");
    } else {
      switch (key) {
        case "firstName":
        case "lastName":
        case "password":
          if (userData[key].length < 3) {
            return userFieldError(key);
          }
        case "email":
          if (!/^\w+([\.-]?\w+)*@gmail.com$/.test(userData[key])) {
            return userFieldError(key);
          }
        case "phoneNumber":
          if (!/^\+380\d{9}/.test(userData[key])) {
            return userFieldError(key);
          }
      }
    }

    return { error: false };
  }
};

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;
