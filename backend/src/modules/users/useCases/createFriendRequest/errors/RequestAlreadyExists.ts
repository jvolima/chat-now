import { IAppError } from "../../../../../core/domain/errors/IAppError";

export class RequestAlreadyExists implements IAppError {
  message: string;
  statusCode: number;
  name: string;
  stack?: string;

  constructor() {
    this.message = "Request already exists";
    this.statusCode = 400;
    this.name = "RequestAlreadyExistsError";
  }
}