package com.smartFarmer.server.parkingAlot.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.smartFarmer.server.parkingAlot.dto.SearchRangeParkingAlotDto;
import com.smartFarmer.server.parkingAlot.entity.ParkingAlotEntity;
import com.smartFarmer.server.parkingAlot.repository.ParkingAlotRepository;

@Service
public class ParkingAlotServiceImpl implements ParkingAlotService {

    @Autowired
    private ParkingAlotRepository parkingAlotRepository;

    @Override
    public ResponseEntity<List<ParkingAlotEntity>> getList(SearchRangeParkingAlotDto p) {
        List<ParkingAlotEntity> result = parkingAlotRepository.findByRangeParkingAlot(p.getLat(), p.getLot(), p.getRange());

        return ResponseEntity.ok().body(result);
    }
}
