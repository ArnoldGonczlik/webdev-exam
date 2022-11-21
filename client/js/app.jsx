import * as React from "react";
import { createRoot } from "react-dom";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Frontpage from "./frontpage.jsx"

const element = document.getElementById("app");
const root = createRoot(element);

function Application() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Frontpage />} />
            </Routes>
        </BrowserRouter>
    );
}

root.render(<Application />);