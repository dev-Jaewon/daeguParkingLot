import { ParkingLot } from "./ParkingLot";

export interface ResponseSearchList {
    page: number;
    size: number;
    list: Array<ParkingLot>;
    markers: Array<ParkingLot>;
}