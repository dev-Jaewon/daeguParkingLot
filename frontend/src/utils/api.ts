import axios from "axios";
import { SearchParkList } from "../types/SearchParkList";

const api = axios.create({
    baseURL:
        "http://localhost:8080",
    headers: {
        "Content-Type": "application/json",
    },
});

export const getSearch = async (searchParkList: SearchParkList) => {
    return await api.get("http://localhost:8080/parkingLot/search",{
        params: searchParkList
    }).then(res => res.data);
}