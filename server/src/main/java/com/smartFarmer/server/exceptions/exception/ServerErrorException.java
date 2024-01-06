package com.smartFarmer.server.exceptions.exception;

public class ServerErrorException extends Exception {
    public ServerErrorException(String content){
        super(content);
    }
}
