import "reflect-metadata"
import { UsersRepositoryInMemory } from "../../../users/repositories/implementations/UsersRepositoryInMemory";
import { IUsersRepository } from "../../../users/repositories/IUsersRepository";
import { IMessagesRepository } from "../../repositories/IMessagesRepository"
import { MessagesRepositoryInMemory } from "../../repositories/implementations/MessagesRepositoryInMemory";
import { FriendNotFound } from "./errors/FriendNotFound";
import { ListMessagesWithSomeoneUseCase } from "./ListMessagesWithSomeoneUseCase";

describe("ListMessagesWithAFriend useCase", () => {
  let messagesRepository: IMessagesRepository;
  let listMessagesWithSomeoneUseCase: ListMessagesWithSomeoneUseCase;
  let usersRepository: IUsersRepository;

  beforeEach(() => {
    messagesRepository = new MessagesRepositoryInMemory();
    usersRepository = new UsersRepositoryInMemory();
    listMessagesWithSomeoneUseCase = new ListMessagesWithSomeoneUseCase(messagesRepository, usersRepository);
  });

  it("Should be able to list messages with a friend use case", async () => {
    const user = {
      name: "User",
      email: "user@example.com",
      password: "123456",
    };

    const friend = {
      name: "Friend",
      email: "friend@example.com",
      password: "123456",
    };

    const userCreated = await usersRepository.create(user); 
    const friendCreated = await usersRepository.create(friend);

    await messagesRepository.create({
      sender_id: userCreated.id,
      recipient_id: friendCreated.id,
      text: "Hi friend",      
    });

    await messagesRepository.create({
      sender_id: friendCreated.id,
      recipient_id: userCreated.id,
      text: "Hi user",
    });

    const messagesShared = await listMessagesWithSomeoneUseCase.execute({
      user_id: userCreated.id,
      friend_email: friendCreated.email,
    });

    expect(messagesShared).toHaveProperty("messagesReceived");
    expect(messagesShared).toHaveProperty("messagesSent");
  });

  it("Should not be able to list messages with a friend if friend does not exist", () => {
    expect(async () => {
      const user = {
        name: "User",
        email: "user@example.com",
        password: "123456",
      };
  
      const friend = {
        name: "Friend",
        email: "friend@example.com",
        password: "123456",
      };
  
      const userCreated = await usersRepository.create(user); 
      const friendCreated = await usersRepository.create(friend);
  
      await messagesRepository.create({
        sender_id: userCreated.id,
        recipient_id: friendCreated.id,
        text: "Hi friend",      
      });
  
      await messagesRepository.create({
        sender_id: friendCreated.id,
        recipient_id: userCreated.id,
        text: "Hi user",
      });
  
      await listMessagesWithSomeoneUseCase.execute({
        user_id: userCreated.id,
        friend_email: 'fake@friend.com',
      });
    }).rejects.toBeInstanceOf(FriendNotFound);
  });
});