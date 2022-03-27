import { Router } from 'express';
import { CreateMessageController } from '../../../../modules/messages/useCases/createMessage/CreateMessageController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const messageRoutes = Router();

const createMessageController = new CreateMessageController();

messageRoutes.post("/create", ensureAuthenticated, createMessageController.handle);

export { messageRoutes };