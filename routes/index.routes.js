const { Router } = require("express");
const router = Router();

const login = require("../controllers/login")

// login and users
router.post("/api/login", login.form);

router.post("/api/addUser", login.makeUser);

router.post("/api/updateUser", login.updateUser);

router.post("/api/deleteUser", login.deletUser);

router.post("/api/token", login.userToken);

router.post("/api/exists", login.userEmailExist);

module.exports = router;