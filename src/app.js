import express from 'express';

const app = express();

const PORT = process.env.PORT || 8000;
const BASE_URL = '/';

app.use(json());

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`);
});
