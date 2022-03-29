import { inject, injectable } from "tsyringe";
import { IRequestsToBeAFriendRepository } from "../../repositories/IRequestsToBeAFriendRepository";

@injectable()
export class ListFriendRequestsUseCase {
  constructor (
    @inject("RequestsToBeAFriendRepository")
    private requestsToBeAFriendRepository: IRequestsToBeAFriendRepository,
  ) {}

  async execute(id: string) {
    const requests = await this.requestsToBeAFriendRepository.listFriendRequests(id);

    return requests;
  }
}