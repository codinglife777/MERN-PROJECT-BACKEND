const User = require("../models/user-model");
const mongoose = require("mongoose");

class UserController {
  static async get(_id) {
    return await User.findById(_id);
  }

  static async set(user) {
    try {
      const editUser = await User.findByIdAndUpdate(user._id, user, {
        new: true,
      });
      return editUser;
    } catch (err) {
      console.log(err);
    }
  }

  static async addUser(user) {
    const { username, name, email, password } = user;
    return await UserController.add(username, name, email, password);
  }

  static async add(username, name, email, password) {
    try {
      const newUser = await User.create({ username, name, email, password });
      return newUser;
    } catch (err) {
      throw err;
    }
  }

  static async delete(id) {
    const deleteUser = await User.findByIdAndRemove(id);
    return deleteUser;
  }
  static async list() {
    return await User.find();
  }
  static async findByEmail(email) {
    return await User.findOne({ email });
  }
  static async findByUsername(username) {
    return await User.findOne({ username });
  }
}


module.exports = UserController;
