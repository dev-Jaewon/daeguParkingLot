import { Navigate, Outlet } from "react-router-dom";
import { useAccount } from "./hooks/useAccount"

export const NotAuthRoute = () => {
    const {data} = useAccount();

    return !data ? <Outlet /> : <Navigate to="/" />;
}