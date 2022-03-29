import { Router } from "express";
import { AcceptFriendRequestController } from "../../../../modules/users/useCases/acceptFriendRequest/AcceptFriendRequestController";
import { AuthenticateUserController } from "../../../../modules/users/useCases/authenticateUser/AuthenticateUserController";
import { CreateFriendRequestController } from "../../../../modules/users/useCases/createFriendRequest/CreateFriendRequestController";
import { CreateUserController } from "../../../../modules/users/useCases/createUser/CreateUserController";
import { ListFriendRequestsController } from "../../../../modules/users/useCases/listFriendRequests/ListFriendRequestsController";
import { RefuseFriendRequestController } from "../../../../modules/users/useCases/refuseFriendRequest/RefuseFriendRequestController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const userRoutes = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const createFriendRequestController = new CreateFriendRequestController();
const acceptFriendRequestController = new AcceptFriendRequestController();
const refuseFriendRequestController = new RefuseFriendRequestController();
const listFriendRequestsController = new ListFriendRequestsController();

userRoutes.post("/create", createUserController.handle);
userRoutes.post("/session", authenticateUserController.handle);
userRoutes.post("/friend-request/create", ensureAuthenticated, createFriendRequestController.handle);
userRoutes.put("/friend-request/accept", ensureAuthenticated, acceptFriendRequestController.handle);
userRoutes.delete("/friend-request/refuse", ensureAuthenticated, refuseFriendRequestController.handle);
userRoutes.get("/friend-request/list", ensureAuthenticated, listFriendRequestsController.handle);

export { userRoutes };