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

  async list(id: string): Promise<Friend[]> {
    const friends = await prismaClient.friend.findMany({
      where: {
        user_id: id
      },
      include: {
        friend: true
      }
    });

    return friends;
  }
}