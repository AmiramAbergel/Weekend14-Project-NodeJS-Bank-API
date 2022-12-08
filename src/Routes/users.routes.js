import { Router } from 'express';
import fs from 'fs';
export const usersRouter = Router();
const dataURL = '././db/usersList.json';
const usersDataBuffer = fs.readFileSync(dataURL);
const usersDataJSON = JSON.parse(usersDataBuffer);

const getAllUsers = (req, res) => {
    res.status(200).json({
        status: 'success',
    });
};

const getUserByID = (req, res) => {
    res.status(200).json({
        status: 'success',
        s,
    });
};
const getUserCredit = (req, res) => {
    res.status(200).json({
        status: 'success',
    });
};
const getUserCash = (req, res) => {
    res.status(200).json({
        status: 'success',
    });
};

const updateUser = (req, res) => {
    res.status(200).json({
        status: 'success',
    });
};
const addNewUser = (req, res) => {
    res.status(200).json({
        status: 'success',
    });
};

const deleteUser = (req, res) => {
    res.status(200).json({
        status: 'success',
    });
};

// all routes in here are starting with localhost:8000/api/v1/users
usersRouter.get(`/`, getAllUsers); //read all
usersRouter.get(`/:id`, getUserByID); //read specific
usersRouter.get(`/:id/credit`, getUserCredit); //read credit
usersRouter.get(`/:id/cash`, getUserCash); //read cash
usersRouter.patch(`/:id`, updateUser); //update user
usersRouter.post(`/`, addNewUser); // add new user
usersRouter.delete(`/:id`, deleteUser); //delete user
