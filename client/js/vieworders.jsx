import Header from "./header.jsx";
import * as React from "react";
import { useEffect, useState } from "react";

export function Vieworders({ user, setUser }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState("Loading...");

  useEffect(() => {
    fetch("/api/orders/getorders")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setOrders(data);
        setLoading("");
      });
  }, []);

  return (
    <div>
      <Header user={user} setUser={setUser} />
      {user && user.permissionGroup === 2 && (
        <div>
          <div>
            {" "}
            <div>{loading}</div>
            <div>Your orders: </div>
            {orders.map((order) => (
              <div key={order.id} style={{ display: "inline", margin: "2vh" }}>
                <div>Placed by: {order.username}</div>
                <div>At date: {order.placedDate}</div>
                <div>
                  Items in order:{" "}
                  {order.items.map((item) => (
                    <div key={item.id}>
                      <div>{item.name}</div>
                      <div>{item.price}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Vieworders;
