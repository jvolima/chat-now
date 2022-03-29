import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateFriendRequestUseCase } from "./CreateFriendRequestUseCase";

export class CreateFriendRequestController {
  async handle (request: Request, response: Response) {
    const { id: requester_id } = request.user; 
    const { requested_email } = request.body;

    const createFriendRequestUseCase = container.resolve(CreateFriendRequestUseCase);

    const friendRequest = await createFriendRequestUseCase.execute({
      requester_id,
      requested_email
    });

    return response.status(201).json(friendRequest);
  }
}