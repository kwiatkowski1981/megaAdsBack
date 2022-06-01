export interface NewAddEntity extends Omit<AddEntity, 'id'> {
    id?: string;
}

export interface AddEntity {
    id: string;
    name: string;
    description: string;
    price: number;
    url: string;
    lat: number;
    lon: number;
}

export interface SimpleAddEntity extends Pick<AddEntity, 'id' | 'lat' | 'lon'> {}