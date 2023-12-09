package com.smartFarmer.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.smartFarmer.server.entity.ParkingAlotEntity;

public interface ParkingAlotRepository extends JpaRepository<ParkingAlotEntity, Long> {
    
}
