const express = require('express');
const router = express.Router();

const passport = require('passport');
const bcrypt = require('bcryptjs');
const uploadCloud = require('../configs/cloudinary.config');
const UserController = require('../controllers/user.controller');

router.post('/login', (req, res, next) => {});

router.post('/signup', async (req, res, next) => {});

router.post('/logout', (req, res, next) => {});

