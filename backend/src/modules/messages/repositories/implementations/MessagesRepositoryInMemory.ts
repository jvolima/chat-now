import { Message } from "@prisma/client";
import { v4 as uuidV4 } from "uuid";
import { ICreateMessageDTO } from "../../dtos/ICreateMessageDTO";
import { IMessagesRepository } from "../IMessagesRepository";

export class MessagesRepositoryInMemory implements IMessagesRepository {
  messages: Message[] = [];

  async create({ sender_id, recipient_id, text }: ICreateMessageDTO): Promise<Message> {
    const message = {
      id: uuidV4(),
      sender_id,
      recipient_id,
      text,
      createdAt: new Date()
    }

    this.messages.push(message);

    return message;
  }
}