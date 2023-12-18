package com.smartFarmer.server.parkingAlot.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.smartFarmer.server.parkingAlot.entity.ParkingAlotEntity;

@Repository
public interface ParkingAlotRepository
        extends JpaRepository<ParkingAlotEntity, Long>, JpaSpecificationExecutor<ParkingAlotEntity> {

    List<ParkingAlotEntity> findAll(Pageable pageable, Specification<ParkingAlotEntity> spec);
}
