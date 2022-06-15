import express, {json} from 'express';
import cors from 'cors';
import 'express-async-errors';
import {handleError} from "./utils/errors";
import rateLimit from 'express-rate-limit'
import {adRouter} from "./routers/ad.router";


const app = express();
const PROTOCOL = 'http://'
const HOST_FE = 'localhost';
const PORT_FE = 3000;

const HOST_BE = '0.0.0.0';
const PORT_BE = 3001;


app.use(cors({
    origin: `${PROTOCOL}${HOST_FE}:${PORT_FE}`
}));
app.use(json());

app.use(rateLimit({
    windowMs: 5 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
}));

app.use('/ad', adRouter);

app.use(handleError);

app.listen(PORT_BE, HOST_BE, () => {
    console.log(`Listening on: ${PROTOCOL}${HOST_FE}:${PORT_BE}`);
});