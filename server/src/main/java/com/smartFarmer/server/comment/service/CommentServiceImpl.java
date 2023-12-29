package com.smartFarmer.server.comment.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.smartFarmer.server.auth.entity.AccountEntity;
import com.smartFarmer.server.auth.repository.AccountRepository;
import com.smartFarmer.server.comment.dto.CommentInterface;
import com.smartFarmer.server.comment.dto.PutComment;
import com.smartFarmer.server.comment.dto.RequestAddComment;
import com.smartFarmer.server.comment.entity.CommentEntity;
import com.smartFarmer.server.comment.repository.CommentRepository;
import com.smartFarmer.server.parkingAlot.entity.ParkingLotEntity;
import com.smartFarmer.server.parkingAlot.repository.ParkingAlotRepository;

import org.springframework.security.core.Authentication;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private ParkingAlotRepository parkingAlotRepository;

    public ResponseEntity<String> write(RequestAddComment addInfo) throws Exception {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        String email = authentication.getName();

        if (email == "anonymousUser") {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED);
        }

        AccountEntity account = accountRepository.findByEmail(email);

        Optional<ParkingLotEntity> parkingLot = parkingAlotRepository.findById(addInfo.getParkingLotId());

        commentRepository.save(new CommentEntity(null, addInfo.getValue(), account, parkingLot.get(), LocalDate.now()));

        return ResponseEntity.ok().body(null);
    }

    public ResponseEntity<List<CommentInterface>> list(Long parkingLotId) {
        try {
            List<CommentInterface> result = commentRepository.findByParkingLot(parkingLotId);

            return ResponseEntity.ok().body(result);

        } catch (Exception e) {
            System.out.println(e);
        }
        return null;
    }

    public ResponseEntity<Void> delete(Long id){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        Optional<CommentEntity> comment = commentRepository.findById(id);

        if(!comment.isEmpty() && comment.get().getAccount().getEmail().equals(authentication.getName())){
            commentRepository.delete(comment.get());
        }else{
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        return ResponseEntity.ok().build();
    }

    public ResponseEntity<Void> put(PutComment putCommentInfo){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        CommentEntity comment = commentRepository.findById(putCommentInfo.getId()).get();

        if(!comment.getAccount().getEmail().equals(auth.getName())){
            return ResponseEntity.badRequest().build();
        }

        comment.setContent(putCommentInfo.getContent());
        commentRepository.save(comment);

        return ResponseEntity.ok().build();
    }
}
