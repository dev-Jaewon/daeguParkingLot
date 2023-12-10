package com.smartFarmer.server.parkingAlot.controller;

import org.springframework.web.bind.annotation.RestController;

import com.smartFarmer.server.parkingAlot.dto.SearchRangeParkingAlotDto;
import com.smartFarmer.server.parkingAlot.entity.ParkingAlotEntity;
import com.smartFarmer.server.parkingAlot.service.ParkingAlotService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/parkingAlot")
public class ParkingAlotController {

    @Autowired
    private ParkingAlotService parkingAlotService;

    @GetMapping("/list")
    public ResponseEntity<List<ParkingAlotEntity>> getMethodName(@ModelAttribute SearchRangeParkingAlotDto searchRangeParkingAlotDto ) {
        return parkingAlotService.getList(searchRangeParkingAlotDto);
    }

}
