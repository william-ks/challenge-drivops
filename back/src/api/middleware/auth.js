const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  // have token ?
  if (!authorization) {
    return res.status(401).json({ messages: "Invalid token." });
  }

  const token = authorization.split(" ")[1];

  try {
    const decryptedToken = jwt.verify(token, process.env.JWT_PASS);

    if (!decryptedToken) {
      return res.status(401).json({ messages: "Invalid token." });
    }

    next();
  } catch (e) {
    if (e) {
      return res.status(401).json({ messages: "Invalid token." });
    }
  }
};

module.exports = auth;
