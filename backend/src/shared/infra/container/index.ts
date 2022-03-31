import { container } from "tsyringe";
import "./providers";
import { IMessagesRepository } from "../../../modules/messages/repositories/IMessagesRepository";
import { MessagesRepository } from "../../../modules/messages/repositories/implementations/MessagesRepository";
import { IFriendsRepository } from "../../../modules/users/repositories/IFriendsRepository";
import { FriendsRepository } from "../../../modules/users/repositories/implementations/FriendsRepository";
import { RequestsToBeAFriendRepository } from "../../../modules/users/repositories/implementations/RequestsToBeAFriendRepository";
import { UsersRepository } from "../../../modules/users/repositories/implementations/UsersRepository";
import { UsersTokensRepository } from "../../../modules/users/repositories/implementations/UsersTokensRepository";
import { IRequestsToBeAFriendRepository } from "../../../modules/users/repositories/IRequestsToBeAFriendRepository";
import { IUsersRepository } from "../../../modules/users/repositories/IUsersRepository";
import { IUsersTokensRepository } from "../../../modules/users/repositories/IUsersTokensRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IMessagesRepository>(
  "MessagesRepository",
  MessagesRepository
);

container.registerSingleton<IRequestsToBeAFriendRepository>(
  "RequestsToBeAFriendRepository",
  RequestsToBeAFriendRepository
);

container.registerSingleton<IFriendsRepository>(
  "FriendsRepository",
  FriendsRepository
);

container.registerSingleton<IUsersTokensRepository>(
  "UsersTokensRepository",
  UsersTokensRepository
);