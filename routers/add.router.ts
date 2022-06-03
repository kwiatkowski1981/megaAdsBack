import {Router} from "express";
import {AddRecord} from "../records/add.record";

export const addRouter = Router()

    .get('/search/:name?', async (req, res) => {
        const adds = await AddRecord.findAll(req.params.name ?? ''); // jeśli nic nie będzie podane to zwróć pusty string
        res.json(adds);
    })
    .get('/:id', async (req, res) => {
        const add = await AddRecord.getOne(req.params.id);
        res.json(add);
    })
    .get('/', async (req, res) => {
        const add = new AddRecord(req.body);
        await add.insert();
        res.json(add);
    });
