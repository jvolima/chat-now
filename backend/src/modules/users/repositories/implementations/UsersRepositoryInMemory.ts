import { User } from "@prisma/client";
import { v4 as uuidV4 } from "uuid";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../IUsersRepository";

export class UsersRepositoryInMemory implements IUsersRepository {
  users: User[] = [];

  async create({ name, email, password }: ICreateUserDTO): Promise<User> {
    const user = {
      id: uuidV4(),
      name,
      email,
      password,
      status: null
    };

    this.users.push(user);

    return user;
  }
  async findByEmail(email: string): Promise<User> {
    const user = this.users.find(user => user.email === email);

    return user as User;
  }
}