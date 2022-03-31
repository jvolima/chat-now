import { Request, Response } from "express";
import { container } from "tsyringe";
import { RefreshTokenUseCase } from "./RefreshTokenUseCase";

export class RefreshTokenController {
  async handle(request: Request, response: Response) {
    const { refresh_token } = request.body;

    const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);

    const tokens = await refreshTokenUseCase.execute(refresh_token);

    return response.json(tokens);
  }
}