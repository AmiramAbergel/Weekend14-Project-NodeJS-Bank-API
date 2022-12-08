import fs from 'fs';
const dataURL = '././db/usersList.json';
const usersDataBuffer = fs.readFileSync(dataURL);
export const usersDataJSON = JSON.parse(usersDataBuffer);
