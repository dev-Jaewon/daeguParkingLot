package com.smartFarmer.server.auth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.smartFarmer.server.auth.dto.RequestSignupDto;
import com.smartFarmer.server.auth.entity.AccountEntity;
import com.smartFarmer.server.auth.repository.AccountRepository;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AccountRepository accountRepository;

    public ResponseEntity<Boolean> signup(RequestSignupDto requestSignupDto) {

        String encodePassword = passwordEncoder.encode(requestSignupDto.getPassword());

        AccountEntity signupInfo = new AccountEntity(null, requestSignupDto.getEmail(), encodePassword,
                requestSignupDto.getNickName(), "USER");

        try {
            accountRepository.save(signupInfo);
        } catch (Exception e) {
            return ResponseEntity.status(409).body(false);
        }

        return ResponseEntity.ok().body(true);
    }

    public ResponseEntity<Boolean> checkEmail(String email) {
        AccountEntity res = accountRepository.findByEmail(email);

        return ResponseEntity.ok().body(res == null);
    }

    public ResponseEntity<Boolean> checkNickName(String nickname) {
        AccountEntity res = accountRepository.findByNickname(nickname);

        return ResponseEntity.ok().body(res == null);
    }
}
