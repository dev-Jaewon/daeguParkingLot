package com.smartFarmer.server.resourceProvider.service.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.smartFarmer.server.resourceProvider.dto.ResponseParkListDto;
import com.smartFarmer.server.resourceProvider.dto.SearchParkListDto;
import com.smartFarmer.server.resourceProvider.service.CpService;

import java.net.URI;

@Service
public class CpServiceImpl implements CpService {

    private String URL = "http://apis.data.go.kr/6270000/dgInParkexeequip/getDgExeequipParkList";

    private String KEY = "OaLRFdr48Iip9SSQKerhQpiQVDmJ%2FiyjAGtdt7IVsm%2FY0f6UfWH9MVX1S87igQiC1QMAOU2aeYx7Jqvfoy%2BQIA%3D%3D";

    @Autowired
    private RestTemplate restTemplate;

    @Override
    public ResponseEntity<ResponseParkListDto.Body> getParkList(SearchParkListDto searchParkListDto) {
        System.out.println(searchParkListDto);

        URI uri = UriComponentsBuilder.fromHttpUrl(URL)
                .queryParam("type", "json")
                .queryParam("serviceKey", KEY)
                .queryParam("pageNo", 1)
                .queryParam("numOfRows", 999999)
                .queryParam("lat", searchParkListDto.getLat())
                .queryParam("lot", searchParkListDto.getLot())
                .queryParam("radius", 2)
                .build(true).toUri();

        ResponseParkListDto result = restTemplate.getForObject(uri, ResponseParkListDto.class);

        return ResponseEntity.ok().body(result.getBody());
    }
}
