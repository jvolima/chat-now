import { RequestToBeAFriend } from "@prisma/client";
import { ICreateFriendRequestDTO } from "../dtos/ICreateFriendRequestDTO";

export interface IRequestsToBeAFriendRepository {
  create({ requester_id, requested_id }: ICreateFriendRequestDTO): Promise<RequestToBeAFriend>;
  findByRequesterIdAndRequestedId({ 
    requester_id, 
    requested_id 
  }: ICreateFriendRequestDTO): Promise<RequestToBeAFriend>;
  updateConfirmationDate(id: string): Promise<void>;
  refuse(id: string): Promise<void>;
}