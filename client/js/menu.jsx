import {useEffect, useState} from "react";
import "./menu.css";
import Header from "./header.jsx"

function Menu() {
    const [dishes, setDishes] = useState([]);
    const [loading, setLoading] = useState("Loading...");

    useEffect(() => {
        fetch("/api/dishes")
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setDishes(data);
                setLoading("")
            });
    }, []);

    return  <div> <Header/><div>{loading}</div>
        <div>{dishes.map((dish) => (<div className={"each-dish"} key={dish.id}>
            <div>{dish.name}</div>
            <div>{dish.price}</div>
            <div>{dish.description}</div></div>
        ))}</div>
        </div>
}

export default Menu;