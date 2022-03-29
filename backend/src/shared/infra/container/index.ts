import { container } from "tsyringe";
import { IMessagesRepository } from "../../../modules/messages/repositories/IMessagesRepository";
import { MessagesRepository } from "../../../modules/messages/repositories/implementations/MessagesRepository";
import { RequestsToBeAFriendRepository } from "../../../modules/users/repositories/implementations/RequestsToBeAFriendRepository";
import { UsersRepository } from "../../../modules/users/repositories/implementations/UsersRepository";
import { IRequestsToBeAFriendRepository } from "../../../modules/users/repositories/IRequestsToBeAFriendRepository";
import { IUsersRepository } from "../../../modules/users/repositories/IUsersRepository";

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IMessagesRepository>(
  "MessagesRepository",
  MessagesRepository
)

container.registerSingleton<IRequestsToBeAFriendRepository>(
  "RequestsToBeAFriendRepository",
  RequestsToBeAFriendRepository
)