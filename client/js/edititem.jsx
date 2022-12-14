import * as React from "react";
import { useState } from "react";
import Header from "./header.jsx";

export function Edititem({ clickedItem, user, setUser }) {
  const [name, setName] = useState(clickedItem.name);
  const [description, setDescription] = useState(clickedItem.description);
  const [price, setPrice] = useState(clickedItem.price);
  const [itemEditResult, setItemEditResult] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`/api/menu/edititem`, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: clickedItem.id,
        name: name,
        description: description,
        price: price,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.modifiedCount === 1) {
          setItemEditResult(`Successfully edited ${clickedItem.name}`);
          setTimeout(() => {
            setItemEditResult("");
          }, 1000);
        } else {
          setItemEditResult("Something went wrong, try again");
        }
      });
  }

  return (
    <div>
      {user && user.permissionGroup === 2 && clickedItem && (
        <div>
          <Header user={user} setUser={setUser} />
          <div>You're now editing {clickedItem.name}</div>
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
            <input type={"submit"} value={"Update item"} />
          </form>
          <div>{itemEditResult}</div>
        </div>
      )}
    </div>
  );
}

export default Edititem;
