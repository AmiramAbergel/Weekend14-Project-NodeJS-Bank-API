import { usersDataJSON } from '../utils/readData.js';

export const getAllUsers = (req, res) => {
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        results: usersDataJSON.length,
        data: {
            usersDataJSON,
        },
    });
};

export const getUserByID = (req, res) => {
    res.status(200).json({
        status: 'success',
        s,
    });
};
export const getUserCredit = (req, res) => {
    res.status(200).json({
        status: 'success',
    });
};
export const getUserCash = (req, res) => {
    res.status(200).json({
        status: 'success',
    });
};

export const updateUser = (req, res) => {
    res.status(200).json({
        status: 'success',
    });
};
export const addNewUser = (req, res) => {
    res.status(200).json({
        status: 'success',
    });
};

export const deleteUser = (req, res) => {
    res.status(200).json({
        status: 'success',
    });
};
