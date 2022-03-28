import { Message } from "@prisma/client";
import { prismaClient } from "../../../../prisma/prismaClient";
import { ICreateMessageDTO } from "../../dtos/ICreateMessageDTO";
import { IMessagesRepository, MessagesReceivedAndMessagesSent } from "../IMessagesRepository";

export class MessagesRepository implements IMessagesRepository {
  async create({ sender_id, recipient_id, text }: ICreateMessageDTO): Promise<Message> {
    const message = await prismaClient.message.create({
      data: {
        sender_id, 
        recipient_id, 
        text 
      },
      include: {
        sender: true
      }
    });

    return message;
  }

  async listReceivedMessages(recipient_id: string): Promise<Message[]> {
    const messages = await prismaClient.message.findMany({
      where: {
        recipient_id
      }
    });

    return messages;
  }

  async listMessagesWithAFriend(
    user_id: string, 
    friend_id: string
  ): Promise<MessagesReceivedAndMessagesSent> {
    const messagesReceived = await prismaClient.message.findMany({
      where: {
        recipient_id: user_id,
        sender_id: friend_id
      }
    });

    const messagesSent = await prismaClient.message.findMany({
      where: {
        recipient_id: friend_id,  
        sender_id: user_id
      }
    });

    return {
      messagesReceived: messagesReceived,
      messagesSent: messagesSent,
    }
  } 
}