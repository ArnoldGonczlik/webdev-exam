import * as React from "react"
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Frontpage from "./frontpage.jsx"
import Menu from "./menu.jsx"
import Login from "./login.jsx"
import Editmenu from "./editmenu.jsx"
import {useState} from "react";
import Pagenotfound from "./pagenotfound.jsx";
import Edititem from "./edititem.jsx";

const element = document.getElementById("app");
const root = createRoot(element);

export function Application() {
    const [user, setUser] = useState(false);
    const [clickedItem, setClickedItem] = useState(false);

    return(
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Frontpage user={user} setUser={setUser}/>} />
                <Route path={"/menu"} element={<Menu user={user} setUser={setUser}/>} />
                <Route path={"/login"} element={<Login user={user} setUser={setUser}/>} />
                <Route path={"/editmenu"} element={<Editmenu user={user} setUser={setUser} setClickedItem={setClickedItem}/>} />
                <Route path={"/edititem"} element={<Edititem user={user} setUser={setUser} clickedItem={clickedItem}/>} />
                <Route path="*" element={<Pagenotfound />} />
            </Routes>
        </BrowserRouter>
    );
}

//TODO: add functionality to edit items once logged in with admin, find a way to check if user is set to execute depending code

root.render(<Application />);