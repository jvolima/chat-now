import { IAppError } from "../../../../../core/domain/errors/IAppError";

export class FriendNotFound implements IAppError {
  message: string;
  statusCode: number;
  name: string;
  stack?: string;

  constructor() {
    this.message = "Friend not found";
    this.statusCode = 404;
    this.name = "FriendNotFoundError";
  }
}