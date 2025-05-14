import { Router } from "express";
import {
  loginUserAuthentication,
  registerUser,
} from "../controllers/auth.controller";
import { validate } from "../middlewares/validate";
import { loginSchema, registerSchema } from "../schemas/auth.schema";

const router = Router();

router.post("/register", validate(registerSchema), registerUser);
router.post("/login", validate(loginSchema), loginUserAuthentication);

export default router;
