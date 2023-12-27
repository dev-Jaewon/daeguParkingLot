package com.smartFarmer.server.auth.service;

import org.springframework.http.ResponseEntity;

import com.smartFarmer.server.auth.dto.RequestLoginDto;
import com.smartFarmer.server.auth.dto.RequestSignupDto;
import com.smartFarmer.server.auth.entity.AccountEntity;

import jakarta.servlet.http.HttpServletRequest;

public interface AccountService {
    public ResponseEntity<Void> signup(RequestSignupDto requestSignupDto);

    public ResponseEntity<Boolean> checkEmail(String email);

    public ResponseEntity<Boolean> checkNickName(String nickname);

    public ResponseEntity<String> tokenRefresh(String token);

    public ResponseEntity<String> login(RequestLoginDto loginInfo);

    public ResponseEntity<?> refreshToken(HttpServletRequest request);

    public AccountEntity findByEmail(String email);
}
