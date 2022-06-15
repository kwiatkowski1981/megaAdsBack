import {AdRecord} from "../records/ad.record";

const defaultObject = {
    name: 'Migros supermarket',
    description: 'blah',
    url: 'https://filialen.migros.ch/de/migros-supermarkt-st-gallen-neumarkt',
    price: 0,
    lat: 47.4230732,
    lon: 9.3727781,
}


test('Can create AdRecord', () => {
    const ad = new AdRecord(defaultObject);

    expect(ad.name).toBe('Migros supermarket');
    expect(ad.description).toBe('blah');
});

test('Validates invalid price', () => {
    expect(() => new AdRecord({
        ...defaultObject,
        price: -3,
    })).toThrow('Cena nie może być mniejsza niż 0 i większa niż 9 999 999.00 !')
});