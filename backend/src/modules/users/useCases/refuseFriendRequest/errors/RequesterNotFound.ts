import { IAppError } from "../../../../../core/domain/errors/IAppError";

export class RequesterNotFound implements IAppError {
  message: string;
  statusCode: number;
  name: string;
  stack?: string;

  constructor() {
    this.message = "Requester not found";
    this.statusCode = 404;
    this.name = "RequesterNotFoundError";
  }
}