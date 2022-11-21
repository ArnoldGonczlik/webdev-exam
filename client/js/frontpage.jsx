import {useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./header.jsx";

function Frontpage() {
    const navigate = useNavigate();

    function handleClick(e) {
        navigate(e.target.value)
    }

    return <div><Header/><h1>Welcome to the fantastic catering business!</h1>
        <div>We specialize in the best kind of food!</div>
        <div>Please use the navigation at the top to look at our food selection and more</div>
    </div>

}

export default Frontpage;