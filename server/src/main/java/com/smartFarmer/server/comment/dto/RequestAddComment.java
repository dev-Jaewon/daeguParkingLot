package com.smartFarmer.server.comment.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequestAddComment {
    private String value;
    private Long parkingLotId;
}
