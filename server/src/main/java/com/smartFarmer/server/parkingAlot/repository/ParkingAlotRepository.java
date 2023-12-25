package com.smartFarmer.server.parkingAlot.repository;

import java.util.List;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.smartFarmer.server.parkingAlot.entity.ParkingLotEntity;

@Repository
public interface ParkingAlotRepository
        extends JpaRepository<ParkingLotEntity, Long>, JpaSpecificationExecutor<ParkingLotEntity> {

    List<ParkingLotEntity> findAll(Specification<ParkingLotEntity> spec);
}
