package com.smartFarmer.server.auth.controller;

import org.springframework.web.bind.annotation.RestController;

import com.smartFarmer.server.auth.dto.RequestSignupDto;
import com.smartFarmer.server.auth.service.AccountService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
public class AuthController {

    @Autowired
    private AccountService accountService;

    @PostMapping("/auth/signup")
    public ResponseEntity<String> signUp(@RequestBody RequestSignupDto requestSignupDto) {
        return accountService.signup(requestSignupDto);
    }

    @GetMapping("/check/email/{email}")
    public ResponseEntity<Boolean> getMethodName(@PathVariable("email") String email) {
        return accountService.checkEmail(email);
    }
    
}
