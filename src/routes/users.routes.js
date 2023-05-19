import { Router } from "express";
import { validateSchema } from "../middlewares/validationSchema.middleware.js";
import { signInSchema, signUpSchema } from "../schemas/users.schemas.js";
import { signIn, signup } from "../controllers/users.controllers.js";

const usersRouter = Router();

usersRouter.post("/signup", validateSchema(signUpSchema), signup);
usersRouter.post("/signin", validateSchema(signInSchema), signIn);

export default usersRouter;