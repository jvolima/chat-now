import { UserToken } from "@prisma/client";
import { prismaClient } from "../../../../prisma/prismaClient";
import { ICreateUserTokenDTO } from "../../dtos/ICreateUserTokenDTO";
import { IUsersTokensRepository } from "../IUsersTokensRepository";

export class UsersTokensRepository implements IUsersTokensRepository {
  async create({ refresh_token, user_id, expires_date }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = await prismaClient.userToken.create({
      data: {
        refresh_token,  
        user_id,
        expires_date
      }
    });

    return userToken;
  }

  async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserToken> {
    const userToken = await prismaClient.userToken.findFirst({
      where: {
        user_id,
        refresh_token
      }
    });

    return userToken as UserToken;
  }

  async deleteById(id: string): Promise<void> {
    await prismaClient.userToken.delete({
      where: {
        id
      }
    });
  }
}