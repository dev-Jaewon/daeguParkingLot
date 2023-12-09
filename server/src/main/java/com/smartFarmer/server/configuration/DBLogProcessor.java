package com.smartFarmer.server.configuration;

import org.springframework.batch.item.ItemProcessor;

import com.smartFarmer.server.model.ParkingAlot;

public class DBLogProcessor implements ItemProcessor<ParkingAlot, ParkingAlot>
{
    public ParkingAlot process(ParkingAlot parkingAlot) throws Exception
    {
        System.out.println("Inserting ParkingAlot : " + parkingAlot);
        return parkingAlot;
    }
}