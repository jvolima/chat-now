import { IAppError } from "../../../../../core/domain/errors/IAppError";

export class RequestNotFound implements IAppError {
  message: string;
  statusCode: number;
  name: string;
  stack?: string;

  constructor() {
    this.message = "Request not found";
    this.statusCode = 404;
    this.name = "RequestNotFoundError";
  }
}