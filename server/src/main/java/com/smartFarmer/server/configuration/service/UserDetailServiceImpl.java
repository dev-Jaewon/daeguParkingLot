package com.smartFarmer.server.configuration.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.smartFarmer.server.auth.entity.AccountEntity;
import com.smartFarmer.server.auth.repository.AccountRepository;

import jakarta.transaction.Transactional;

@Service
public class UserDetailServiceImpl implements UserDetailsService {

    @Autowired
    AccountRepository accountRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        AccountEntity user = accountRepository.findByEmail(email);

        return UserDetailsImpl.build(user);
    }
}
