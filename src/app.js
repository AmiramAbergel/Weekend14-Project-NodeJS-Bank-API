import express, { json } from 'express';
import cors from 'cors';
import indexRoute from './Routes/index.router.js';
const app = express();

const PORT = process.env.PORT || 8000;
const BASE_URL = '/api/v1';

app.use(cors());
app.use(json());
app.use(BASE_URL, indexRoute); // localhost:8000/api/v1

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`);
});
