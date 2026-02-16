import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { auth } from "../firebase/index.js";

export const googleAuth = async (req, res) => {
  try {
    const { token } = req.body;

    console.log("🔥 VERIFY START");

    const decoded = await auth.verifyIdToken(token);

    console.log("🔥 USER =>", decoded);

    res.json({
      success: true,
      user: decoded,
    });
  } catch (err) {
    console.log("🔥🔥🔥 BACKEND ERROR =>", err);
    res.status(500).json({ error: "Token verification failed" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(400).json({
      message: "User not found",
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({
      message: "Invalid password",
    });
  }

  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "12h" }
  );

  res.status(200).json({
    status: 200,
    message: "login successful",
    success: true,
    token,
  });
};

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;


    let user = await User.findOne({ email });

if (!user) {
   // SIGNUP automatically
   user = await User.create({
      name,
      email,
      picture,
      provider: "google"
   });
}

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      user: { id: newUser._id, name: newUser.name, email: newUser.email },
    });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



// export const googleAuth = async (req, res) => {
//   try {
//     const { token } = req.body;

//     // 1️⃣ Verify Firebase ID token
//     const decoded = await admin.auth().verifyIdToken(token);

//     const { name, email, picture } = decoded;

//     // 2️⃣ Check user in DB
//     let user = await User.findOne({ email });

//     // 3️⃣ If not exists → create (Signup)
//     if (!user) {
//       user = await User.create({
//         name,
//         email,
//         picture,
//         provider: "google",
//       });
//     }

//     // 4️⃣ Generate JWT
//     const jwtToken = jwt.sign(
//       { id: user._id },
//       process.env.JWT_SECRET,
//       { expiresIn: "7d" }
//     );

//     res.json({
//       message: "Google authentication successful",
//       token: jwtToken,
//       user,
//     });

//   } catch (error) {
//     res.status(500).json({ message: "Google authentication failed" });
//   }
// };











