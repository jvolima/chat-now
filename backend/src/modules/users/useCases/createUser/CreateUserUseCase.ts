import "reflect-metadata"
import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { EmailAlreadyExists } from "./errors/EmailAlreadyExists";
import { PasswordLength } from "./errors/PasswordLength";

@injectable()
export class CreateUserUseCase {
  constructor (
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}
  
  async execute({ name, email, password }: ICreateUserDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if(userAlreadyExists) {
      throw new EmailAlreadyExists();
    }

    if(password.length < 6) {
      throw new PasswordLength();
    }

    const passwordHash = await hash(password, 8);

    const user = await this.usersRepository.create({ 
      name, 
      email, 
      password: passwordHash 
    });

    return user;
  }
}