import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListMessagesWithSomeoneUseCase } from "./ListMessagesWithSomeoneUseCase";

export class ListMessagesWithSomeoneController {
  async handle(request: Request, response: Response) {
    const { id: user_id } = request.user;
    const { friend_email } = request.body;

    const listMessagesWithSomeoneUseCase = container.resolve(ListMessagesWithSomeoneUseCase);

    const messagesShared = await listMessagesWithSomeoneUseCase.execute({
      user_id,
      friend_email
    });

    return response.json(messagesShared);
  }
}