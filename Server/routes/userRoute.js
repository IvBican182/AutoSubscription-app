const express = require('express');
const router = express.Router();
const { fetchUsers, fetchSingleUser, updateUser } = require("../controllers/userController");
const { verifyToken } = require("../middleware/authToken")

//adding user routes
router.get('/users', fetchUsers);
router.get('/profile/:id', fetchSingleUser);
router.put('/profile/update/:id',verifyToken, updateUser);

module.exports = router;