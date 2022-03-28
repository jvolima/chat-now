import { Router } from 'express';
import { CreateMessageController } from '../../../../modules/messages/useCases/createMessage/CreateMessageController';
import { ListReceivedMessagesController } from '../../../../modules/messages/useCases/listReceivedMessages/ListReceivedMessagesController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const messageRoutes = Router();

const createMessageController = new CreateMessageController();
const listReceivedMessagesController = new ListReceivedMessagesController();

messageRoutes.post("/create", ensureAuthenticated, createMessageController.handle);
messageRoutes.get("/received", ensureAuthenticated, listReceivedMessagesController.handle);

export { messageRoutes };