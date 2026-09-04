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


// Update users
router.put("/:id", (req, res, next) => {
  try {
    const user = users.find((u) => u.id === req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ error: "username, email and password are required!" });
    }

    user.username = username;
    user.email = email;
    user.password = password;

    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

// Delete users
router.delete("/:id", (req, res, next) => {
  try {
    const user = users.find((u) => u.id === req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }

    const index = users.indexOf(user);
    users.splice(index, 1);

    // const index = users.findIndex((u) => u.id === req.params.id);

    // if (index === -1) {
    //   return res.status(404).json({ error: "User not found!" });
    // }

    // users.splice(index, 1);

    return res.status(204).send();
  } catch (err) {
    next(err);
  }
});

export default router;