package com.smartFarmer.server.comment.repository;

import org.springframework.data.jpa.repository.Query;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.smartFarmer.server.comment.dto.CommentInterface;
import com.smartFarmer.server.comment.entity.CommentEntity;

@Repository
public interface CommentRepository extends JpaRepository<CommentEntity, Long> {

    @Query(value = "select co.id, co.content, co.create_at as createAt, ac.nickname as nickname from comment co LEFT JOIN account ac ON co.account_id = ac.id where co.parkinglot_id = :id order by co.id desc", nativeQuery = true)
    public List<CommentInterface> findByParkingLot(@Param(value = "id") Long id);
}
