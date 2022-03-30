import { Router } from 'express';
import { CreateMessageController } from '../../../../modules/messages/useCases/createMessage/CreateMessageController';
import { ListMessagesWithSomeoneController } from '../../../../modules/messages/useCases/listMessagesWithSomeone/ListMessagesWithSomeone';
import { ListReceivedMessagesController } from '../../../../modules/messages/useCases/listReceivedMessages/ListReceivedMessagesController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const messageRoutes = Router();

const createMessageController = new CreateMessageController();
const listReceivedMessagesController = new ListReceivedMessagesController();
const listMessagesWithSomeoneController = new ListMessagesWithSomeoneController();

messageRoutes.post("/create", ensureAuthenticated, createMessageController.handle);
messageRoutes.get("/received", ensureAuthenticated, listReceivedMessagesController.handle);
messageRoutes.get("/withSomeone", ensureAuthenticated, listMessagesWithSomeoneController.handle);

export { messageRoutes };