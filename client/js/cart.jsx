import * as React from "react";
import { useState } from "react";

export function Cart({ cart, cartTotal, user, setCart, setCartTotal }) {
  const [orderStatus, setOrderStatus] = useState("");

  if (user === false || typeof user === "undefined") {
    return <div>Please log in to purchase</div>;
  }

  if (user.permissionGroup === 2) {
    return;
  }

  function placeOrder() {
    fetch(`/api/orders/placeorder`, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user.username,
        items: cart,
      }),
    }).then((res) => {
      if (res.ok) {
        setCart([]);
        setOrderStatus(`Successfully placed order`);
        setTimeout(() => {
          setOrderStatus("");
        }, 2000);
        setCartTotal(0);
      } else {
        setOrderStatus("Something went wrong, try again");
      }
    });
  }

  return (
    <div>
      <h4>Your cart:</h4>
      <button onClick={placeOrder}>Place order</button>
      <div>{orderStatus}</div>
      <br />
      <br />
      <div>
        {cart.map((item, index) => (
          <div key={index}>
            <div>{item.name}</div>
            <div>{item.price} kr</div>
          </div>
        ))}
      </div>
      <div>Your total: {cartTotal}</div>
    </div>
  );
}

export default Cart;
