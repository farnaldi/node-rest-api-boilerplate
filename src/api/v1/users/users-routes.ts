import { Router } from 'express';
import me from './users-controller';
import authorizeCustomer from '../../../middlewares/authorize';

const usersRouter: Router = Router();

usersRouter.get('/me', authorizeCustomer, me);

export default usersRouter;
