import { IAppError } from "../../../../../core/domain/errors/IAppError";

export class EmailAlreadyExists implements IAppError {
  statusCode: number;
  message: string;
  name: string;
  stack?: string;

  constructor() {
    this.message = 'This email is already registered!';
    this.statusCode = 400;
    this.name = 'EmailAlreadyExistsError';
  }
}