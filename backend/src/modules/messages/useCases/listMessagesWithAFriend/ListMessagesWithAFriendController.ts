import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListMessagesWithAFriendUseCase } from "./ListMessagesWithAFriendUseCase";

export class ListMessagesWithAFriendController {
  async handle(request: Request, response: Response) {
    const { id: user_id } = request.user;
    const { friend_email } = request.body;

    const listMessagesWithAFriendUseCase = container.resolve(ListMessagesWithAFriendUseCase);

    const messagesShared = await listMessagesWithAFriendUseCase.execute({
      user_id,
      friend_email
    });

    return response.json(messagesShared);
  }
}