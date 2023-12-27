package com.smartFarmer.server.comment.dto;

import java.util.Date;

public interface CommentInterface {
    String getId();
    String getContent();
    Date getCreateAt();
    String getNickname();
}
