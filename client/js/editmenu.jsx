import Header from "./header.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import * as React from "react";

export function Editmenu({ user, setUser, setClickedItem }) {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState("Loading...");
  const [isHovering, setIsHovering] = useState(false);
  const [itemDeletionResult, setItemDeletionResult] = useState("");

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
        setLoading("");
      });
  }, [itemDeletionResult]);

  function editItem(product) {
    setClickedItem(product);
    navigate("/edititem");
  }

  function deleteItem(e) {
    e.preventDefault();
    fetch(`/api/menu/deleteitem`, {
      method: "delete",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: e.target.value,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.deletedCount === 1) {
          setItemDeletionResult(`Successfully deleted ${e.target.value}`);
          setTimeout(() => {
            setItemDeletionResult("");
          }, 1000);
        }
      });
  }

  return (
    <div>
      <Header user={user} setUser={setUser} />
      {user && user.permissionGroup === 2 && (
        <div>
          <button onClick={() => navigate("/additem")}>Add item</button>
          <div style={{ marginBottom: "2vh", marginTop: "2vh" }}>
            Click one item to edit it:
          </div>
          <div>{loading}</div>
          <div>{itemDeletionResult}</div>
          <div>
            {products.map((product) => (
              <div
                key={product.id}
                style={{ border: "solid 2px", marginBottom: "2vh" }}
              >
                <div
                  onClick={() => editItem(product)}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  style={{ cursor: isHovering ? "pointer" : "" }}
                >
                  <div>{product.name}</div>
                  <div>{product.price} kr</div>
                  <div>{product.description}</div>
                </div>
                <button onClick={deleteItem} value={product.id}>
                  Delete Item
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Editmenu;
