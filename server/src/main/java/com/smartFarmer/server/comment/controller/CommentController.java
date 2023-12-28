package com.smartFarmer.server.comment.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.smartFarmer.server.comment.dto.CommentInterface;
import com.smartFarmer.server.comment.dto.RequestAddComment;
import com.smartFarmer.server.comment.service.CommentService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

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
    
}
