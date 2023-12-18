package com.smartFarmer.server.parkingAlot.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.smartFarmer.server.parkingAlot.dto.SearchDto;
import com.smartFarmer.server.parkingAlot.entity.ParkingAlotEntity;
import com.smartFarmer.server.parkingAlot.repository.ParkingAlotRepository;
import com.smartFarmer.server.parkingAlot.repository.specification.SearchSpecification;

@Service
public class ParkingAlotServiceImpl implements ParkingAlotService {

    @Autowired
    private ParkingAlotRepository parkingAlotRepository;

    @Override
    public ResponseEntity<List<ParkingAlotEntity>> searchData(SearchDto p) {
        Pageable pagination = PageRequest.of(p.getPage(), p.getPerPage());
        List<ParkingAlotEntity> result = parkingAlotRepository.findAll(pagination, SearchSpecification.search(p));

        return ResponseEntity.ok().body(result);
    }

}
