import { Router } from "express";
import { AcceptFriendRequestController } from "../../../../modules/users/useCases/acceptFriendRequest/AcceptFriendRequestController";
import { AuthenticateUserController } from "../../../../modules/users/useCases/authenticateUser/AuthenticateUserController";
import { CreateFriendRequestController } from "../../../../modules/users/useCases/createFriendRequest/CreateFriendRequestController";
import { CreateUserController } from "../../../../modules/users/useCases/createUser/CreateUserController";
import { RefuseFriendRequestController } from "../../../../modules/users/useCases/refuseFriendRequest/RefuseFriendRequestController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const userRoutes = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const createFriendRequestController = new CreateFriendRequestController();
const acceptFriendRequestController = new AcceptFriendRequestController();
const refuseFriendRequestController = new RefuseFriendRequestController();

userRoutes.post("/create", createUserController.handle);
userRoutes.post("/session", authenticateUserController.handle);
userRoutes.post("/create/friend-request", ensureAuthenticated, createFriendRequestController.handle);
userRoutes.post("/accept/friend-request", ensureAuthenticated, acceptFriendRequestController.handle);
userRoutes.post("/refuse/friend-request", ensureAuthenticated, refuseFriendRequestController.handle);

export { userRoutes };