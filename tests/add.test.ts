import { AddRecord } from "../records/add.record";

test('AdRecord returns data from database for one record.', async () => {
    const add = await AddRecord.getOne('e048335e-e0cb-11ec-a7c8-acde48001122');

    expect(add).toBeDefined();
    expect(add.id).toBe('e048335e-e0cb-11ec-a7c8-acde48001122');
    expect(add.name).toBe('testowa');
});

test('AdRecord returns null from database for not existing record.', async () => {
    const add = await AddRecord.getOne('e048335e-e0cb-11ec-a7c8-acdeaaooee');

    expect(add).toBeNull();

});