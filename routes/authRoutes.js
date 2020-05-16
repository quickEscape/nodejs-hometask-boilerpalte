const { Router } = require("express");
const AuthService = require("../services/authService");
const { responseMiddleware } = require("../middlewares/response.middleware");
const { error } = require("../services/service");
const { clearUser } = require("../services/userService");

const router = Router();

router.post(
  "/login",
  (req, res, next) => {
    try {
      // TODO: Implement login action (get the user if it exist with entered credentials)
      const user = AuthService.login({
        email: req.body.email,
        password: req.body.password
      });
      res.status(200).json({ meta: "Login successful", data: clearUser(user) });
    } catch (err) {
      res.status(403).json(error(err));
    } finally {
      next();
    }
  },
  responseMiddleware
);

module.exports = router;
