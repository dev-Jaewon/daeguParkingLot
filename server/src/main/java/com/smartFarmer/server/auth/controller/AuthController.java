package com.smartFarmer.server.auth.controller;

import org.springframework.web.bind.annotation.RestController;

import com.smartFarmer.server.auth.dto.AccountDto;
import com.smartFarmer.server.auth.dto.RequestLoginDto;
import com.smartFarmer.server.auth.dto.RequestSignupDto;
import com.smartFarmer.server.auth.service.AccountService;

import jakarta.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
public class AuthController {

    private final Logger log = LoggerFactory.getLogger(AuthController.class);

    @Autowired
    private AccountService accountService;

    @PostMapping("/auth/signup")
    public ResponseEntity<Void> signUp(@RequestBody RequestSignupDto requestSignupDto) {
        return accountService.signup(requestSignupDto);
    }

    @PostMapping("/auth/login")
    public ResponseEntity<String> login(@RequestBody RequestLoginDto loginInfo) {
        log.info("loggin = {}", SecurityContextHolder.getContext().getAuthentication().getName());
        return accountService.login(loginInfo);
    }

    @GetMapping("/check/email/{email}")
    public ResponseEntity<Boolean> checkEmail(@PathVariable("email") String email) {
        return accountService.checkEmail(email);
    }

    @GetMapping("/check/nickname/{nickname}")
    public ResponseEntity<Boolean> checkNickName(@PathVariable("nickname") String nickname) {
        return accountService.checkNickName(nickname);
    }

    @GetMapping("/auth/refresh")
    public ResponseEntity<?> tokenRefresh(HttpServletRequest request) {
        return accountService.refreshToken(request);
    }

    @GetMapping("/account")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<AccountDto> account() throws Exception {
        return accountService.account();
    }

}
