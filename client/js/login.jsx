import * as React from "react";
import Header from "./header.jsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Login({ user, setUser }) {
  const [username, setUsername] = useState("");
  const [loginOutput, setLoginOutput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetch(`/api/users/checkusername`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.length > 0) {
          setLoginOutput(`Success! Welcome ${data[0].username} :)`);
          getFullUser();
        } else {
          setLoginOutput("Invalid login.");
        }
      });
  };

  const getFullUser = async () => {
    await fetch(`/api/users/getuser`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUser(data[0]);
        localStorage.setItem("user", data[0].username);
        setTimeout(() => navigate("/"), 1000);
      });
  };

  //Only have this useffect to clear the text of login result
  useEffect(() => {
    setTimeout(() => {
      setLoginOutput("");
    }, 2000);
  }, [loginOutput]);

  const createUser = async () => {
    await fetch(`/api/users/createuser`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setTimeout(() => navigate("/"), 1000);
      });
  };

  return (
    <div>
      <Header user={user} setUser={setUser} />
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Username:{" "}
          <input type="text" onChange={(e) => setUsername(e.target.value)} />
        </div>
        <br />
        <input type={"submit"} value={"Log in"} />
      </form>
      <br />
      <button onClick={createUser}>Create user with current username</button>
      <br />
      <br />
      <div>{loginOutput}</div>
    </div>
  );
}

export default Login;
