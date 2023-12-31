package com.smartFarmer.server.comment.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.smartFarmer.server.comment.dto.CommentInterface;
import com.smartFarmer.server.comment.dto.PutComment;
import com.smartFarmer.server.comment.dto.RequestAddComment;

public interface CommentService {
    public ResponseEntity<String> write(RequestAddComment addInfo) throws Exception;

    public ResponseEntity<List<CommentInterface>> list(Long parkingLotId);

    public ResponseEntity<Void> delete(Long id);

    public ResponseEntity<Void> put(PutComment putCommentInfo);
}
