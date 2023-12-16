package com.smartFarmer.server.parkingAlot.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SearchRangeParkingLotDto {
    private double lat;
    private double lot;
    private int range;
    private int page;
    private int perPage;
    private String content;
}

