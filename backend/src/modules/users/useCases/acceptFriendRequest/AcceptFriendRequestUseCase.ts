import { inject, injectable } from "tsyringe";
import { IFriendsRepository } from "../../repositories/IFriendsRepository";
import { IRequestsToBeAFriendRepository } from "../../repositories/IRequestsToBeAFriendRepository";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { FriendRequestAlreadyAccepted } from "./errors/FriendRequestAlreadyAccepted";

interface IRequest {
  requested_id: string;
  requester_email: string;
}

@injectable()
export class AcceptFriendRequestUseCase {
  constructor (
    @inject("RequestsToBeAFriendRepository")
    private requestsToBeAFriendRepository: IRequestsToBeAFriendRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("FriendsRepository")
    private friendsRepository: IFriendsRepository
  ) {}

  async execute({ requested_id, requester_email }: IRequest) {
    const requester = await this.usersRepository.findByEmail(requester_email);

    const friendRequest = await this.requestsToBeAFriendRepository.findByRequesterIdAndRequestedId({
      requester_id: requester.id,
      requested_id
    });

    if (friendRequest.confirmation_date) {
      throw new FriendRequestAlreadyAccepted();
    }

    await this.requestsToBeAFriendRepository.updateConfirmationDate(friendRequest.id);

    await this.friendsRepository.create({
      user_id: requested_id,
      friend_id: requester.id
    });

    return;
  }
}