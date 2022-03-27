import { IAppError } from "../../../../../core/domain/errors/IAppError";

export class EmailOrPasswordIncorrect implements IAppError {
  message: string;
  statusCode: number;
  name: string;
  stack?: string;

  constructor () {
    this.message = "Email or password incorrect";
    this.statusCode = 400;
    this.name = "EmailOrPasswordIncorrectError";
  }
}