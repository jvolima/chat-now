import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListFriendsUseCase } from "./ListFriendsUseCase";

export class ListFriendsController {
  async handle(request: Request, response: Response) {
    const { id } = request.user;

    const listFriendsUseCase = container.resolve(ListFriendsUseCase);

    const friends = await listFriendsUseCase.execute(id);

    return response.json(friends);
  }
}