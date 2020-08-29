const Network = require("../models/network-model");
const mongoose = require("mongoose");

class NetworkController {
  static async get(id) {
    return await Network.findById(id);
  }
  static async set(network) {
    try {
      const editNetwork = await Network.findByIdAndUpdate(
        network._id,
        network,
        {
          new: true,
        }
      );
      return editNetwork;
    } catch (err) {
      console.log(err);
    }
  }

  static async addNetwork(network) {
    const { username, password } = network;
    return await NetworkController.add(username, password);
  }
}

module.exports = NetworkController;
