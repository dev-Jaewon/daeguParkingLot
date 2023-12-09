package com.smartFarmer.server.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Entity
@Getter
@RequiredArgsConstructor
public class ParkingAlotEntity {

    @Id
    @GeneratedValue
    private Long id;
    private String manageNum;
    private String name;
    private String division;
    private String type;
    private String streetAddress;
    private String locationAddress;
    private String areaNum;
    private String paperFeed;
    private String endMember;
    private String operatingDay;
    private String operatingStartTime;
    private String operatingEndTime;
    private String operatingSatStartTime;
    private String operatingSatEndTime;
    private String operatingHolidayStartTime;
    private String operatingHolidayEndTime;
    private String priceInformation;
    private String basicTime;
    private Double dayPriceTime;
    private String payment;
    private String otherMatters;
    private String managementAgency;
    private String telNumber;
    private String lat;
    private String lot;
    private String theDisabled;
    private String updatedAt;
    private Integer normalPrice;
    private Integer perTime;
    private Integer perPrice;
    private Integer dayPrice;
    private Integer regularPrice;
}
