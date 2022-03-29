import { Request, Response } from "express";
import { container } from "tsyringe";
import { AcceptFriendRequestUseCase } from "./AcceptFriendRequestUseCase";

export class AcceptFriendRequestController {
  async handle(request: Request, response: Response) {
    const { id: requested_id } = request.user;
    const { requester_email } = request.body;

    const acceptFriendRequestUseCase = container.resolve(AcceptFriendRequestUseCase);

    await acceptFriendRequestUseCase.execute({ requested_id, requester_email });

    return response.send();
  }
}