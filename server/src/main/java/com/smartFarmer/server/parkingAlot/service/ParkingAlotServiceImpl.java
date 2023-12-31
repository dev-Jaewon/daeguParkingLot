package com.smartFarmer.server.parkingAlot.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.smartFarmer.server.parkingAlot.dto.ResponseParkingLot;
import com.smartFarmer.server.parkingAlot.dto.SearchDto;
import com.smartFarmer.server.parkingAlot.entity.ParkingLotEntity;
import com.smartFarmer.server.parkingAlot.repository.ParkingAlotRepository;
import com.smartFarmer.server.parkingAlot.repository.specification.SearchSpecification;

@Service
public class ParkingAlotServiceImpl implements ParkingAlotService {

    @Autowired
    private ParkingAlotRepository parkingAlotRepository;

    @Override
    public ResponseEntity<ResponseParkingLot> searchData(SearchDto p) {
        List<ParkingLotEntity> searchAll = parkingAlotRepository.findAll(SearchSpecification.search(p));

        List<ParkingLotEntity> pageList = setPagination(searchAll, p.getPage(), p.getPerPage());

        ResponseParkingLot resData = ResponseParkingLot
                .builder().page(p.getPage()).size(searchAll.size())
                .lastPage((int) Math.ceil((double) searchAll.size() / (double) p.getPerPage()))
                .list(pageList).markers(searchAll)
                .build();

        return ResponseEntity.ok().body(resData);
    }

    private static List<ParkingLotEntity> setPagination(List<ParkingLotEntity> list, int page, int perPage) {
        if (list.size() == 0) {
            return new ArrayList<>();
        }

        if (page * perPage >= list.size()) {
            return list;
        } else {
            return list.subList(0, perPage * page);
        }
    }
}
