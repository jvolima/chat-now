import { Message } from "@prisma/client";
import { ICreateMessageDTO } from "../dtos/ICreateMessageDTO";

export interface IMessagesRepository {
  create({ sender_id, recipient_id, text }: ICreateMessageDTO): Promise<Message>;
}