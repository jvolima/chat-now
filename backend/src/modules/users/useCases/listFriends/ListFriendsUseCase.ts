import { inject, injectable } from "tsyringe";
import { IFriendsRepository } from "../../repositories/IFriendsRepository";

@injectable()
export class ListFriendsUseCase {
  constructor (
    @inject("FriendsRepository")
    private friendsRepository: IFriendsRepository
  ) {}

  async execute(id: string) {
    const friends = await this.friendsRepository.list(id);

    return friends;
  }
}