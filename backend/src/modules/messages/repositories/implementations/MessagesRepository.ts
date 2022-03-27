import { Message } from "@prisma/client";
import { prismaClient } from "../../../../prisma/prismaClient";
import { ICreateMessageDTO } from "../../dtos/ICreateMessageDTO";
import { IMessagesRepository } from "../IMessagesRepository";

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
}