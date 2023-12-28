package com.smartFarmer.server.auth.service;

import java.util.Date;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.smartFarmer.server.auth.entity.AccountEntity;
import com.smartFarmer.server.auth.entity.RefreshTokenEntity;
import com.smartFarmer.server.auth.repository.AccountRepository;
import com.smartFarmer.server.auth.repository.RefreshTokenRepository;

@Service
public class RefreshTokenServiceImpl implements RefreshTokenService {

    @Value("${jwt.jwtRefreshExpirationMs}")
    private int refreshTokenDurationMs;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    public RefreshTokenEntity createToken(Long accountId){
        RefreshTokenEntity refreshToken = new RefreshTokenEntity();

        Optional<AccountEntity> account = accountRepository.findById(accountId);

        RefreshTokenEntity token = refreshTokenRepository.findByAccountId(account.get().getId());

        if( token != null ){
            refreshTokenRepository.delete(token);
        }

        refreshToken.setAccount(account.get());
        refreshToken.setExpireDate(new Date(System.currentTimeMillis() + 60000 * refreshTokenDurationMs));
        refreshToken.setToken(UUID.randomUUID().toString());

        return refreshTokenRepository.save(refreshToken);
    }

    public Optional<RefreshTokenEntity> findFromRepo(String token) {
        return refreshTokenRepository.findByToken(token);
    }

    public RefreshTokenEntity checkExpired(RefreshTokenEntity token) {
        if (token.getExpireDate().compareTo(new Date(System.currentTimeMillis())) < 0) {
            refreshTokenRepository.delete(token);
        }

        return token;
    }
}
