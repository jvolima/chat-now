import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { auth } from "../../../../../config/auth";
import { InvalidToken } from "./errors/InvalidToken";
import { TokenMissing } from "./errors/TokenMissing";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated (
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new TokenMissing();
  }

  const [, token] = authHeader.split(" ");

  const { secret_token } = auth

  try {
    const { sub: user_id } = verify(token, secret_token) as IPayload;

    request.user = {
      id: user_id,
    };

    next();
  } catch {
    throw new InvalidToken();
  }
}
