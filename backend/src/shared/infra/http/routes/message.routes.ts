import { Router } from 'express';
import { CreateMessageController } from '../../../../modules/messages/useCases/createMessage/CreateMessageController';
import { ListMessagesWithAFriendController } from '../../../../modules/messages/useCases/listMessagesWithAFriend/ListMessagesWithAFriendController';
import { ListReceivedMessagesController } from '../../../../modules/messages/useCases/listReceivedMessages/ListReceivedMessagesController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const messageRoutes = Router();

const createMessageController = new CreateMessageController();
const listReceivedMessagesController = new ListReceivedMessagesController();
const listMessagesWithAFriendController = new ListMessagesWithAFriendController();

messageRoutes.post("/create", ensureAuthenticated, createMessageController.handle);
messageRoutes.get("/received", ensureAuthenticated, listReceivedMessagesController.handle);
messageRoutes.get("/withAFriend", ensureAuthenticated, listMessagesWithAFriendController.handle);

export { messageRoutes };