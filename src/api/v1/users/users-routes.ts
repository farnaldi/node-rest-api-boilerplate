import { Router } from 'express';
import { me, update } from './users-controller';
import authorizeCustomer from '../../../middlewares/authorize';
import validateBody from '../../../middlewares/validate';
import patchUserSchema from './users-schemas';

const usersRouter: Router = Router();

usersRouter.get('/me', authorizeCustomer, me);
usersRouter.patch('/:id', authorizeCustomer, validateBody(patchUserSchema), update);

export default usersRouter;
