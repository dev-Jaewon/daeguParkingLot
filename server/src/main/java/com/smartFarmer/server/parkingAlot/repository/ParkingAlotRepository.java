package com.smartFarmer.server.parkingAlot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.smartFarmer.server.parkingAlot.entity.ParkingAlotEntity;

@Repository
public interface ParkingAlotRepository extends JpaRepository<ParkingAlotEntity, Long> {

    @Query(value = "select * FROM parkingalot " +
            "WHERE ST_DWithin ( " +
            "geography ( ST_SetSRID ( ST_Point ( lot , lat ) , 4326 ) ) ," +
            "geography ( ST_SetSRID ( ST_Point ( :lot , :lat ) , 4326 ) ) , :range )", nativeQuery = true)
    public List<ParkingAlotEntity>findByRangeParkingAlot (double lat, double lot, int range);

}
