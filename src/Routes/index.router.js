import { Router } from 'express';
import { usersRouter } from './users.routes.js';
//import { usersActionRoutes } from './userAction.routes.js';

const indexRoute = Router();

indexRoute.use('/users', usersRouter); // localhost:8000/api/v1/users
//indexRoute.use('/usersAction', usersActionRoutes); // localhost:8000/api/v1/users-action

export default indexRoute;
