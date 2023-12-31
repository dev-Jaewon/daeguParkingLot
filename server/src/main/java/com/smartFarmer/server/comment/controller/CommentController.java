package com.smartFarmer.server.comment.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smartFarmer.server.comment.dto.CommentInterface;
import com.smartFarmer.server.comment.dto.PutComment;
import com.smartFarmer.server.comment.dto.RequestAddComment;
import com.smartFarmer.server.comment.service.CommentService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@RequestMapping("/comment")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping("/write")
    public ResponseEntity<String> write(@RequestBody RequestAddComment addInfo) throws Exception {
        return commentService.write(addInfo);
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<CommentInterface>> list(@PathVariable("id") Long id) {
        return commentService.list(id);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable("id") Long id){
        return commentService.delete(id);
    }

    @PutMapping
    public ResponseEntity<Void> put(@RequestBody PutComment putCommentInfo) {
        return commentService.put(putCommentInfo);
    }
}
