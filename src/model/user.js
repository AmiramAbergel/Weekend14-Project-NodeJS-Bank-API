const userObj = (first, last, bank_acc_num, credit, cash, isActive, id) => {
    const user = {
        first: first,
        last: last,
        bank_acc_num: bank_acc_num,
        credit: credit,
        cash: cash,
        isActive: isActive,
        id: id,
    };
    return user;
};

export default userObj;
