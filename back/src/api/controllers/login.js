const db = require("../../database/dbConect");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, pass: userPass } = req.body;

  try {
    // validate email
    const dbResponse = await db("managers").where({ email });

    if (dbResponse.length < 1) {
      return res.status(400).json({ menssage: "Wrong password and/or email." });
    }

    // validate pass
    const validPass = await bcrypt.compare(userPass, dbResponse[0].pass);

    if (!validPass) {
      return res.status(400).json({ message: "Invalid password or email." });
    }

    // generate token
    const token = jwt.sign({ id: dbResponse[0].id }, process.env.JWT_PASS);

    // response token and username
    const response = {
      name: dbResponse[0].name,
      token,
    };

    return res.status(200).json(response);
  } catch (e) {
    return res.status(500).json({message: 'Server error.'});
  }
};

module.exports = login;
