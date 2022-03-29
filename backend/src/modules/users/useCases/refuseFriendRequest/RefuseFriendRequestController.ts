import { Request, Response } from "express";
import { container } from "tsyringe";
import { RefuseFriendRequestUseCase } from "./RefuseFriendRequestUseCase";

export class RefuseFriendRequestController {
  async handle(request: Request, response: Response) {
    const { id: requested_id } = request.user;
    const { requester_email } = request.body;

    const refuseFriendRequestUseCase = container.resolve(RefuseFriendRequestUseCase);

    await refuseFriendRequestUseCase.execute({ requested_id, requester_email });

    return response.send();
  }
}