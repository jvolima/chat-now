import { IAppError } from "../../../../../core/domain/errors/IAppError";

export class FriendRequestAlreadyAccepted implements IAppError {
  message: string;
  statusCode: number;
  name: string;
  stack?: string;

  constructor() {
    this.name = "FriendRequestAlreadyAcceptedError";
    this.message = "Friend request already accepted";
    this.statusCode = 400;
  }
}