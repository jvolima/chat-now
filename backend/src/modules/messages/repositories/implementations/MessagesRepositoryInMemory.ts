import { Message } from "@prisma/client";
import { v4 as uuidV4 } from "uuid";
import { ICreateMessageDTO } from "../../dtos/ICreateMessageDTO";
import { IMessagesRepository, MessagesReceivedAndMessagesSent } from "../IMessagesRepository";

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

  async listReceivedMessages(recipient_id: string): Promise<Message[]> {
    const messages = this.messages.filter(message => message.recipient_id === recipient_id);

    return messages;
  }

  async listMessagesWithAFriend(
    user_id: string, 
    friend_id: string
  ): Promise<MessagesReceivedAndMessagesSent> {
    const messagesReceived = this.messages.filter(
      message => message.recipient_id === user_id && message.sender_id === friend_id
    );

    const messagesSent = this.messages.filter(
      message => message.recipient_id === friend_id && message.sender_id === user_id
    );

    return {
      messagesReceived: messagesReceived,
      messagesSent: messagesSent,
    }
  }
}