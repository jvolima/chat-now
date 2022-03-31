import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { auth } from "../../../../config/auth";
import { IDateProvider } from "../../../../shared/infra/container/providers/DateProvider/IDateProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";
import { RefreshTokenNotFound } from "./errors/RefreshTokenNotFound";

interface IPayload {
  email: string;
  sub: string;
}

@injectable()
export class RefreshTokenUseCase {
  constructor (   
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute(refresh_token: string) {
    const { 
      secret_refresh_token, 
      expires_in_refresh_token, 
      expires_refresh_token_days,
      secret_token,
      expires_in_token
    } = auth;

    const { email, sub } = verify(refresh_token, secret_refresh_token) as IPayload;

    const user_id = sub;

    const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(
      user_id,
      refresh_token
    );

    if(!userToken) {
      throw new RefreshTokenNotFound();
    }

    await this.usersTokensRepository.deleteById(userToken.id);

    const newRefreshToken = sign({ email }, secret_refresh_token, {
      subject: user_id,
      expiresIn: expires_in_refresh_token,
    });

    const expires_date = this.dateProvider.addDays(expires_refresh_token_days);

    await this.usersTokensRepository.create({
      user_id,
      refresh_token: newRefreshToken,
      expires_date
    });

    const newToken = sign({}, secret_token, {
      subject: user_id,
      expiresIn: expires_in_token,
    });

    return {
      refresh_token: newRefreshToken,
      token: newToken
    }
  }
}