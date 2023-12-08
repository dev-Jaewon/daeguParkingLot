package com.smartFarmer.server.resourceProvider.service;

import org.springframework.http.ResponseEntity;

import com.smartFarmer.server.resourceProvider.dto.ResponseParkListDto;
import com.smartFarmer.server.resourceProvider.dto.SearchParkListDto;

public interface CpService {
    public ResponseEntity<ResponseParkListDto.Body> getParkList(SearchParkListDto searchParkListDto);
}
