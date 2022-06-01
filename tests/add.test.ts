import {AddRecord} from "../records/add.record";
import {pool} from "../utils/db";
import {AddEntity} from "../types";

afterAll(async () => {
    await pool.end();
});

const defaultObject = {
    name: 'Migros supermarket',
    description: 'blah i poprostu jakis tam opis mojej ulubione moze filii sklepu, w ktorym juz na zarcie ' +
        'przejebalem fhoooj siana ale nie bez powodu. Maja najzajebistrzą icetee',
    url: 'https://filialen.migros.ch/de/migros-supermarkt-st-gallen-neumarkt',
    price: 0,
    lat: 47.4230732,
    lon: 9.3727781,
}


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

test('AdRecord.insert returns new UUID.', async () => {
    const add = new AddRecord(defaultObject);
    await add.insert();

    expect(add.id).toBeDefined();
    expect(typeof add.id).toBe('string');
});

test('AdRecord.insert inserts data into my database.', async () => {
    const add = new AddRecord(defaultObject);
    await add.insert();

    const foundAdd = await AddRecord.getOne(add.id);
    expect(foundAdd).toBeDefined();
    expect(foundAdd).not.toBeNull();
    expect(foundAdd.id).toBe(add.id);

});