import "reflect-metadata"
import { UsersRepositoryInMemory } from "../../../users/repositories/implementations/UsersRepositoryInMemory";
import { IUsersRepository } from "../../../users/repositories/IUsersRepository";
import { IMessagesRepository } from "../../repositories/IMessagesRepository";
import { MessagesRepositoryInMemory } from "../../repositories/implementations/MessagesRepositoryInMemory";
import { ListReceivedMessagesUseCase } from "./ListReceivedMessagesUseCase";

describe("ListReceivedMessages useCase", () => {
  let messagesRepository: IMessagesRepository;
  let listReceivedMessagesUseCase: ListReceivedMessagesUseCase;
  let usersRepository: IUsersRepository;
  
  beforeEach(() => {
    messagesRepository = new MessagesRepositoryInMemory();
    listReceivedMessagesUseCase = new ListReceivedMessagesUseCase(messagesRepository);
    usersRepository = new UsersRepositoryInMemory();
  });

  it("Should be able to list received messages", async () => {
    const recipient = {
      name: "Recipient",
      email: "recipient@example.com",
      password: "123456",
    };

    const sender = {
      name: "Sender",
      email: "sender@example.com",
      password: "123456",
    };

    const recipientCreated = await usersRepository.create(recipient);
    const senderCreated = await usersRepository.create(sender);

    await messagesRepository.create({
      sender_id: senderCreated.id,
      recipient_id: recipientCreated.id,
      text: "Test message"
    });

    const messages = await listReceivedMessagesUseCase.execute(recipientCreated.id);

    expect(messages[0]).toHaveProperty("id");
  });
});