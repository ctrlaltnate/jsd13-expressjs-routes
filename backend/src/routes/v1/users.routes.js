import express from "express";

import {users} from "../../fakeDB/fakeUsers.js";

const router = express.Router();

// READ users
router.get("/", (req, res) => {
  res.json(users);
});

// CREATE users
router.post("/", (req, res) => {
  const {username, email, password} = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({
      error: "Missing required fields, Please provide username, email, and password",
    });
  }

  const highestId = users.reduce(
    (max, user) => Math.max(max, Number(user.id)),
    0,
  );

  const newUser = {
    id: String(highestId + 1),
    username,
    email,
    password,
  };
  users.push(newUser);

  return res.status(201).json(newUser);
});

// UPDATE users
router.put("/:id", (req, res) => {});

// DELETE users
router.delete("/:id", (req, res) => {});

export default router;