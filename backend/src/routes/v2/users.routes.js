import { Router } from "express";
import mongoose from "mongoose";
import { User } from "../../models/users.model.js";
const router = Router();




/*****************BCRYPT FX*********************************************** */
import bcrypt from "bcrypt";

async function hashPassword(rawpass) {
  console.log(`raw pass : ${rawpass}`);
  const saltRounds = 12;
  const hashedpassword = await bcrypt.hash(rawpass, saltRounds); 
  console.log(`Hashed Password from Function : ${hashedpassword}`) 
  return hashedpassword
}
/**************************************************************** */



// READ users
router.get("/", async (req, res, next) => {
  try {
    const users = await User.find();
    return res.json(users);
  } catch (err) {
    next(err);
  }
});

// CREATE users
router.post("/", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        error:
          "Missing required fields, Please provide username, email, and password",
      });
    }
    const hpass = await hashPassword(password);
    const newUser = await User.create({ username, email, password:hpass });
    
    const safeUser = newUser.toObject();
    delete safeUser.password;
    return res.status(201).json(safeUser);
  } catch (err) {
    next(err);
  }
});


//***********  LOGIN   ******************************************/
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required",
      });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password,
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    const safeUser = user.toObject();
    delete safeUser.password;

    return res.status(200).json({
      message: "Login successful",
      user: safeUser,
    });
  } catch (err) {
    next(err);
  }
});
//***********************************************************/
// Update users
router.put("/:id", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ error: "username, email and password are required!" });
    }

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        username: username,
        email: email,
        password: password,
      },
      {
        new: true,
        runValidators: true,
      },
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
});

// Delete users
router.delete("/:id", async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    next(err);
  }
});

export default router;
