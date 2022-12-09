import { Router } from 'express';

import {
    addNewUser,
    checkID,
    deleteUser,
    getAllUsers,
    getUserByID,
    getUserCash,
    getUserCredit,
    updateUser,
} from '../controllers/usersController.js';
export const usersRouter = Router();

usersRouter.param('id', checkID);
// all routes in here are starting with localhost:8000/api/v1/users
usersRouter.route(`/`).get(getAllUsers).post(addNewUser); //get all users and add new user
usersRouter.route(`/:id`).get(getUserByID).patch(updateUser).delete(deleteUser); // read specific user | update user | delete user
usersRouter.route(`/:id/credit`).get(getUserCredit); // read credit
usersRouter.route(`/:id/cash`).get(getUserCash); // read cash
