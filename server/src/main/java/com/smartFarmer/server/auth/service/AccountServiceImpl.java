package com.smartFarmer.server.auth.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.smartFarmer.server.auth.dto.RequestSignupDto;
import com.smartFarmer.server.auth.entity.AccountEntity;
import com.smartFarmer.server.auth.repository.AccountRepository;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private AccountRepository accountRepository;

    public ResponseEntity<String> signup(RequestSignupDto requestSignupDto) {

        AccountEntity signupInfo = new AccountEntity(null, requestSignupDto.getEmail(), requestSignupDto.getPassword(), requestSignupDto.getNickName(), "USER");

        try {
            accountRepository.save(signupInfo);
        } catch (Exception e) {
            System.out.println(e);
        }

        return ResponseEntity.ok().body(null);
    }
}
