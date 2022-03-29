import { IAppError } from "../../../../../core/domain/errors/IAppError";

export class UserRequestedNotFound implements IAppError {
  message: string;
  statusCode: number;
  name: string;
  stack?: string;

  constructor() {
    this.message = "User requested not found";
    this.statusCode = 404;
    this.name = "UserRequestedNotFoundError";
  }
}