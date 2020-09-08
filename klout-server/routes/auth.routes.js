const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const uploadCloud = require('../configs/cloudinary.config');
const UserController = require('../controllers/user.controller');

router.post('/login', (req, res, next) => {
	passport.authenticate('local', (err, user, failureDetails) => {
		if (err) {
			res
				.status(500)
				.json({ message: `Quelcom no ha funcionat correctament.` });
			return;
		}
		if (!user) {
			res.status(401).json(failureDetails);
			return;
		}
		req.login(user, (loginErr) => {
			if (loginErr) {
				res.status(500).json({ message: `Sessió no grabada correctament` });
				return;
			}
			res.status(200).json(user);
		});
	})(req, res, next);
});

router.get(
	'/google',
	passport.authenticate('google', {
		scope: ['profile', 'email'],
	})
);

router.get(
	'/google/callback',
	passport.authenticate('google', {
		successRedirect: process.env.BASE_APP_URL + '/',
		failureRedirect: process.env.BASE_APP_URL + '/login',
	})
);

router.post('/signup', async (req, res, next) => {
	const { username, name, email, password } = req.body;
	if (!username || !password) {
		res.status(400).json({ message: `Proporciona usuari i clau d'accés` });
		return;
	}
	if (password.length < 7) {
		res.status(400).json({
			message: `La clau d'accés ha de tenir minim 8 caracters.`,
		});
		return;
	}
	let foundUser = await UserController.checkUsername(username);
	if (foundUser) {
		res.status(400).json({ message: 'Usuari existent. Utilitza un altre.' });
		return;
	} else {
		foundUser = await UserController.checkEmail(email);
		if (foundUser) {
			res.status(400).json({ message: 'Correu existent. Utilitza un altre.' });
			return;
		} else {
			try {
				const salt = bcrypt.genSaltSync(10);
				const hashPass = bcrypt.hashSync(password, salt);
				const newUser = await UserController.add(
					username,
					name,
					email,
					hashPass
				);
				req.login(newUser, (err) => {
					if (err) {
						res.status(500).json({
							message: `Autenticació després de l'alta no ha funcionat correctament.`,
						});
						return;
					}
					res.status(200).json(newUser);
				});
			} catch (err) {
				res.status(400).json({
					message: `L'alta no ha funcionat correctament. Torna a intentar-ho en breus minuts.`,
				});
				return;
			}
		}
	}
});

router.post('/logout', (req, res, next) => {
	req.logout();
	res.status(200).json({ message: 'Ok' });
});
router.post('/loggedin', (req, res, next) => {
	if (req.isAuthenticated()) {
		// res.status(200).json(req.user);
		res.status(200).json({ message: 'Usuari autenticat' });
		return;
	}
	res.status(403).json({ message: 'No autoritzat' });
});

module.exports = router;
