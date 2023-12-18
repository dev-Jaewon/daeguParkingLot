package com.smartFarmer.server.auth.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequestSignupDto {
    private String email;
    private String password;
    private String nickName;
}
