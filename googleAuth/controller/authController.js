

const admin = require("../config/firebase");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.googleLogin = async (req, res) => {
  try {
    const { token } = req.body;

    const decodedToken = await admin.auth().verifyIdToken(token);

    const { uid, name, email, picture } = decodedToken;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        picture,
        firebaseUID: uid,
      });
    }

    const myToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      token: myToken,
      user,
    });

  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid Firebase Token",
    });
  }
};


module.exports=googlelogin