import { Router } from 'express';
import authRoutes from './auth/auth-routes';
import usersRoutes from './users/users-routes';

const routerV1: Router = Router();

routerV1.use('/auth', authRoutes);
routerV1.use('/users', usersRoutes);

export default routerV1;
