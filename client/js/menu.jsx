import * as React from "react"
import {useEffect, useState} from "react";
import Header from "./header.jsx"

export function Menu({user}) {
    const [dishes, setDishes] = useState([]);
    const [loading, setLoading] = useState("Loading...");

    useEffect(() => {
        fetch("/api/menu/allitems")
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setDishes(data);
                setLoading("")
            });
    }, []);

    function addToCart() {
        if(typeof user !== 'undefined') {
            return <button>Add to cart</button>
        }

    }

    return  <div> <Header/><div>{loading}</div>
        <div>{dishes.map((dish) => (<div className={"each-dish"} key={dish.id}>
            <div>{dish.name}</div>
            <div>{dish.price} kr</div>
            <div>{dish.description}</div>
                <div>{addToCart()}</div></div>
        ))}</div>
        </div>
}

export default Menu;