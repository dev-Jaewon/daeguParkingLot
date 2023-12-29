package com.smartFarmer.server.auth.service;

import org.springframework.http.ResponseEntity;

import com.smartFarmer.server.auth.dto.AccountDto;
import com.smartFarmer.server.auth.dto.RequestLoginDto;
import com.smartFarmer.server.auth.dto.RequestSignupDto;
import com.smartFarmer.server.auth.entity.AccountEntity;

import jakarta.servlet.http.HttpServletRequest;

public interface AccountService {
    public ResponseEntity<Void> signup(RequestSignupDto requestSignupDto);

    public ResponseEntity<Boolean> checkEmail(String email);

    public ResponseEntity<Boolean> checkNickName(String nickname);

    public ResponseEntity<String> login(RequestLoginDto loginInfo);

    public ResponseEntity<Boolean> refreshToken(HttpServletRequest request);

    public AccountEntity findByEmail(String email);

    public ResponseEntity<AccountDto> account();
}
