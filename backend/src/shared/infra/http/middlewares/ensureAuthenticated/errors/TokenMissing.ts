import { IAppError } from "../../../../../../core/domain/errors/IAppError";

export class TokenMissing implements IAppError {
  message: string;
  statusCode: number;
  name: string;
  stack?: string;

  constructor () {
    this.message = "Token missing";
    this.statusCode = 401;
    this.name = "TokenMissingError";
  }
}