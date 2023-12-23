package com.smartFarmer.server.auth.service;

import org.springframework.http.ResponseEntity;

import com.smartFarmer.server.auth.dto.RequestSignupDto;

public interface AccountService {
    public ResponseEntity<Boolean> signup(RequestSignupDto requestSignupDto);    
    public ResponseEntity<Boolean> checkEmail(String email);
    public ResponseEntity<Boolean> checkNickName(String nickname);
}