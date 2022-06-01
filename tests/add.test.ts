import { AddRecord } from "../records/add.record";
import {pool} from "../utils/db";
import {AddEntity} from "../types";

afterAll( async () => {
    await  pool.end();
});

test('AdRecord.getOne returns data from database for one record.', async () => {
    const add = await AddRecord.getOne('e048335e-e0cb-11ec-a7c8-acde48001122');

    expect(add).toBeDefined();
    expect(add.id).toBe('e048335e-e0cb-11ec-a7c8-acde48001122');
    expect(add.name).toBe('molo w zurich');
});

test('AdRecord.getOne returns null from database for not existing record.', async () => {
    const add = await AddRecord.getOne('e048335e-e0cb-11ec-a7c8-acdeaaooee');

    expect(add).toBeNull();
});

test('AdRecord.findAll returns array of found records.', async () => {
    const adds = await AddRecord.findAll('');

    expect(adds).not.toEqual([]);
    expect(adds[0].id).toBeDefined();
});

test('AdRecord.findAll returns array of found records when searching for "a".', async () => {
    const adds = await AddRecord.findAll('a');

    expect(adds).not.toEqual([]);
    expect(adds[0].id).toBeDefined();
});

test('AdRecord.findAll returns empty array when searching for something that not exist.', async () => {
    const adds = await AddRecord.findAll('-----------------------------------------------');

    expect(adds).toEqual([]);
});

test('AdRecord.findAll returns smaller amount of data.', async () => {
    const adds = await AddRecord.findAll('');

    expect((adds[0] as AddEntity).id).toBeDefined();
    expect((adds[0] as AddEntity).price).toBeUndefined();
});