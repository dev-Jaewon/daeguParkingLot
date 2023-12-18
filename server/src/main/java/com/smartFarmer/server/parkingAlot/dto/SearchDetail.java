package com.smartFarmer.server.parkingAlot.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SearchDetail {
    private String gu;
    private String dong;
    private String ro;
    private String free;
    private String name;
}
