import { Routes, Route } from "react-router-dom";
import App from "./App";
import { SignUp } from "./components/Signup";
import { Login } from "./components/Login";

export const RouteList = () => {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/auth/signup" element={<SignUp />} />
            <Route path="/auth/login" element={<Login />} />
        </Routes>
    );
}