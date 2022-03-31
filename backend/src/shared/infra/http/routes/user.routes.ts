import { Router } from "express";
import { AcceptFriendRequestController } from "../../../../modules/users/useCases/acceptFriendRequest/AcceptFriendRequestController";
import { AuthenticateUserController } from "../../../../modules/users/useCases/authenticateUser/AuthenticateUserController";
import { CreateFriendRequestController } from "../../../../modules/users/useCases/createFriendRequest/CreateFriendRequestController";
import { CreateUserController } from "../../../../modules/users/useCases/createUser/CreateUserController";
import { ListFriendRequestsController } from "../../../../modules/users/useCases/listFriendRequests/ListFriendRequestsController";
import { ListFriendsController } from "../../../../modules/users/useCases/listFriends/ListFriendsController";
import { RefreshTokenController } from "../../../../modules/users/useCases/refreshToken/RefreshTokenController";
import { RefuseFriendRequestController } from "../../../../modules/users/useCases/refuseFriendRequest/RefuseFriendRequestController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const userRoutes = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenController();
const createFriendRequestController = new CreateFriendRequestController();
const acceptFriendRequestController = new AcceptFriendRequestController();
const refuseFriendRequestController = new RefuseFriendRequestController();
const listFriendRequestsController = new ListFriendRequestsController();
const listFriendsController = new ListFriendsController();

userRoutes.post("/create", createUserController.handle);
userRoutes.post("/session", authenticateUserController.handle);
userRoutes.post("/refresh-token", refreshTokenController.handle);
userRoutes.post("/friend-request/create", ensureAuthenticated, createFriendRequestController.handle);
userRoutes.put("/friend-request/accept", ensureAuthenticated, acceptFriendRequestController.handle);
userRoutes.delete("/friend-request/refuse", ensureAuthenticated, refuseFriendRequestController.handle);
userRoutes.get("/friend-request/list", ensureAuthenticated, listFriendRequestsController.handle);
userRoutes.get("/friends", ensureAuthenticated, listFriendsController.handle);

export { userRoutes };