import axios from "axios";
import { SearchParkList } from "../types/SearchParkList";
import { SignUpType } from "../types/SignUp";

const api = axios.create({
    baseURL:
        "http://localhost:8080",
    headers: {
        "Content-Type": "application/json",
    },
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