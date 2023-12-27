package com.smartFarmer.server.auth.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.smartFarmer.server.auth.entity.RefreshTokenEntity;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshTokenEntity, Long> {
    public Optional<RefreshTokenEntity> findByToken(String token);
    public RefreshTokenEntity findByAccountId(Long account);
}
