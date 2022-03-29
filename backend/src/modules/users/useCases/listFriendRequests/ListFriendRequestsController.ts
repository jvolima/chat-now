import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListFriendRequestsUseCase } from "./ListFriendRequestsUseCase";

export class ListFriendRequestsController {
  async handle(request: Request, response: Response) {
    const { id } = request.user;

    const listFriendRequestsUseCase = container.resolve(ListFriendRequestsUseCase);

    const friendRequests = await listFriendRequestsUseCase.execute(id);
    
    return response.json(friendRequests);
  }
}
