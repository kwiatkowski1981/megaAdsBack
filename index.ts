import express, {json} from 'express';
import cors from 'cors';
import 'express-async-errors';
import {handleError, ValidationError} from "./utils/errors";


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

// Routes...

// app.get('/', async (req, res) => {
//     throw new ValidationError('Daaaaaaaamn!');
// })

app.use(handleError);

app.listen(PORT_BE, HOST_BE, ()=> {
    console.log(`Listening on: ${PROTOCOL}${HOST_FE}:${PORT_BE}`);
});