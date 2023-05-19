import { Router } from "express";
import { validateSchema } from "../middlewares/validationSchema.middleware.js";
import { urlSchema } from "../schemas/urls.schemas.js";
import { validateToken } from "../middlewares/validationToken.middleware.js";
import { urlShorten } from "../controllers/urls.controllers.js";

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", validateToken, validateSchema(urlSchema), urlShorten);

export default urlsRouter;