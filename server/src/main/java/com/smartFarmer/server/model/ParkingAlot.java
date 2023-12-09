package com.smartFarmer.server.model;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class ParkingAlot {
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
    private Integer nomalPrice;
    private Integer perTime;
    private Integer perPrice;
    private Double dayPriceTime;
    private Integer dayPrice;
    private Integer regularPrice;
    private String payment;
    private String otherMatters;
    private String managementAgency;
    private String telNumber;
    private String lat;
    private String lot;
    private String theDisabled;
    private String updatedAt;
}
