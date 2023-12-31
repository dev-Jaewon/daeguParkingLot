package com.smartFarmer.server.parkingAlot.dto;

import java.util.List;

import com.smartFarmer.server.parkingAlot.entity.ParkingLotEntity;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ResponseParkingLot {
    private int page;
    private int size;
    private int lastPage;
    private List<ParkingLotEntity> list;
    private List<ParkingLotEntity> markers;
}
