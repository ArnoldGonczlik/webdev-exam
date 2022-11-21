import * as React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Frontpage from "./frontpage.jsx"
import Menu from "./menu.jsx"
import Login from "./login.jsx"
import {useState} from "react";

const element = document.getElementById("app");
const root = createRoot(element);

function Application() {
    const [user, setUser] = useState({});

    return(
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Frontpage />} />
                <Route path={"/menu"} element={<Menu />} />
                <Route path={"/login"} element={<Login />} />
            </Routes>
        </BrowserRouter>
    );
}

root.render(<Application />);