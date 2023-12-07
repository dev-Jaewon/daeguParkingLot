package com.smartFarmer.server.resourceProvider.controller;

import org.springframework.web.bind.annotation.RestController;

import com.smartFarmer.server.resourceProvider.dto.ResponseParkListDto;
import com.smartFarmer.server.resourceProvider.service.CpService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/cp")
public class CpController {

    @Autowired
    private CpService cpService;

    @GetMapping("/parkList")
    public ResponseEntity<ResponseParkListDto.Body> getParkList() {
        return cpService.getParkList();
    }
}
