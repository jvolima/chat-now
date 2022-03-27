import { IAppError } from "../../../../../../core/domain/errors/IAppError";

export class InvalidToken implements IAppError {
  message: string;
  statusCode: number;
  name: string;
  stack?: string;

  constructor() {
    this.message = "Invalid token";
    this.statusCode = 401;
    this.name = "InvalidTokenError";
  }
}