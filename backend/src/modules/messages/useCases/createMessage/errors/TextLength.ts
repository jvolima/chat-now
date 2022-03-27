import { IAppError } from "../../../../../core/domain/errors/IAppError";

export class TextLength implements IAppError {
  message: string;
  statusCode: number;
  name: string;
  stack?: string;

  constructor () {
    this.message = "Text length must be greater than 0";
    this.statusCode = 400;
    this.name = "TextLengthError";
  }
}