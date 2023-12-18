package com.smartFarmer.server.parkingAlot.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SearchDto {
    private double lat;
    private double lot;
    private int range;
    private String content;
    private int page;
    private int perPage;
}
