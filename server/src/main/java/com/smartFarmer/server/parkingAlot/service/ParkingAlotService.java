package com.smartFarmer.server.parkingAlot.service;

import org.springframework.http.ResponseEntity;

import com.smartFarmer.server.parkingAlot.dto.ResponseParkingLot;
import com.smartFarmer.server.parkingAlot.dto.SearchDto;

public interface ParkingAlotService {
    public ResponseEntity<ResponseParkingLot> searchData(SearchDto serachParam);
}
