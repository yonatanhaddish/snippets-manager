import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/misc/Navbar";

function Router() {
    return (
        <BrowserRouter>
        <Navbar />
            <Routes>
            <Route exact path="/">Homepage</Route>
                <Route path="/login">Login</Route>
                <Route path="/register">Register</Route>
            </Routes>
        </BrowserRouter>
)};

export default Router;