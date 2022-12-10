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
            userByID,
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
            message: 'id or cash data missing...',
        });
    }
    const userID = req.params.id;
    const depositAmount = req.body.cash;
    const userByID = usersDataJSON.find((userDB) => userDB.id === userID);
    userByID.cash += depositAmount;
    writeData(usersDataJSON);
    res.status(200).json({
        status: 'success',
        message: 'user cash updated',
    });
};

export const updateUserCredit = (req, res) => {
    if (!req.params.id || !req.body.credit) {
        return res.status(400).json({
            status: 'fail',
            message: 'id or cash data missing...',
        });
    }
    if (req.body.credit < 1) {
        return res.status(400).json({
            status: 'fail',
            message: 'Only positive numbers can be used for credit',
        });
    }
    const userID = req.params.id;
    const creditAmount = req.body.credit;
    const userByID = usersDataJSON.find((userDB) => userDB.id === userID);
    userByID.credit = creditAmount;
    writeData(usersDataJSON);
    res.status(200).json({
        status: 'success',
        message: 'user credit updated',
    });
};

export const withdrawFromUser = (req, res) => {
    if (!req.params.id || !req.body.withdraw) {
        return res.status(400).json({
            status: 'fail',
            message: 'id or cash data missing...',
        });
    }
    const userID = req.params.id;
    const withdrawAmount = req.body.withdraw;
    const userByID = usersDataJSON.find((userDB) => userDB.id === userID);
    const userCashCredit = userByID.credit + userByID.cash;
    if (withdrawAmount < 1 || userCashCredit < withdrawAmount) {
        return res.status(400).json({
            status: 'fail',
            message:
                'Only positive numbers can be used for withdraw and not more than user total funding ',
        });
    }
    if (userByID.cash <= withdrawAmount) {
        userByID.credit = userByID.credit - (withdrawAmount - userByID.cash);
        userByID.cash = 0;
    } else {
        userByID.cash = userByID.cash - withdrawAmount;
    }
    writeData(usersDataJSON);
    res.status(200).json({
        status: 'success',
        message: 'user credit and cash updated after withdraw',
    });
};

export const transferMoney = (req, res) => {
    const senderUserID = req.query.sender_id;
    const receiverUserID = req.query.receiver_id;
    const transferAmount = req.body.amount;

    const findSenderUserByID = usersDataJSON.find(
        (userDB) => userDB.id === senderUserID
    );
    const findReceiverUserByID = usersDataJSON.find(
        (userDB) => userDB.id === receiverUserID
    );
    const senderUserCashCredit =
        findSenderUserByID.credit + findSenderUserByID.cash;
    if (transferAmount < 1 || senderUserCashCredit < transferAmount) {
        return res.status(400).json({
            status: 'fail',
            message:
                'Only positive numbers can be used for withdraw and not more than user total funding ',
        });
    }
    if (senderUserCashCredit.cash <= transferAmount) {
        findSenderUserByID.credit =
            findSenderUserByID.credit -
            (transferAmount - findSenderUserByID.cash);
        findSenderUserByID.cash = 0;
    } else {
        findSenderUserByID.cash = findSenderUserByID.cash - transferAmount;
    }

    findReceiverUserByID.cash += transferAmount;
    writeData(usersDataJSON);
    res.status(200).json({
        status: 'success',
        message: 'Transfer completed',
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
