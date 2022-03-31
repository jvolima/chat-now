import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { auth } from "../../../../config/auth";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { EmailOrPasswordIncorrect } from "./errors/EmailOrPasswordIncorrect";

interface IRequest {
  email: string;
  password: string;
}

@injectable()
export class AuthenticateUserUseCase {
  constructor (
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest) {
    const user = await this.usersRepository.findByEmail(email);

    if(!user) {
      throw new EmailOrPasswordIncorrect();
    }

    const passwordMatch = await compare(password, user.password);

    if(!passwordMatch) {
      throw new EmailOrPasswordIncorrect();
    }

    const { secret_token, expires_in_token } = auth;

    const token = sign({}, secret_token, {
      subject: user.id,
      expiresIn: expires_in_token,
    });

    return {
      user: {
        name: user.name,
        email
      },
      token
    }
  }
}