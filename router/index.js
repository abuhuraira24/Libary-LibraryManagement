const router = require("express").Router();

const { emailVefification } = require("../controlller/emailVerification");

const { userActive } = require("../controlller/userActive");

router.post("/verify", emailVefification);
router.post("/activeUser", userActive);

module.exports = router;
