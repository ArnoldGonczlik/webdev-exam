import Header from "./header.jsx";
import {useNavigate} from "react-router-dom";

export function Editmenu({user, setUser}) {
    const navigate = useNavigate();


    return <div><Header user={user} setUser={setUser}/>{user && <div>
        <button onClick={() => navigate("/additem")}></button>
        <div>Click one item to edit it:</div>

    </div>}</div>
}

export default Editmenu;