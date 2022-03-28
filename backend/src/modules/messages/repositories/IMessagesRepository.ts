import { Message } from "@prisma/client";
import { ICreateMessageDTO } from "../dtos/ICreateMessageDTO";

export interface MessagesReceivedAndMessagesSent {
  messagesReceived: Message[];
  messagesSent: Message[];
}

export interface IMessagesRepository {
  create({ sender_id, recipient_id, text }: ICreateMessageDTO): Promise<Message>;
  listReceivedMessages(recipient_id: string): Promise<Message[]>;
  listMessagesWithAFriend(user_id: string, friend_id: string): Promise<MessagesReceivedAndMessagesSent>;
}