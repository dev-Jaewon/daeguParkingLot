import axios, { HttpStatusCode } from "axios";
import { SearchParkList } from "../types/SearchParkList";
import { SignUpType } from "../types/SignUp";
import { LoginType } from "../types/Login";
import { RequestAddComment } from "../types/RequestAddComment";
import { ModifyCommen } from "../types/ModifyComment";
import { delayApi } from "./delayApi";

const api = axios.create({
    baseURL:
    import.meta.env.VITE_APP_URL,
    withCredentials: true,
    timeout: 3000
});

api.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error)
);

api.interceptors.response.use(((response) => response), async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === HttpStatusCode.Unauthorized) {
        try {
            const refresh = await api.get('/auth/refresh');

            if (refresh.status === 200) {
                return await axios.request(originalRequest);
            }

        } catch (refetchError) {

            return Promise.reject(refetchError);
        }
    }

    return Promise.reject(error);
});

export const getSearch = async (searchParkList: SearchParkList) => {
    const fetch = api.get("/parkingLot/search", { params: searchParkList });

    return await delayApi(fetch, 1000).then(res => res.data);
}

export const checkEmail = async (email: string) => {
    return await api.get(`/check/email/${email}`).then(res => res.data);
}

export const checkNickName = async (nickname: string) => {
    return await api.get(`/check/nickname/${nickname}`).then(res => res.data);
}

export const signup = async (signup: SignUpType) => {
    return await api.post(`/auth/signup`, signup).then(res => res.data);
}

export const login = async (loginInfo: LoginType) => {
    return await api.post(`/auth/login`, loginInfo).then(res => res.data);
}

export const writeComment = async (addInfo: RequestAddComment) => {
    return await api.post(`/comment/write`, addInfo).then(res => res.data);
}

export const commentList = async (parkingLotId: number) => {
    return await api.get(`/comment/${parkingLotId}`).then(res => res.data);
}

export const getDetailInfo = async (parkingLotId: number) => {
    const fetch = api.get(`/parkingLot/detail/${parkingLotId}`);

    return await delayApi(fetch, 1000).then(res => res.data);
}

export const account = async () => {
    return await api.get(`/account`).then(res => res.data);
}

export const removeComment = async (id: number) => {
    return await api.delete(`/comment/${id}`).then(res => res.data);
}

export const modifyCommen = async (modifyCommen: ModifyCommen) => {
    return await api.put(`/comment`, modifyCommen).then(res => res.data);
}