package com.smartFarmer.server.auth.service;

import java.util.Set;
import java.util.HashSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.util.WebUtils;

import com.smartFarmer.server.auth.dto.AccountDto;
import com.smartFarmer.server.auth.dto.RequestLoginDto;
import com.smartFarmer.server.auth.dto.RequestSignupDto;
import com.smartFarmer.server.auth.entity.AccountEntity;
import com.smartFarmer.server.auth.entity.RefreshTokenEntity;
import com.smartFarmer.server.auth.entity.RolesEntity;
import com.smartFarmer.server.auth.repository.AccountRepository;
import com.smartFarmer.server.auth.repository.RolesRepository;
import com.smartFarmer.server.configuration.JwtProvider;
import com.smartFarmer.server.configuration.service.UserDetailsImpl;
import com.smartFarmer.server.constance.Roles;
import com.smartFarmer.server.exceptions.exception.ServerErrorException;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

@Service
public class AccountServiceImpl implements AccountService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private RolesRepository rolesRepository;

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private RefreshTokenService refreshTokenService;

    public ResponseEntity<Void> signup(RequestSignupDto requestSignupDto)throws Exception {

        String encodePassword = passwordEncoder.encode(requestSignupDto.getPassword());

        AccountEntity signupInfo = new AccountEntity(requestSignupDto.getEmail(), encodePassword,
                requestSignupDto.getNickName());

        Set<RolesEntity> role = new HashSet<>();

        RolesEntity findRole = rolesRepository.findByName(Roles.ROLE_USER);

        if (findRole == null) {
            throw new ServerErrorException("DB에 등록된 권한이 없습니다.");
        }

        role.add(findRole);
        signupInfo.setRoles(role);
        accountRepository.save(signupInfo);

        return ResponseEntity.ok().body(null);

    }

    public ResponseEntity<String> login(RequestLoginDto loginInfo) {
        Authentication authentication = authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(loginInfo.getEmail(),
                        loginInfo.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        ResponseCookie jwtCookie = jwtProvider.generateJwtCookie(userDetails.getUsername());

        RefreshTokenEntity refreshToken = refreshTokenService.createToken(userDetails.getId());

        ResponseCookie jwtRefreshCookie = jwtProvider.generateRefreshJwtCookie(refreshToken.getToken());

        return ResponseEntity
                .ok()
                .header(HttpHeaders.SET_COOKIE, jwtCookie.toString())
                .header(HttpHeaders.SET_COOKIE, jwtRefreshCookie.toString())
                .body(null);
    }

    public ResponseEntity<Boolean> refreshToken(HttpServletRequest request) {
        Cookie refreshToken = WebUtils.getCookie(request, "refreshCookie");
        
        if(refreshToken == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        return refreshTokenService
                .findFromRepo(refreshToken.getValue())
                .map(refreshTokenService::checkExpired)
                .map(RefreshTokenEntity::getAccount)
                .map(account -> {
                    ResponseCookie accessToken = jwtProvider.generateJwtCookie(account.getEmail());

                    return ResponseEntity
                            .ok()
                            .header(HttpHeaders.SET_COOKIE, accessToken.toString())
                            .body(true);
                })
                .orElseThrow(() -> {
                    return null;
                });
    }

    public AccountEntity findByEmail(String email) {
        return accountRepository.findByEmail(email);
    }

    public ResponseEntity<Boolean> checkEmail(String email) {
        AccountEntity res = accountRepository.findByEmail(email);

        return ResponseEntity.ok().body(res == null);
    }

    public ResponseEntity<Boolean> checkNickName(String nickname) {
        AccountEntity res = accountRepository.findByNickname(nickname);

        return ResponseEntity.ok().body(res == null);
    }

    public ResponseEntity<AccountDto> account() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        AccountEntity result = accountRepository.findByEmail(auth.getName());

        AccountDto account = new AccountDto(
                result.getId(),
                result.getEmail(),
                result.getNickname());

        return ResponseEntity.ok().body(account);
    }
}
