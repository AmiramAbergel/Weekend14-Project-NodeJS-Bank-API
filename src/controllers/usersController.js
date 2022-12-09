import { usersDataJSON } from '../utils/readData.js';

export const checkID = (req, res, next, val) => {
    console.log(`Tour id is: ${val}`);

    if (+req.params.id > usersDataJSON.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID',
        });
    }
    next();
};

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
    const userID = req.params.id;
    const userByID = usersDataJSON.find((userDB) => userDB.id === userID);
    console.log(userByID);
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        results: 1,
        data: {
            usersDataJSON,
        },
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
