package com.smartFarmer.server.comment.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PutComment {
    private Long id;
    private String content;
}
