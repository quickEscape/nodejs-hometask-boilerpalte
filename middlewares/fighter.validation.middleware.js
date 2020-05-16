const { fighter } = require("../models/fighter");
const { error } = require("../services/service");

const createFighterValid = (req, res, next) => {
  // TODO: Implement validatior for fighter entity during creation
  const err = validateFighter(req.body, fighter);
  if (err.error) {
    res.status(400).json(err);
  } else {
    next();
  }
};

const updateFighterValid = createFighterValid;

const validateFighter = (fighterData, fighterModel) => {
  for (const key of Object.keys(fighterData)) {
    if (fighterModel[key] === undefined) {
      return error("Fighter have excessive field");
    } else if (key === "power" && (fighterData[key] > 99 || fighterData[key] < 0)) {
      return error(`Fighter ${key} is invalid value`);
    }

    return { error: false };
  }
};

exports.createFighterValid = createFighterValid;
exports.updateFighterValid = updateFighterValid;
