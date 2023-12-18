package com.smartFarmer.server.parkingAlot.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.smartFarmer.server.parkingAlot.dto.ResponseParkingLot;
import com.smartFarmer.server.parkingAlot.dto.SearchDto;
import com.smartFarmer.server.parkingAlot.entity.ParkingAlotEntity;
import com.smartFarmer.server.parkingAlot.repository.ParkingAlotRepository;
import com.smartFarmer.server.parkingAlot.repository.specification.SearchSpecification;

@Service
public class ParkingAlotServiceImpl implements ParkingAlotService {

    @Autowired
    private ParkingAlotRepository parkingAlotRepository;

    @Override
    public ResponseEntity<ResponseParkingLot> searchData(SearchDto p) {

        List<ParkingAlotEntity> result = parkingAlotRepository.findAll(SearchSpecification.search(p));

        List<List<ParkingAlotEntity>> pagination = setPagination(result, p.getPage(), p.getPerPage());

        if (result.size() == 0) {
            return ResponseEntity.ok()
                    .body(new ResponseParkingLot(p.getPage(), result.size(), result, result));
        }

        return ResponseEntity.ok()
                .body(new ResponseParkingLot(p.getPage(), result.size(), pagination.get(0), result));

    }

    private static List<List<ParkingAlotEntity>> setPagination(List<ParkingAlotEntity> list, int page, int perPage) {
        List<List<ParkingAlotEntity>> sublists = new ArrayList<>();

        if (list.size() == 0)
            return sublists;

        if (page == Math.ceil((double) list.size() / perPage)) {
            sublists.add(list.subList(0, ((page - 1) * perPage) + Math.round(list.size() % perPage)));
        } else if (page * perPage >= list.size()) {
            sublists.add(list.subList(page, list.size() - 1));
        } else {
            sublists.add(list.subList(0, (page) * perPage));
        }

        return sublists;
    }

}
