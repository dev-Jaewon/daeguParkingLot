package com.smartFarmer.server.configuration.service;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import com.smartFarmer.server.auth.entity.AccountEntity;


public class AccountContext extends User {
    private AccountEntity account;

    public AccountContext(AccountEntity account, Collection<? extends GrantedAuthority> authorities){
        super(account.getEmail(), account.getPassword(), authorities);
        this.account = account;
    }

    public AccountEntity getAccount(){
        return account;
    }
}