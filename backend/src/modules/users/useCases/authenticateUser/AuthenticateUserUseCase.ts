import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { auth } from "../../../../config/auth";
import { IDateProvider } from "../../../../shared/infra/container/providers/DateProvider/IDateProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";
import { EmailOrPasswordIncorrect } from "./errors/EmailOrPasswordIncorrect";

interface IRequest {
  email: string;
  password: string;
}

@injectable()
export class AuthenticateUserUseCase {
  constructor (
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
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

    const { 
      secret_token, 
      expires_in_token, 
      secret_refresh_token, 
      expires_in_refresh_token, 
      expires_refresh_token_days
    } = auth;

    const token = sign({}, secret_token, {
      subject: user.id,
      expiresIn: expires_in_token,
    });

    const refreshToken = sign({email}, secret_refresh_token, {
      subject: user.id,
      expiresIn: expires_in_refresh_token,
    });

    const expires_date = this.dateProvider.addDays(expires_refresh_token_days);

    await this.usersTokensRepository.create({
      user_id: user.id,
      refresh_token: refreshToken,
      expires_date
    })

    return {
      user: {
        name: user.name,
        email
      },
      token, 
      refreshToken
    }
  }
}