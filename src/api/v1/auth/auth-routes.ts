import { Router } from 'express';
import * as authController from './auth-controller';
import registerSchema from './auth-schemas';
import validateBody from '../../../middlewares/validate';

const authRouter: Router = Router();

authRouter.post('/login', authController.login);

authRouter.post('/register', validateBody(registerSchema), authController.register);

export default authRouter;
