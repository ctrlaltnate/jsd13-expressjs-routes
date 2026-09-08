import {Router} from "express";

import usersRouter from "./users.routes.js";
import usersSupabaseRoutes from "./users.supabase.routes.js"

export const router = Router();

router.use("/users", usersRouter);
router.use("/users", usersSupabaseRoutes);

export default router;
