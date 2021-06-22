const express = require("express");
const router = express.Router();
const { getSignupRoute, 
        getmail } = require("../controllers/googleAuth");

router.get("/getAuthRoute",getSignupRoute);
router.get("/callbackRoute",getmail)

module.exports = router;