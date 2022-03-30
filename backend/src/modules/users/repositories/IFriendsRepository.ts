import { Friend } from "@prisma/client";
import { ICreateaFriendDTO } from "../dtos/ICreateFriendDTO";

export interface IFriendsRepository {
  create({ user_id, friend_id }: ICreateaFriendDTO): Promise<Friend>;
  list(id: string): Promise<Friend[]>;
}