import { Router } from "express";
import { validateSchema } from "../middlewares/validationSchema.middleware.js";
import { signUpSchema } from "../schemas/users.schemas.js";
import { signup } from "../controllers/users.controllers.js";

const usersRouter = Router();

usersRouter.post("/signup", validateSchema(signUpSchema), signup);

export default usersRouter;