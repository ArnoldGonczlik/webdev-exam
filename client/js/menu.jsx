import * as React from "react";
import { useEffect, useState } from "react";
import Header from "./header.jsx";
import Cart from "./cart.jsx";

export function Menu({ user, setUser }) {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState("Loading...");
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    fetch("/api/menu/allitems")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setDishes(data);
        setLoading("");
      });
  }, []);

  function addToCart(e) {
    dishes.forEach((dish) => {
      if (parseInt(e.target.value) === parseInt(dish.id)) {
        setCartTotal(cartTotal + parseInt(dish.price));
        setCart([...cart, dish]);
      }
    });
  }

  function addToCartButton(dishid) {
    if (user !== false) {
      if (typeof user !== "undefined") {
        if (user.permissionGroup === 1) {
          return (
            <button onClick={(e) => addToCart(e)} value={dishid}>
              Add to cart
            </button>
          );
        }
      }
    }
  }

  return (
    <div>
      {" "}
      <Header user={user} setUser={setUser} />
      <div>{loading}</div>
      <div>
        {dishes.map((dish) => (
          <div className={"each-dish"} key={dish.id}>
            <div>{dish.name}</div>
            <div>{dish.price} kr</div>
            <div>{dish.description}</div>
            <div>{addToCartButton(dish.id)}</div>
            <br />
            <br />
          </div>
        ))}
      </div>
      <Cart cart={cart} cartTotal={cartTotal} user={user} setCart={setCart} setCartTotal={setCartTotal} />
    </div>
  );
}

export default Menu;
