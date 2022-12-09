import { usersDataJSON, writeData } from '../utils/readWriteData.js';
import { v4 as uuidv4 } from 'uuid';
import userObj from '../model/user.js';

export const checkID = (req, res, next, val) => {
    console.log(`User id is: ${val}`);

    if (+req.params.id > usersDataJSON.length) {
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID',
        });
    }
    next();
};

export const checkBody = (req, res, next) => {
    if (!req.body.fist || !req.body.last || !req.body.isActive) {
        return res.status(400).json({
            status: 'fail',
            message: 'Missing fist name or last name or active status',
        });
    }
    next();
};

export const checkIfExists = (id, bankACC) => {
    const checkUser = usersDataJSON.find((userDB) => {
        return userDB.id === id || userDB.bank_acc_num === bankACC;
    });
    return checkUser ? true : false;
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
        data: {
            usersDataJSON,
        },
    });
};

export const addNewUser = (req, res) => {
    const newUserID = (
        +usersDataJSON[usersDataJSON.length - 1].id + 1
    ).toString(); //In the local database, get the ID of the last user, increase it by 1, and make it into a string
    const newUserBankAcc = uuidv4();
    if (checkIfExists(newUserID, newUserBankAcc)) {
        return res.status(400).json({
            status: 'fail',
            message: 'Cannot add duplicate users',
        });
    } else {
        const newUser = Object.assign(
            { id: newUserID, bank_acc_num: newUserBankAcc, credit: 0, cash: 0 },
            req.body
        );
        usersDataJSON.push(userObj(newUser));
        writeData(usersDataJSON);
    }
    res.status(200).json({
        status: 'success',
        message: 'New user added',
    });
};

export const updateUserCash = (req, res) => {
    if (!req.params.id || !req.body.cash) {
        return res.status(400).json({
            status: 'fail',
            message: 'id of cash data missing...',
        });
    }
    const userID = req.params.id;
    const depositAmount = req.body.cash;
    const userByID = usersDataJSON.find((userDB) => userDB.id === userID);
    userByID.cash = depositAmount;
    writeData(usersDataJSON);
    res.status(200).json({
        status: 'success',
        message: 'user Updated',
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

export const deleteUser = (req, res) => {
    res.status(200).json({
        status: 'success',
    });
};
