import * as React from "react"
import Header from "./header.jsx";

export function Frontpage({user, setUser}) {
    return <div><Header user={user} setUser={setUser}/><h1>Welcome to the fantastic catering business!</h1>
        <div>We specialize in the best kind of food!</div>
        <div>Please use the navigation at the top to look at our food selection and more</div>
    </div>

}

export default Frontpage;