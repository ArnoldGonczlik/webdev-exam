import * as React from "react";
import { useState } from "react";
import Header from "./header.jsx";

export function Additem({ user, setUser }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [itemAddResult, setItemAddResult] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`/api/menu/additem`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        description: description,
        price: price,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setName("");
        setDescription("");
        setPrice("");
        if (data.acknowledged) {
          setItemAddResult(`Successfully added ${name}`);
          setTimeout(() => {
            setItemAddResult("");
          }, 1000);
        } else {
          setItemAddResult("Something went wrong, try again");
        }
      });
  }

  return (
    <div>
      {user && user.permissionGroup === 2 && (
        <div>
          {" "}
          <Header user={user} setUser={setUser} />
          <div>Add your item:</div>
          <form onSubmit={handleSubmit}>
            <div>
              Name:{" "}
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </div>
            <div>
              Description:{" "}
              <input
                type="textarea"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
            </div>
            <div>
              Price:{" "}
              <input
                type="text"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </div>
            <input type={"submit"} value={"Add item"} />
          </form>
          <div>{itemAddResult}</div>
        </div>
      )}
    </div>
  );
}

export default Additem;
