import express, {json, Router} from 'express';
import cors from 'cors';
import 'express-async-errors';
import {handleError} from "./utils/errors";
import rateLimit from 'express-rate-limit'
import {adRouter} from "./routers/ad.router";
import {config} from "./config/config";


const app = express();
const PROTOCOL = 'http://'
const HOST_FE = 'localhost';
const PORT_FE = 3000;

const HOST_BE = '0.0.0.0';
const PORT_BE = 3001;


app.use(cors({
    origin: config.corsOrigin,
}));
app.use(json());

app.use(rateLimit({
    windowMs: 5 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
}));

const router = Router();
router.use('/ad', adRouter);
app.use('/api', router);

app.use(handleError);

app.listen(PORT_BE, HOST_BE, () => {
    console.log(`Listening on: ${PROTOCOL}${HOST_FE}:${PORT_BE}`);
});