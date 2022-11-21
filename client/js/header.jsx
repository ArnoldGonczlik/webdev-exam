import {useNavigate} from "react-router-dom";

function Header() {
    const navigate = useNavigate();

    function handleClick(e) {
        navigate(e.target.value)
    }

    return  <div>
        <button onClick={handleClick} value={"/"}>Home</button>
        <button onClick={handleClick} value={"/menu"}>Menu</button>
        <button onClick={handleClick} value={"/login"}>Login</button>
        <br/>
        <br/>
    </div>
}

export default Header;