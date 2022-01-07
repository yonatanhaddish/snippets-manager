import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function Router() {
    return (
        <BrowserRouter>
            <Routes>
            <Route exact path="/">Homepage</Route>
                <Route path="/login">Login</Route>
                <Route path="/register">Register</Route>
            </Routes>
        </BrowserRouter>
)};

export default Router;