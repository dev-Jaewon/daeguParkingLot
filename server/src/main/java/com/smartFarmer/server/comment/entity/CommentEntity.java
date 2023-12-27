package com.smartFarmer.server.comment.entity;

import java.util.Date;

import com.smartFarmer.server.auth.entity.AccountEntity;
import com.smartFarmer.server.parkingAlot.entity.ParkingLotEntity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "comment")
@Getter
@Setter
@AllArgsConstructor
public class CommentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String content;

    @ManyToOne
    @JoinColumn(name = "account_id")
    private AccountEntity account;

    @ManyToOne
    @JoinColumn(name = "parkinglot_id")
    private ParkingLotEntity parkingLot;

    private Date createAt;

    public CommentEntity() {
    }
}
