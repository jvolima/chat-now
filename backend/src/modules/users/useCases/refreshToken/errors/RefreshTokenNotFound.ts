import { IAppError } from "../../../../../core/domain/errors/IAppError";

export class RefreshTokenNotFound implements IAppError {
  message: string;
  statusCode: number;
  name: string;
  stack?: string;

  constructor() {
    this.message = "Refresh token not found";
    this.statusCode = 404;
    this.name = "RefreshTokenNotFoundError";
  }
}