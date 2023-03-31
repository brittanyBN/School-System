import express, {Express} from 'express';
import dotenv from 'dotenv';
import {routes} from "./src/routes";

// SETUP
dotenv.config();
export const app: Express = express();
const port = process.env.PORT;
import cookieParser from 'cookie-parser';

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());


// ROUTES
app.use('/', routes)

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});