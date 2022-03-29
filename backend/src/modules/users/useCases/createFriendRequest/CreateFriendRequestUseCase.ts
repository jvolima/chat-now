import { inject, injectable } from "tsyringe";
import { IRequestsToBeAFriendRepository } from "../../repositories/IRequestsToBeAFriendRepository";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { RequestAlreadyExists } from "./errors/RequestAlreadyExists";
import { UserRequestedNotFound } from "./errors/UserRequestedNotFound";

interface IRequest {
  requester_id: string;
  requested_email: string;
}

@injectable()
export class CreateFriendRequestUseCase {
  constructor (
    @inject("RequestsToBeAFriendRepository")
    private requestsToBeAFriendRepository: IRequestsToBeAFriendRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ requester_id, requested_email }: IRequest) {
    const userRequested = await this.usersRepository.findByEmail(requested_email);

    if(!userRequested) {
      throw new UserRequestedNotFound();
    }

    const requestAlreadyExists = await this.requestsToBeAFriendRepository.findByRequesterIdAndRequestedId({
      requester_id,
      requested_id: userRequested.id
    });

    if(requestAlreadyExists) {
      throw new RequestAlreadyExists();
    }

    const request = await this.requestsToBeAFriendRepository.create({
      requester_id,
      requested_id: userRequested.id
    });

    return request;
  }
}