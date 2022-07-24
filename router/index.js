const router = require("express").Router();

const { verifyAccount } = require("../controlller/sendMail");

const { userActive } = require("../controlller/userActive");

const { forgotPassword } = require("../controlller/forgetPassword");

const { recoveryPassword } = require("../controlller/recoveryPassword");

router.post("/verify", verifyAccount);
router.post("/activeUser", userActive);
router.post("/forgotpassword", forgotPassword);
router.post("/recoverypassword", recoveryPassword);

module.exports = router;
