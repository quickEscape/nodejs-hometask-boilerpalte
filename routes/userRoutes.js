const { Router } = require("express");
const { UserService } = require("../services/userService");
const { createUserValid, updateUserValid } = require("../middlewares/user.validation.middleware");
const { responseMiddleware } = require("../middlewares/response.middleware");
const { error } = require("../services/service");

const router = Router();
// TODO: Implement route controllers for user
router.get(
  "/",
  (req, res, next) => {
    const users = UserService.getUsers();
    if (users) {
      req.body = users.map(clearUser);
      next();
    } else {
      res.status(200).json({ meta: "No users" });
    }
  },
  (req, res) => {
    res.status(200).json({ meta: "Users", data: req.body });
  }
);

router.get(
  "/:id",
  (req, res, next) => {
    const user = UserService.getUser({ id: req.params.id });
    if (user) {
      req.body = clearUser(user);
      next();
    } else {
      res.status(404).json(error("User not found"));
    }
  },
  (req, res) => {
    res.status(200).json({ meta: "User", data: req.body });
  }
);

router.post(
  "/",
  createUserValid,
  (req, res, next) => {
    const user = UserService.create(req.body);
    if (user) {
      req.body = clearUser(user);
      next();
    } else {
      res.status(400).json(error("Create user error"));
    }
  },
  (req, res) => {
    res.status(200).json({ meta: "User created", data: req.body });
  }
);

router.put(
  "/:id",
  (req, res, next) => {
    const user = UserService.getUser({ id: req.params.id });
    if (user) {
      next();
    } else {
      res.status(404).json(error("User not found"));
    }
  },
  updateUserValid,
  (req, res, next) => {
    const user = UserService.updateUser(req.params.id, req.body);
    if (user) {
      req.body = clearUser(user);
      next();
    } else {
      res.status(400).json(error("Update user error"));
    }
  },
  (req, res) => {
    res.status(200).json({ meta: "User updated", data: req.body });
  }
);

router.delete(
  "/:id",
  (req, res, next) => {
    const user = UserService.deleteUser({ id: req.params.id });
    if (user) {
      req.body = clearUser(user);
      next();
    } else {
      res.status(404).json(error("User not found"));
    }
  },
  (req, res) => {
    res.status(200).json({ meta: "User deleted", data: req.body });
  }
);

module.exports = router;
