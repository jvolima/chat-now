import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../../users/repositories/IUsersRepository";
import { ICreateMessageDTO } from "../../dtos/ICreateMessageDTO";
import { IMessagesRepository } from "../../repositories/IMessagesRepository";
import { RecipientNotFound } from "./errors/RecipientNotFound";
import { TextLength } from "./errors/TextLength";

@injectable()
export class CreateMessageUseCase {
  constructor (
    @inject("MessagesRepository")
    private messagesRepository: IMessagesRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ sender_id, recipient_id, text }: ICreateMessageDTO) {
    if(text.trim().length <= 0) {
      throw new TextLength();
    }

    const recipient = await this.usersRepository.findById(recipient_id);

    if(!recipient) {
      throw new RecipientNotFound();
    }

    const message = await this.messagesRepository.create({
      sender_id, 
      recipient_id, 
      text 
    });

    return message;
  }
}