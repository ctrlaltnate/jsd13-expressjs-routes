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
router.put("/:id", (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
});

// Delete users
router.delete("/:id", (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
});

export default router;
