import mongoose from "mongoose";
import bcrypt from "bcrypt";
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
  role: {type:String, enum:["user","admin"], default:"user"},
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"],
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

// Hash password before saving to db
userSchema.pre("save", async function()
{
  if(!this.isModified("password")) return;

  const saltRounds = 12;
  this.password = await bcrypt.hash(this.password,saltRounds)
})

export const User = mongoose.model("User", userSchema);
