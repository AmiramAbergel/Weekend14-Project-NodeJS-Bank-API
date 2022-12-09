import fs from 'fs';
const dataURL = '././db/usersList.json';
const usersDataBuffer = fs.readFileSync(dataURL);
export const usersDataJSON = JSON.parse(usersDataBuffer);

export const writeData = (users, newUser) => {
    fs.writeFile(dataURL, JSON.stringify(users), (err) => {
        res.status(201).json({
            status: 'success',
            data: {
                user: newUser,
            },
        });
    });
};
