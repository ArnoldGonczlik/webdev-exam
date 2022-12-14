import { useNavigate } from "react-router-dom";
import * as React from "react";

export function Header({ user, setUser }) {
  const navigate = useNavigate();

  function handleClick(e) {
    navigate(e.target.value);
  }

  function ifViewOrdersDisplay() {
    if (user !== false) {
      if (typeof user !== "undefined") {
        if (user.permissionGroup === 2) {
          return (
            <button onClick={handleClick} value={"/vieworders"}>
              View Orders
            </button>
          );
        }
      }
    }
  }

  function ifEditMenuDisplay() {
    if (user !== false) {
      if (typeof user !== "undefined") {
        if (user.permissionGroup === 2) {
          return (
            <button onClick={handleClick} value={"/editmenu"}>
              Edit Menu
            </button>
          );
        }
      }
    }
  }

  function logoutHandler() {
    if (user !== false) {
      if (typeof user !== "undefined") {
        navigate("/");
        setUser(false);
        localStorage.clear();
        window.location.reload();
      }
    }
  }

  function welcome() {
    if (user !== false) {
      if (typeof user !== "undefined") {
        return (
          <div style={{ display: "inline", marginLeft: "10px" }}>
            Hello, {user.username}!
          </div>
        );
      }
    }
  }
  function ifDisplayLogout() {
    if (user !== false) {
      if (typeof user !== "undefined") {
        if (user.permissionGroup === 1 || user.permissionGroup === 2) {
          return <button onClick={logoutHandler}>Logout</button>;
        }
      }
    }
  }

  function ifDisplayLogin() {
    if (user === false || typeof user === "undefined") {
      return (
        <button onClick={handleClick} value={"/login"}>
          Login
        </button>
      );
    }
  }

  return (
    <div>
      <button onClick={handleClick} value={"/"}>
        Home
      </button>
      <button onClick={handleClick} value={"/menu"}>
        Menu
      </button>
      {ifDisplayLogin()}
      {ifDisplayLogout()}
      {ifEditMenuDisplay()}
      {ifViewOrdersDisplay()}
      {welcome()}
      <br />
      <br />
    </div>
  );
}

export default Header;
