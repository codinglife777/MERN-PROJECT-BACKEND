const User = require("../models/User.model");
const mongoose = require("mongoose");
class UserController {
  static async get(id) {
    return await User.findById(id);
  }
  static async set(user) {
    const editUser = await User.findByIdAndUpdate(user._id, user, {
      new: true,
    });
    return editUser;
  }
  static async addUser(user) {
    const { username, name, email, password, googleID } = user;
    return await UserController.add(username, name, email, password, googleID);
  }
  static async add(username, name, email, password, googleID) {
    const newUser = await User.create({
      username,
      name,
      email,
      password,
      googleID,
    });
    return newUser;
  }
  static async setImage(id, image) {
    const editUser = await User.findByIdAndUpdate(
      id,
      { image },
      {
        new: true,
      }
    );
    return editUser;
  }
  static async delete(id) {
    const delUser = await User.findByIdAndRemove(id);
    return delUser;
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
  static async findByGoogleID(googleID) {
    return await User.findOne({ googleID });
  }
  static async checkEmail(email) {
    return await User.findOne({ email });
  }
  static async checkEmailDifferentUser(email, id) {
    return await User.findOne({
      email: { $eq: email },
      _id: { $ne: id },
    });
  }
  static async checkUsername(username) {
    return await User.findOne({ username });
  }
  static async checkUsernameDifferentUser(username, id) {
    return await User.findOne({
      username: { $eq: username },
      _id: { $ne: id },
    });
  }
}
module.exports = UserController;
