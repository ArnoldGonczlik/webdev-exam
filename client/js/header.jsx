import {useNavigate} from "react-router-dom";

export function Header({user, setUser}) {
    const navigate = useNavigate();

    function handleClick(e) {
        navigate(e.target.value)
    }

    function logoutHandler() {
        navigate("/");
        setUser(null);
    }

    function welcome() {
        if(typeof user !== 'undefined') {
            if(user.permissionGroup === 1) {
                return <div>Welcome!</div>
            }
        }
    }

    return  <div>
        <button onClick={handleClick} value={"/"}>Home</button>
        <button onClick={handleClick} value={"/menu"}>Menu</button>
        <button onClick={handleClick} value={"/login"}>Login</button>
        <button onClick={logoutHandler}>Logout</button>
        {welcome()}
        <br/>
        <br/>
    </div>
}

export default Header;