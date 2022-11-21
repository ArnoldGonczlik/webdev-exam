import * as React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Frontpage from "./frontpage.jsx"
import Menu from "./menu.jsx"
import Login from "./login.jsx"

const element = document.getElementById("app");
const root = createRoot(element);

function Application() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Frontpage />} />
                <Route path={"/menu"} element={<Menu />} />
                <Route path={"/login"} element={<Menu />} />
            </Routes>
        </BrowserRouter>
    );
}

root.render(<Application />);