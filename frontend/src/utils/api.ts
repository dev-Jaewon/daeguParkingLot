import axios from "axios";
import { SearchParkList } from "../types/SearchParkList";

const api = axios.create({
    baseURL:
        "http://localhost:8080",
    headers: {
        "Content-Type": "application/json",
    },
});

export const getParkList = async (searchParkList: SearchParkList) => {
    return await api.get("http://localhost:8080/parkingAlot/list",{
        params: searchParkList
    }).then(res => res.data);
}