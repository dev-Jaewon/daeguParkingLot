package com.smartFarmer.server.auth.service;

import java.util.Optional;

import com.smartFarmer.server.auth.entity.RefreshTokenEntity;

public interface RefreshTokenService {
    public RefreshTokenEntity createToken(Long accountId);
    public Optional<RefreshTokenEntity> findFromRepo(String token);
    public RefreshTokenEntity checkExpired(RefreshTokenEntity token);
}
