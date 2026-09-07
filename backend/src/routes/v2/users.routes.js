import { Router } from "express";
import mongoose from "mongoose";
import { User } from "../../models/users.model.js";
const router = Router();

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
router.post("/", async(req, res ,next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        error:
          "Missing required fields, Please provide username, email, and password",
      });
    }

    const newUser = await User.create({ username, email, password });
    const { password: _password, ...userWithoutPassword } = newUser.toObject();
    return res.status(201).json(userWithoutPassword);

  } catch (err) {
    next(err);
  }
});

// Update users
router.put("/:id", async (req, res, next) => {
  try {
    

    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
    }).select("-password");

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
    

    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
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
