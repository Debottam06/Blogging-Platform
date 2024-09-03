const express = require("express");
const router = express.Router();

const {getAllUser,registerController,loginController}=require("../controllers/userController");

router.get('/all-user',getAllUser);
router.post("/register",registerController);
router.post('/login',loginController);


module.exports = router;