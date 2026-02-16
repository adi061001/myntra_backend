import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      unique: true
    },

    password: {
      type: String,
      
    },

    firebaseUID: {
      type: String,
      default: null
    },

    picture: {
      type: String,
      default: null
    },

    provider: {
      type: String,
      enum: ["local", "google"],
      default: "local"
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
