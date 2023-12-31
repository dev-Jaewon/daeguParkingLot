import { ParkingLot } from "./ParkingLot";

export interface ResponseSearchList {
    page: number;
    size: number;
    lastPage: number;
    list: Array<ParkingLot>;
    markers: Array<ParkingLot>;
}