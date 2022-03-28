import { IAppError } from "../../../../../core/domain/errors/IAppError";

export class RecipientNotFound implements IAppError {
  message: string;
  statusCode: number;
  name: string;
  stack?: string;

  constructor() {
    this.message = "Recipient not found";
    this.statusCode = 404;
    this.name = "RecipientNotFoundError";
  }
}