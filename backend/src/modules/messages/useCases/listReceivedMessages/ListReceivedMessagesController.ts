import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListReceivedMessagesUseCase } from "./ListReceivedMessagesUseCase";

export class ListReceivedMessagesController {
  async handle(request: Request, response: Response) {
    const { id: recipient_id } = request.user;

    const listReceivedMessagesUseCase = container.resolve(ListReceivedMessagesUseCase);

    const messages = await listReceivedMessagesUseCase.execute(recipient_id);

    return response.json(messages);
  }
}