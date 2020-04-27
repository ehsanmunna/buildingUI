
export interface IBuilding {
    Id: number;
    Name: string;
    Location: string;
}

export interface IObject {
    Id: number;
    Name: string;
}
export interface IDataField {
    Id: number;
    Name: string;
}

export interface IReading {
    BuildingId: number;
    ObjectId: number;
    DataFieldId: number;
    Value: string;
    Timestamp: string;
}

export interface IReadingSearch {
    BuildingId: number;
    ObjectId: number;
    DataFieldId: number;
}
