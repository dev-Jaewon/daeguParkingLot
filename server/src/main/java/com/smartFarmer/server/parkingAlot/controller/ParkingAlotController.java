package com.smartFarmer.server.parkingAlot.controller;

import org.springframework.web.bind.annotation.RestController;

import com.smartFarmer.server.parkingAlot.dto.ResponseParkingLot;
import com.smartFarmer.server.parkingAlot.dto.SearchDto;
import com.smartFarmer.server.parkingAlot.service.ParkingAlotService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;


@RestController
@RequestMapping("/parkingLot")
public class ParkingAlotController {

    @Autowired
    private ParkingAlotService parkingAlotService;

    @GetMapping("/search")
    public ResponseEntity<ResponseParkingLot> getMethodName(@ModelAttribute SearchDto searchRangeParkingAlotDto ) {
        return parkingAlotService.searchData(searchRangeParkingAlotDto);
    }

}
