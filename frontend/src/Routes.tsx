import { Routes, Route } from "react-router-dom";
import App from "./App";
import { SignUp } from "./components/Signup";
import { Login } from "./components/Login";
import { NotAuthRoute } from "./NotAuthRoute";

export const RouteList = () => {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route element={<NotAuthRoute />}>
                <Route path="/auth/signup" element={<SignUp />} />
            </Route>
            <Route element={<NotAuthRoute />}>
                <Route path="/auth/login" element={<Login />} />
            </Route>
        </Routes>
    );
}