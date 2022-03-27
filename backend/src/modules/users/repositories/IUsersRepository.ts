import { User } from "@prisma/client";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";

export interface IUsersRepository {
  create({ name, email, password }: ICreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User>;
}