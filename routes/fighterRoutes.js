const { Router } = require("express");
const FighterService = require("../services/fighterService");
const { responseMiddleware } = require("../middlewares/response.middleware");
const {
  createFighterValid,
  updateFighterValid
} = require("../middlewares/fighter.validation.middleware");
const { error } = require("../services/service");

const router = Router();

// TODO: Implement route controllers for fighter
router.get(
  "/",
  (req, res, next) => {
    const fighters = FighterService.getFighters();
    if (fighters) {
      req.body = fighters;
      next();
    } else {
      res.status(200).json({ meta: "No fighters" });
    }
  },
  (req, res) => {
    res.status(200).json({ meta: "Fighters", data: req.body });
  }
);

router.get(
  "/:id",
  (req, res, next) => {
    const fighter = FighterService.getFighter({ id: req.params.id });
    if (fighter) {
      req.body = fighter;
      next();
    } else {
      res.status(404).json(error("Fighter not found"));
    }
  },
  (req, res) => {
    res.status(200).json({ meta: "Fighter", data: req.body });
  }
);

router.post(
  "/",
  createFighterValid,
  (req, res, next) => {
    const fighter = FighterService.create(req.body);
    if (fighter) {
      req.body = fighter;
      next();
    } else {
      res.status(400).json(error("Create fighter error"));
    }
  },
  (req, res) => {
    res.status(200).json({ meta: "Fighter created", data: req.body });
  }
);

router.put(
  "/:id",
  (req, res, next) => {
    const fighter = FighterService.getFighter({ id: req.params.id });
    if (fighter) {
      next();
    } else {
      res.status(404).json(error("Fighter not found"));
    }
  },
  updateFighterValid,
  (req, res, next) => {
    const fighter = FighterService.updateFighter(req.params.id, req.body);
    if (fighter) {
      req.body = fighter;
      next();
    } else {
      res.status(400).json(error("Update fighter error"));
    }
  },
  (req, res) => {
    res.status(200).json({ meta: "Fighter updated", data: req.body });
  }
);

router.delete(
  "/:id",
  (req, res, next) => {
    const fighter = FighterService.deleteFighter({ id: req.params.id });
    if (fighter) {
      req.body = fighter;
      next();
    } else {
      res.status(404).json(error("Fighter not found"));
    }
  },
  (req, res) => {
    res.status(200).json({ meta: "Fighter deleted", data: req.body });
  }
);

module.exports = router;
