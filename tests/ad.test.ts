import {AdRecord} from "../records/ad.record";
import {pool} from "../utils/db";
import {AdEntity} from "../types";

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
    const ad = await AdRecord.getOne('9ed4f0ca-e322-11ec-a7c8-acde48001122');

    expect(ad).toBeDefined();
    expect(ad.id).toBe('9ed4f0ca-e322-11ec-a7c8-acde48001122');
    expect(ad.name).toBe('molo w zurich');
});

test('AdRecord.getOne returns null from database for not existing record.', async () => {
    const ad = await AdRecord.getOne('e048335e-e0cb-11ec-a7c8-acdeaaooee');

    expect(ad).toBeNull();
});

test('AdRecord.findAll returns array of found records.', async () => {
    const ads = await AdRecord.findAll('');

    expect(ads).not.toEqual([]);
    expect(ads[0].id).toBeDefined();
});

test('AdRecord.findAll returns array of found records when searching for "a".', async () => {
    const ads = await AdRecord.findAll('a');

    expect(ads).not.toEqual([]);
    expect(ads[0].id).toBeDefined();
});

test('AdRecord.findAll returns empty array when searching for something that not exist.', async () => {
    const ads = await AdRecord.findAll('-----------------------------------------------');

    expect(ads).toEqual([]);
});

test('AdRecord.findAll returns smaller amount of data.', async () => {
    const ads = await AdRecord.findAll('');

    expect((ads[0] as AdEntity).id).toBeDefined();
    expect((ads[0] as AdEntity).price).toBeUndefined();
});

test('AdRecord.insert returns new UUID.', async () => {
    const ad = new AdRecord(defaultObject);
    await ad.insert();

    expect(ad.id).toBeDefined();
    expect(typeof ad.id).toBe('string');
});

test('AdRecord.insert inserts data into my database.', async () => {
    const ad = new AdRecord(defaultObject);
    await ad.insert();

    const foundAd = await AdRecord.getOne(ad.id);
    expect(foundAd).toBeDefined();
    expect(foundAd).not.toBeNull();
    expect(foundAd.id).toBe(ad.id);
});