import {AddEntity, NewAddEntity} from "../types";
import {ValidationError} from "../utils/errors";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";

type AddRecordResults = [AddEntity[], FieldPacket[]];

export class AddRecord implements AddEntity {

    public id: string;
    public name: string;
    public description: string;
    public price: number;
    public url: string;
    public lat: number;
    public lon: number;

    constructor(obj: NewAddEntity) {
        if (!obj.name || obj.name.length > 100) {
            throw new ValidationError('Nazwa ogłoszenia nie może być pusta i przekraczać 100 znaków!');
        }

        if (obj.description.length > 1000) {
            throw new ValidationError('Treść ogłoszenia nie może przekraczać 1000 znaków!');
        }

        if (obj.price < 0 || obj.price > 9999999) {
            throw new ValidationError('Cena nie może być mniejsza niż 0 i większa niż 9 999 999.00 !');
        }

        //todo check if url is valid
        if (!obj.url || obj.url.length > 100) {
            throw new ValidationError('Adres(link) ogłoszenia nie może być pusty ani przekraczać 100 znaków!');
        }

        // if(typeof obj.lat && typeof obj.lon !== 'number') {         nie było by lepiej ?
        if (typeof obj.lat !== 'number' || typeof obj.lon !== 'number') {
            throw new ValidationError('Nie można zlokalizować ogłoszenia');
        }

        this.id = obj.id;
        this.name = obj.name;
        this.description = obj.description;
        this.price = obj.price;
        this.url = obj.url;
        this.lat = obj.lat;
        this.lon = obj.lon;
    }

    static async getOne(id: string): Promise<AddRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `adds` WHERE id = :id", {
            id: id,
        }) as AddRecordResults;
        return results.length === 0 ? null : new AddRecord(results[0]);
    }

}