import axios from "axios";
import { SearchParkList } from "../types/SearchParkList";
import { SignUpType } from "../types/SignUp";
import { LoginType } from "../types/Login";

const api = axios.create({
    baseURL:
        "http://localhost:8080",
    withCredentials: true
});

api.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => Promise.reject(error),
);

api.interceptors.response.use(((response) => response), (error) => {
    return Promise.reject(error);
});

export const getSearch = async (searchParkList: SearchParkList) => {
    return await api.get("http://localhost:8080/parkingLot/search", {
        params: searchParkList
    }).then(res => res.data);
}

export const checkEmail = async (email: string) => {
    return await api.get(`http://localhost:8080/check/email/${email}`).then(res => res.data);
}

export const checkNickName = async (nickname: string) => {
    return await api.get(`http://localhost:8080/check/nickname/${nickname}`).then(res => res.data);
}

export const signup = async (signup: SignUpType) => {
    return await api.post(`http://localhost:8080/auth/signup`, signup).then(res => res.data);
}

export const login = async (loginInfo: LoginType) => {
    return await api.post(`http://localhost:8080/auth/login`, loginInfo).then(res => res.data);
}

export const getDetailInfo = async (parkingLotId: string) => {
    return await api.get(`http://localhost:8080/parkingLot/detail/${parkingLotId}`).then(res => res.data);
}