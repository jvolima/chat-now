import { UsersRepositoryInMemory } from "../../repositories/implementations/UsersRepositoryInMemory";
import { IUsersRepository } from "../../repositories/IUsersRepository"
import { CreateUserUseCase } from "./CreateUserUseCase";

describe("Create user useCase", () => {
  let usersRepository: IUsersRepository;
  let createUserUseCase: CreateUserUseCase;

  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepository);
  })

  it("Should be able to create a new user", async () => {
    const user = {
      name: "John doe",
      email: "john.doe@example.com", 
      password: "1234567890"
    };

    const createdUser = await createUserUseCase.execute(user);

    expect(createdUser).toHaveProperty("id");
  });

  it("Should not be able to create a new user if email is already registered", async () => {
    const errorExpected = {
      "message": "This email is already registered!",
      "name": "EmailAlreadyExistsError",
      "statusCode": 400
    }

    expect(async () => {
      const user = {
        name: "John doe",
        email: "john.doe@example.com", 
        password: "1234567890"
      };
  
      await createUserUseCase.execute(user);
      await createUserUseCase.execute(user);
    }).rejects.toEqual(errorExpected);
  });

  it("Should not be able to create a new user if password has less than 6 characters", async () => {
    const errorExpected = {
      "message": "The password must be at least 6 characters long!",
      "name": "PasswordLengthError",
      "statusCode": 400
    }

    expect(async () => {
      const user = {
        name: "John doe",
        email: "john.doe@example.com", 
        password: "12345"
      };
  
      await createUserUseCase.execute(user);
    }).rejects.toEqual(errorExpected);
  });
});