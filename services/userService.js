const { UserRepository } = require("../repositories/userRepository");

class UserService {
  // TODO: Implement methods to work with user
  getUsers() {
    const users = UserRepository.getAll();

    if (users.length) return users;

    return null;
  }

  getUser(id) {
    const user = UserRepository.getOne(id);

    if (user) return user;

    return null;
  }

  createUser(data) {
    const user = UserRepository.create(data);

    if (user) return user;

    return null;
  }

  updateUser(id, data) {
    const user = UserRepository.update(id, data);

    if (user) return user;

    return null;
  }

  deleteUser(id) {
    const user = UserRepository.delete(id);

    if (user) return user;

    return null;
  }
}

const clearUser = ({ id, password, ...other }) => other;

exports.UserService = new UserService();
exports.clearUser = clearUser;
