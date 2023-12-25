package com.smartFarmer.server.parkingAlot.dto;

import java.util.List;

import com.smartFarmer.server.parkingAlot.entity.ParkingLotEntity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
@Setter
public class ResponseParkingLot {
    private int page;
    private int size;
    private List<ParkingLotEntity> list;
    private List<ParkingLotEntity> markers;
}
