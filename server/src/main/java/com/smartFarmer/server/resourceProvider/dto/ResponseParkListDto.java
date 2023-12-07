package com.smartFarmer.server.resourceProvider.dto;

import java.util.List;
import java.util.ArrayList;
import lombok.Getter;

@Getter
public class ResponseParkListDto {

    private Header header;
    private Body body;

    @Getter
    public static class Header {
        private String resultCode;
        private String resultMsg;
    }

    @Getter
    public static class Body {
        private Items items;
    }
    
    @Getter
    private static class Items {
        List<DetailItem> item = new ArrayList<DetailItem>();
    }
    


    @Getter
    private static class DetailItem {
        private String id;
        private String mngNo;
        private String parkNm;
        private String parkType;
        private String roadNmAddr;
        private String lotNoAddr;
        private String lat;
        private String lot;
        private String mngInstNm;
        private String mngInstTel;
        private String dongNm;
        private String sggNm;
    }
}
