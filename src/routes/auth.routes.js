import { Router } from "express";
import { validateSchema } from "../middlewares/validationSchema.middleware.js";
import { signInSchema, signUpSchema } from "../schemas/auth.schemas.js";
import { signin, signup } from "../controllers/auth.controllers.js";

const authRouter = Router();

authRouter.post("/signup", validateSchema(signUpSchema), signup);
authRouter.post("/signin", validateSchema(signInSchema), signin);

export default authRouter;