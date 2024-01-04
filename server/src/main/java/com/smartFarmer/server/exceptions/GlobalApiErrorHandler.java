package com.smartFarmer.server.exceptions;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.smartFarmer.server.exceptions.exception.UnAuthorizationException;

@RestControllerAdvice
public class GlobalApiErrorHandler {

    @ExceptionHandler(value = UnAuthorizationException.class)
    public ResponseEntity<Map<String, String>> unAuthorizationException(Exception e) {
        HttpStatus httpStatus = HttpStatus.UNAUTHORIZED;

        Map<String, String> map = new HashMap<>();
        map.put("message", e.getMessage());

        return new ResponseEntity<>(map, httpStatus);
    }
}
