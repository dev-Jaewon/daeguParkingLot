package com.smartFarmer.server.resourceProvider.dto;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class SearchParkListDto {
    private String lat;
    private String lot;
    private String radius;
}
