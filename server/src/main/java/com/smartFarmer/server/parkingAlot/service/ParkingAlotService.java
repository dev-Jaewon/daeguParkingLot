package com.smartFarmer.server.parkingAlot.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.smartFarmer.server.parkingAlot.dto.SearchDto;
import com.smartFarmer.server.parkingAlot.entity.ParkingAlotEntity;

public interface ParkingAlotService {
    public ResponseEntity<List<ParkingAlotEntity>> searchData(SearchDto serachParam);
}
