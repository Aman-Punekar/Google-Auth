const url = require("url");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { urlGoogle, getGoogleAccountFromCode } = require("../lib/googleAuthHelper");
const { isMember } = require("../lib/utils");
const JWT_AUTH_TOKEN = process.env.JWT_AUTH_TOKEN;

/**
 * creates token with email in the payload with the given expiry
 */

const createToken = (email) => {
  const accessToken = jwt.sign(
    {
      email: email,
    },
    JWT_AUTH_TOKEN,
    {
      expiresIn: "1d",
    }
  );
};

/*
This is a getSignupRoute. On invoking this route it returns a 
route which directs to google sign in page */

const getSignupRoute = (req, res) => {
  try {
    const url = urlGoogle();
    res.status(200).send({ url });
  } catch (err) {
    res.status(500).send({ err });
  }
};

/*
On successful authentication from google this route is invoked in the callback of google authentication.
The authentication token is attached to the code field in the route.
The function extracts that code and passes to getGoogleAccountFromCode.
getGoogleAccountFromCode using the token extracts googgleId, gmail and returns the same

The email is looked in the db for checking whether he is already a member. If he is not {msg:1, mail : userInfo.email}
is sent. msg = 1 signifies he is a first time user. msg = 0 tells he is already a member. 
Accordingly the user can be routed
 */
const getmail = async (req, res) => {
  try {
    var q = url.parse(req.baseurl, true);
    var qdata = q.query;
    var code = qdata.code;
    const userInfo = getGoogleAccountFromCode(code);
    const ans = await isMember(userInfo.email);  
    if (ans)
      res.status(200).send({
        msg: 1,
        mail: userInfo.email,
        token: createToken(userInfo.email),
      });
    else res.status(200).send({ msg: 0, token: createToken(userInfo.email) });
  } catch (err) {
    res.status(500).send({ err });
  }
};

module.exports = { getSignupRoute, getmail };
