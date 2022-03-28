import "reflect-metadata"
import { UsersRepositoryInMemory } from "../../repositories/implementations/UsersRepositoryInMemory";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { EmailOrPasswordIncorrect } from "./errors/EmailOrPasswordIncorrect";

describe("AuthenticateUser useCase", () => {
  let usersRepository: IUsersRepository;
  let createUserUseCase: CreateUserUseCase;
  let authenticateUserUseCase: AuthenticateUserUseCase;

  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepository);
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository);
  })

  it("Should be able to authenticate an user", async () => {
    const user = {
      name: "John doe",
      email: "john.doe@example.com",
      password: "123456789"
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });

    expect(result).toHaveProperty("token");
  });

  it("Should not be able to authenticate an user if email is incorrect", async () => {
    expect(async () => {
      const user = {
        name: "John doe",
        email: "john.doe@example.com",
        password: "123456789"
      };
  
      await createUserUseCase.execute(user);
  
      await authenticateUserUseCase.execute({
        email: 'incorrect@email.com',
        password: user.password
      });
    }).rejects.toBeInstanceOf(EmailOrPasswordIncorrect);
  });

  it("Should not be able to authenticate an user if password is incorrect", async () => {
    expect(async () => {
      const user = {
        name: "John doe",
        email: "john.doe@example.com",
        password: "123456789"
      };
  
      await createUserUseCase.execute(user);
  
      await authenticateUserUseCase.execute({
        email: user.email,
        password: 'incorrect-password'
      });
    }).rejects.toBeInstanceOf(EmailOrPasswordIncorrect);
  });
});