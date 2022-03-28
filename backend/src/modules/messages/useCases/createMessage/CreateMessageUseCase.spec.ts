import "reflect-metadata"
import { UsersRepositoryInMemory } from "../../../users/repositories/implementations/UsersRepositoryInMemory";
import { IUsersRepository } from "../../../users/repositories/IUsersRepository";
import { IMessagesRepository } from "../../repositories/IMessagesRepository";
import { MessagesRepositoryInMemory } from "../../repositories/implementations/MessagesRepositoryInMemory";
import { CreateMessageUseCase } from "./CreateMessageUseCase";
import { RecipientNotFound } from "./errors/RecipientNotFound";
import { TextLength } from "./errors/TextLength";

describe("CreateMessage useCase", () => {
  let messagesRepository: IMessagesRepository;
  let createMessageUseCase: CreateMessageUseCase;
  let usersRepository: IUsersRepository;

  beforeEach(() => {
    messagesRepository = new MessagesRepositoryInMemory();
    usersRepository = new UsersRepositoryInMemory();
    createMessageUseCase = new CreateMessageUseCase(messagesRepository, usersRepository);
  })

  it("Should be able to send a message", async () => {
    const sender = {
      name: "Sender",
      email: "sender@example.com",
      password: "123456",
    };

    const recipient = {
      name: "Recipient",
      email: "recipient@example.com",
      password: "123456",
    };

    const senderCreated = await usersRepository.create(sender);
    await usersRepository.create(recipient);

    const message = await createMessageUseCase.execute({
      sender_id: senderCreated.id,
      recipient_email: recipient.email, 
      text: "Test message"
    });

    expect(message).toHaveProperty("id");
    expect(message).toHaveProperty("text");
  });

  it("Should not be able to send a message if recipient does not exists", () => {
    expect(async () => {
      const sender = {
        name: "Sender",
        email: "sender@example.com",
        password: "123456",
      };
  
      const senderCreated = await usersRepository.create(sender);
  
      await createMessageUseCase.execute({
        sender_id: senderCreated.id,
        recipient_email: 'fake@email', 
        text: "Test message"
      });
    }).rejects.toBeInstanceOf(RecipientNotFound);
  });

  it("Should not be able to send a message if text length is less than 1", () => {
    expect(async () => {
      const sender = {
        name: "Sender",
        email: "sender@example.com",
        password: "123456",
      };
  
      const recipient = {
        name: "Recipient",
        email: "recipient@example.com",
        password: "123456",
      };
  
      const senderCreated = await usersRepository.create(sender);
      await usersRepository.create(recipient);
  
      await createMessageUseCase.execute({
        sender_id: senderCreated.id,
        recipient_email: recipient.email, 
        text: ""
      });
    }).rejects.toBeInstanceOf(TextLength);
  });
})