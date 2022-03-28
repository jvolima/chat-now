import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../../users/repositories/IUsersRepository";
import { IMessagesRepository } from "../../repositories/IMessagesRepository";
import { FriendNotFound } from "./errors/FriendNotFound";

interface IRequest {
  user_id: string;
  friend_email: string;
}

@injectable()
export class ListMessagesWithAFriendUseCase {
  constructor (
    @inject("MessagesRepository")
    private messagesRepository: IMessagesRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ user_id, friend_email }: IRequest) {
    const friend = await this.usersRepository.findByEmail(friend_email);

    if(!friend) {
      throw new FriendNotFound();
    }

    const messagesShared = await this.messagesRepository.listMessagesWithAFriend(
      user_id,
      friend.id
    );

    return messagesShared;
  }
}