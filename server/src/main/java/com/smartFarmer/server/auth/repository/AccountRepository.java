package com.smartFarmer.server.auth.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.smartFarmer.server.auth.entity.AccountEntity;

@Repository
public interface AccountRepository extends JpaRepository<AccountEntity, Long> {
    public List<AccountEntity> findAll();
    public AccountEntity findByEmail(String email);
    public AccountEntity findByNickname(String nickname);
}
