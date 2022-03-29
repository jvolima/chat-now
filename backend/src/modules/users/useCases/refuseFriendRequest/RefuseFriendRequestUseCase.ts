import { inject, injectable } from "tsyringe";
import { IRequestsToBeAFriendRepository } from "../../repositories/IRequestsToBeAFriendRepository";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { RequesterNotFound } from "./errors/RequesterNotFound";
import { RequestIsAccepted } from "./errors/RequestIsAccepted";
import { RequestNotFound } from "./errors/RequestNotFound";

interface IRequest {
  requested_id: string;
  requester_email: string;
}

@injectable()
export class RefuseFriendRequestUseCase {
  constructor (
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("RequestsToBeAFriendRepository")
    private requestsToBeAFriendRepository: IRequestsToBeAFriendRepository
  ) {}

  async execute({ requested_id, requester_email}: IRequest) {
    const requester = await this.usersRepository.findByEmail(requester_email);

    if(!requester) {
      throw new RequesterNotFound();
    }

    const request = await this.requestsToBeAFriendRepository.findByRequesterIdAndRequestedId({
      requester_id: requester.id,
      requested_id: requested_id
    });

    if(!request) {
      throw new RequestNotFound();
    }

    if(request.confirmation_date) {
      throw new RequestIsAccepted();
    }

    await this.requestsToBeAFriendRepository.refuse(request.id);
  } 
}