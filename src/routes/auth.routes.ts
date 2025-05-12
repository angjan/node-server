import { Router } from "express";
import { registerUser } from "../controllers/auth.controller";
import { validate } from "../middlewares/validate";
import { registerSchema } from "../schemas/auth.schema";

const router = Router();

router.post("/register", validate(registerSchema), registerUser);

export default router;
