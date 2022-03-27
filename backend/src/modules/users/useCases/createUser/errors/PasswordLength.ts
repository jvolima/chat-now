import { IAppError } from "../../../../../core/domain/errors/IAppError";

export class PasswordLength implements IAppError {
  message: string;
  name: string;
  statusCode: number;
  stack?: string;

  constructor() {
    this.message = 'The password must be at least 6 characters long!';
    this.name = 'PasswordLengthError';
    this.statusCode = 400;
  }
}