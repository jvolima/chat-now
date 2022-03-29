import { Friend } from "@prisma/client";
import { prismaClient } from "../../../../prisma/prismaClient";
import { ICreateaFriendDTO } from "../../dtos/ICreateFriendDTO";
import { IFriendsRepository } from "../IFriendsRepository";

export class FriendsRepository implements IFriendsRepository {
  async create({ user_id, friend_id }: ICreateaFriendDTO): Promise<Friend> {
    const friend = await prismaClient.friend.create({
      data: { user_id, friend_id}
    });

    return friend;
  }
}