import {AddRecord} from "../records/add.record";

const defaultObject = {
    name: 'Migros supermarket',
    description: 'blah',
    url: 'https://filialen.migros.ch/de/migros-supermarkt-st-gallen-neumarkt',
    price: 0,
    lat: 47.4230732,
    lon: 9.3727781,
}


test('Can create AddRecord', () => {
    const add = new AddRecord(defaultObject);

    expect(add.name).toBe('Migros supermarket');
    expect(add.description).toBe('blah');
});

test('Validates invalid price', () => {
    expect(() => new AddRecord({
        ...defaultObject,
        price: -3,
    })).toThrow('Cena nie może być mniejsza niż 0 i większa niż 9 999 999 !')
});