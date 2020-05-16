const { FighterRepository } = require("../repositories/fighterRepository");

class FighterService {
  // TODO: Implement methods to work with fighters
  getFighters() {
    const fighters = FighterRepository.getAll();

    if (fighters.length) return fighters;

    return null;
  }

  getFighter(id) {
    const fighter = FighterRepository.getOne(id);

    if (fighter) return fighter;

    return null;
  }

  createFighter(data) {
    const fighter = FighterRepository.create(data);

    if (fighter) return fighter;

    return null;
  }

  updateFighter(id, data) {
    const fighter = FighterRepository.update(id, data);

    if (fighter) return fighter;

    return null;
  }

  deleteFighter(id) {
    const fighter = FighterRepository.delete(id);

    if (fighter) return fighter;

    return null;
  }
}

module.exports = new FighterService();
