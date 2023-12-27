package com.smartFarmer.server.comment.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.smartFarmer.server.comment.dto.CommentInterface;
import com.smartFarmer.server.comment.dto.RequestAddComment;

public interface CommentService {
    public ResponseEntity<String> write(RequestAddComment addInfo);

    public ResponseEntity<List<CommentInterface>> list(Long parkingLotId);
}
