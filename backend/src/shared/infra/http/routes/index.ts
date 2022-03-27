import { Router } from "express";
import { messageRoutes } from "./message.routes";
import { userRoutes } from "./user.routes";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/messages", messageRoutes);

export { routes };