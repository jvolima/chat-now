import { UserToken } from "@prisma/client";
import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO";

export interface IUsersTokensRepository {
  create({ refresh_token, user_id, expires_date }: ICreateUserTokenDTO): Promise<UserToken>;
  findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserToken>;
  deleteById(id: string): Promise<void>;
}