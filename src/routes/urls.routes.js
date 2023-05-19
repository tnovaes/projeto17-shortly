import { Router } from "express";
import { validateSchema } from "../middlewares/validationSchema.middleware.js";
import { urlSchema } from "../schemas/urls.schemas.js";
import { validateToken } from "../middlewares/validationToken.middleware.js";
import { deleteUrl, getUrl, urlShorten, visitUrl } from "../controllers/urls.controllers.js";

const urlsRouter = Router();

urlsRouter.post("/urls/shorten", validateToken, validateSchema(urlSchema), urlShorten);
urlsRouter.get("/urls/:id", getUrl);
urlsRouter.get("/urls/open/:shortUrl", visitUrl);
urlsRouter.delete("/urls/:id", validateToken, deleteUrl);

export default urlsRouter;