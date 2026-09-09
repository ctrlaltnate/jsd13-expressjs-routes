import {Router} from "express";

import usersRouter from "./users.routes.js";

export const router = Router();

router.use("/users", usersRouter);

export default router;


