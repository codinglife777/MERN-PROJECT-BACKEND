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
  static async checkEmail(email) {
		return await User.findOne({ email });
  }
  static async checkUsername(username) {
		return await User.findOne({ username });
  }
  static async checkEmailUser(email, id) {
		return await User.findOne({
			email: { $eq: email },
			_id: { $ne: id },
		});
  }
  static async checkUsernameUser(username, id) {
		return await User.findOne({
			username: { $eq: username },
			_id: { $ne: id },
		});
	}
}

module.exports = UserController;
