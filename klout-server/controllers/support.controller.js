const Support = require('../models/support-model');
const LogController = require('../controllers/log-controller');

class SupportController {
	static async get(_id) {
		return await Support.findById(_id);
	}

	static async set(_support) {
		const editSupport = await Support.findByIdAndUpdate(
			_support._id,
			_support,
			{
				new: true,
			}
		);
		if (editSupport) {
			await this.registerLog(editSupport, 'Editing');
		}
		return editSupport;
	}

	static async add(_support) {
		try {
			const newSupport = await Support.create(_support);
			await this.registerLog(newSupport, 'New');
			return newSupport;
		} catch (err) {
			throw err;
		}
	}

	static async delete(_id) {
		const delSupport = await Support.findByIdAndRemove(_id);
		if (delSupport) {
			await this.registerLog(delSupport, 'Deleting');
		}
		return delSupport;
	}

	static async listByUser(_userId) {
		return await Support.find({ user: _userId });
	}

	static async findOne(_filter) {
		return await Support.findOne(_filter);
	}
	static async registerLog(_support, _action) {
		await LogController.register(
			`${_action} support ${_support._id}`,
			_support.user
		);
	}
}

module.exports = SupportController;