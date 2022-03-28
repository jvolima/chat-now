import { inject, injectable } from "tsyringe";
import { IMessagesRepository } from "../../repositories/IMessagesRepository";

@injectable()
export class ListReceivedMessagesUseCase {
  constructor (
    @inject("MessagesRepository")
    private messagesRepository: IMessagesRepository
  ) {}

  async execute(recipient_id: string) {
    const messages = await this.messagesRepository.listReceivedMessages(recipient_id);

    return messages;
  }
}