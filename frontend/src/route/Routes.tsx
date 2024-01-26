import { Routes, Route } from "react-router-dom";
import Home from "../components/pages/Home";
import { SignUp } from "../components/pages/Signup";
import { Login } from "../components/pages/Login";
import { NotAuthRoute } from "./NotAuthRoute";

export const RouteList = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<NotAuthRoute />}>
                <Route path="/auth/signup" element={<SignUp />} />
            </Route>
            <Route element={<NotAuthRoute />}>
                <Route path="/auth/login" element={<Login />} />
            </Route>
        </Routes>
    );
}