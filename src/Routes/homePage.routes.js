import { Router } from 'express';

export const homePageRouter = Router();
export const instruction = () => {
    return 'hey';
};

homePageRouter.route(``).get(instruction);
