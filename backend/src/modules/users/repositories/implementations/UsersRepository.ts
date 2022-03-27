import { User } from "@prisma/client";
import { prismaClient } from "../../../../prisma/prismaClient";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../IUsersRepository";

export class UsersRepository implements IUsersRepository {
  async create({ name, email, password }: ICreateUserDTO): Promise<User> {
    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });

    return user as User;
  }
}