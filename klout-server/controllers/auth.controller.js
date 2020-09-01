const userController = require('../controllers/user.controller');
const LogController = require('./log.controller');

const bcrypt = require('bcryptjs');

class authController {
	static async login(_email, _password) {
		const userLogin = await userController.findOne({ email: _email });
		if (!userLogin) {
			throw 'Email is not registered. Try and other email.';
		} else if (bcrypt.compare(_password, userLogin.passwordHash)) {
			const userWallet = await walletController.getByUserId(userLogin._id);
			await this.registerLog(userLogin, 'Login');
			return { userLogin, userWallet };
		} else {
			throw 'Password incorrect. Try again.';
		}
	}
	static async signUp(_name, _email, _password) {
		try {
			const { newUser, newWallet } = await userController.add({
				name: _name,
				email: _email,
				passwordHash: _password,
				imgPath:
					'https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/avat-01-512.png',
				imgName: 'avatar',
	
			});
			await this.registerLog(newUser, 'Registered new user');
			return { newUser, newWallet };
		} catch (err) {
			throw err;
		}
	}
	static async logout(_user) {
		try {
			const logoutUser = await userController.get(_user);
			await this.registerLog(logoutUser, 'Logout user');
			return newUser;
		} catch (err) {
			throw err;
		}
	}
	static async registerLog(_user, _action) {
		await LogController.register(`${_action} user ${_user._id}`, _user._id);
	}
}

module.exports = authController;