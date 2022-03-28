import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateMessageUseCase } from "./CreateMessageUseCase";

export class CreateMessageController {
  async handle(request: Request, response: Response) {
    const { id: sender_id } = request.user;
    const { recipient_email, text } = request.body;

    const createMessageUseCase = container.resolve(CreateMessageUseCase);

    const message = await createMessageUseCase.execute({
      sender_id,
      recipient_email,
      text,
    });

    return response.status(201).json(message);
  }
}