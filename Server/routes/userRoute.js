const express = require('express');
const router = express.Router();
const { fetchUsers, fetchSingleUser, updateUser } = require("../controllers/userController");

//adding user routes
router.get('/users', fetchUsers);
router.get('/profile/:id', fetchSingleUser);
router.put('/profile/update/:id', updateUser);

module.exports = router;