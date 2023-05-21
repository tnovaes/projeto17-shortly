import { Router } from "express";
import { validateToken } from "../middlewares/validationToken.middleware.js";
import { getRanking, getUserData } from "../controllers/users.controllers.js";

const usersRouter = Router();

usersRouter.get("/users/me", validateToken, getUserData);
usersRouter.get("/ranking", getRanking);

export default usersRouter;