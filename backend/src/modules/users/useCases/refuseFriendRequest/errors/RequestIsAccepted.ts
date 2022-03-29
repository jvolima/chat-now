import { IAppError } from "../../../../../core/domain/errors/IAppError";

export class RequestIsAccepted implements IAppError {
  message: string;
  statusCode: number;
  name: string;
  stack?: string;

  constructor() {
    this.message = "Request is accepted";
    this.statusCode = 400;
    this.name = "RequestIsAcceptedError";
  }
}