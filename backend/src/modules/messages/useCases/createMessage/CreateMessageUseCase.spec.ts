import "reflect-metadata";
import { UsersRepositoryInMemory } from "../../../users/repositories/implementations/UsersRepositoryInMemory";
import { IUsersRepository } from "../../../users/repositories/IUsersRepository"
import { IMessagesRepository } from "../../repositories/IMessagesRepository";
import { MessagesRepositoryInMemory } from "../../repositories/implementations/MessagesRepositoryInMemory";
import { CreateMessageUseCase } from "./CreateMessageUseCase";
import { RecipientNotFound } from "./errors/RecipientNotFound";
import { TextLength } from "./errors/TextLength";

describe("Create message useCase", () => {
  let usersRepository: IUsersRepository;
  let messagesRepository: IMessagesRepository;
  let createMessageUseCase: CreateMessageUseCase;

  beforeEach(() => {
    usersRepository = new UsersRepositoryInMemory();
    messagesRepository = new MessagesRepositoryInMemory();
    createMessageUseCase = new CreateMessageUseCase(messagesRepository, usersRepository);
  });

  it("Should be able to send a message", async () => {
    const sender = {
      name: "Sender",
      email: "sender@example.com",
      password: "sender123"
    };

    const senderCreated = await usersRepository.create(sender);

    const recipient = {
      name: "Recipient",
      email: "recipient@example.com",
      password: "recipient123"
    };
    
    const recipientCreated = await usersRepository.create(recipient);

    const message = {
      sender_id: senderCreated.id,
      recipient_id: recipientCreated.id,
      text: "Test message"
    };

    const messageCreated = await createMessageUseCase.execute(message);

    expect(messageCreated).toHaveProperty("id");
    expect(messageCreated).toHaveProperty("text");
  });

  it("Should not be able to send a message if text don't have at least 1 character", async () => {
    expect(async () => {
      const sender = {
        name: "Sender",
        email: "sender@example.com",
        password: "sender123"
      };
  
      const senderCreated = await usersRepository.create(sender);
  
      const recipient = {
        name: "Recipient",
        email: "recipient@example.com",
        password: "recipient123"
      };
      
      const recipientCreated = await usersRepository.create(recipient);
  
      const message = {
        sender_id: senderCreated.id,
        recipient_id: recipientCreated.id,
        text: ""
      };
  
      await createMessageUseCase.execute(message);
    }).rejects.toBeInstanceOf(TextLength);
  });

  it("Should not be able to send a message if recipient does not exists", async () => {
    expect(async () => {
      const sender = {
        name: "Sender",
        email: "sender@example.com",
        password: "sender123"
      };
  
      const senderCreated = await usersRepository.create(sender);
  
      const message = {
        sender_id: senderCreated.id,
        recipient_id: "fake-id",
        text: "Test message"
      };
  
      await createMessageUseCase.execute(message);
    }).rejects.toBeInstanceOf(RecipientNotFound);
  });
})