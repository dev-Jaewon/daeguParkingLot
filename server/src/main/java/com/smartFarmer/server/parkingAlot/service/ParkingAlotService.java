package com.smartFarmer.server.parkingAlot.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.smartFarmer.server.parkingAlot.dto.SearchRangeParkingAlotDto;
import com.smartFarmer.server.parkingAlot.entity.ParkingAlotEntity;

public interface ParkingAlotService {
    public ResponseEntity<List<ParkingAlotEntity>> getList(SearchRangeParkingAlotDto serachParam);
}
