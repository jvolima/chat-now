import { RequestToBeAFriend } from "@prisma/client";
import { prismaClient } from "../../../../prisma/prismaClient";
import { ICreateFriendRequestDTO } from "../../dtos/ICreateFriendRequestDTO";
import { IRequestsToBeAFriendRepository } from "../IRequestsToBeAFriendRepository";

export class RequestsToBeAFriendRepository implements IRequestsToBeAFriendRepository {
  async create({ requester_id, requested_id }: ICreateFriendRequestDTO): Promise<RequestToBeAFriend> {
    const request = await prismaClient.requestToBeAFriend.create({
      data: {
        requester_id,
        requested_id
      }
    });

    return request;
  }

  async findByRequesterIdAndRequestedId({ 
    requester_id, 
    requested_id 
  }: ICreateFriendRequestDTO): Promise<RequestToBeAFriend> {
    const friendRequest = await prismaClient.requestToBeAFriend.findFirst({
      where: {
        requester_id,
        requested_id
      }
    });

    return friendRequest as RequestToBeAFriend;
  }

  async updateConfirmationDate(id: string): Promise<void> {
    await prismaClient.requestToBeAFriend.update({
      where: {
        id
      },
      data: {
        confirmation_date: new Date()
      }
    });
  }

  async refuse(id: string): Promise<void> {
    await prismaClient.requestToBeAFriend.delete({
      where: {
        id
      }
    });
  }
}