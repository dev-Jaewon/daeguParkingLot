package com.smartFarmer.server.parkingAlot.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SearchRangeParkingAlotDto {
    private double lat;
    private double lot;
    private int range;
}
