const express = require('express');
const { userSignUp, userLogin } = require("../controllers/authController");
const router = express.Router();

//adding our authentification routes
router.post('/signup', userSignUp);

router.post('/login', userLogin);

module.exports = router;