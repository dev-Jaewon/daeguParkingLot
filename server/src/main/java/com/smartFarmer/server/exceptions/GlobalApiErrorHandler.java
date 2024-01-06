package com.smartFarmer.server.exceptions;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.smartFarmer.server.exceptions.exception.ServerErrorException;
import com.smartFarmer.server.exceptions.exception.UnAuthorizationException;

@RestControllerAdvice
public class GlobalApiErrorHandler {

    @ExceptionHandler(value = UnAuthorizationException.class)
    public ResponseEntity<Map<String, String>> unAuthorizationException(Exception e) {
        HttpStatus httpStatus = HttpStatus.UNAUTHORIZED;

        return justReturnMessage(httpStatus, e.getMessage());
    }

    @ExceptionHandler(value = ServerErrorException.class)
    public ResponseEntity<Map<String, String>> serverErrorException(Exception e){
        HttpStatus httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        
        return justReturnMessage(httpStatus, e.getMessage());
    }

    public ResponseEntity<Map<String, String>> justReturnMessage(HttpStatus code, String value){

        Map<String, String> map = new HashMap<>();
        map.put("message", value);

        return ResponseEntity.status(code).body(map);
    }
}
