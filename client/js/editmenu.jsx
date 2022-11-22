import Header from "./header.jsx";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import * as React from "react";

export function Editmenu({user, setUser, setClickedItem}) {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState("Loading...");
    const [isHovering, setIsHovering] = useState(false);


    const handleMouseEnter = () => {
        setIsHovering(true);
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
    };


    useEffect(() => {
        fetch("/api/menu/allitems")
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setProducts(data);
                setLoading("")
            });
    }, []);

    function editItem(productName) {
        setClickedItem(productName)
        navigate("/edititem")
    }

    function deleteItem(e) {
        e.preventDefault()
        alert(e.target.value + " deleted.")
    }


    return <div><Header user={user} setUser={setUser}/>{/*user &&*/ <div>
        <button onClick={() => navigate("/additem")}>Add item</button>
        <div style={{marginBottom: "2vh", marginTop: "2vh"}}>Click one item to edit it:</div>
        <div>{loading}</div>
        <div>{products.map((product) => (<div key={product._id} style={{border: "solid 2px", marginBottom: "2vh"}} >
                <div onClick={() => editItem(product.name)} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{cursor: isHovering ? 'pointer' : ''}}>
                <div>{product.name}</div>
                <div>{product.price} kr</div>
                <div>{product.description}</div>
            </div>
                <button onClick={deleteItem} value={product.name}>Delete Item</button>
            </div>
        ))}</div>
    </div>}</div>
}

export default Editmenu;