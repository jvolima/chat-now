import { inject, injectable } from "tsyringe";
import { ICreateMessageDTO } from "../../dtos/ICreateMessageDTO";
import { IMessagesRepository } from "../../repositories/IMessagesRepository";
import { TextLength } from "./errors/TextLength";

@injectable()
export class CreateMessageUseCase {
  constructor (
    @inject("MessagesRepository")
    private messagesRepository: IMessagesRepository
  ) {}

  async execute({ sender_id, recipient_id, text }: ICreateMessageDTO) {
    if(text.length <= 0) {
      throw new TextLength();
    }

    const message = await this.messagesRepository.create({
      sender_id, 
      recipient_id, 
      text 
    });

    return message;
  }
}