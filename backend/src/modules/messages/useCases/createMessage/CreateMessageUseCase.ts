import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../../users/repositories/IUsersRepository";
import { ICreateMessageDTO } from "../../dtos/ICreateMessageDTO";
import { IMessagesRepository } from "../../repositories/IMessagesRepository";
import { RecipientNotFound } from "./errors/RecipientNotFound";
import { TextLength } from "./errors/TextLength";

interface ICreateMessageUseCase {
  sender_id: string;
  recipient_email: string;
  text: string;
}

@injectable()
export class CreateMessageUseCase {
  constructor (
    @inject("MessagesRepository")
    private messagesRepository: IMessagesRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ sender_id, recipient_email, text }: ICreateMessageUseCase) {
    if(text.trim().length <= 0) {
      throw new TextLength();
    }

    const recipient = await this.usersRepository.findByEmail(recipient_email);

    if(!recipient) {
      throw new RecipientNotFound();
    }

    const recipient_id = recipient.id;

    const message = await this.messagesRepository.create({
      sender_id, 
      recipient_id, 
      text 
    });

    return message;
  }
}