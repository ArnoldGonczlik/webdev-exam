import * as React from "react";
import { createRoot } from "react-dom/client";
import { act, Simulate } from "react-dom/test-utils";
import { Frontpage } from "../js/frontpage.jsx";
import { MemoryRouter } from "react-router-dom";
import Login from "../js/login.jsx";
import Header from "../js/header.jsx";
import Pagenotfound from "../js/pagenotfound.jsx";
import Cart from "../js/cart.jsx";
import Menu from "../js/menu.jsx";
import * as fireEvent from "react-dom/test-utils";

describe("catering business tests", () => {
  it("Renders frontpage", () => {
    const element = document.createElement("div");

    const root = createRoot(element);

    act(() => {
      root.render(
        <MemoryRouter>
          <Frontpage />
        </MemoryRouter>
      );
    });

    expect(element.querySelector("h1")?.innerHTML).toEqual(
      "Welcome to the fantastic catering business!"
    );
    expect(element.innerHTML).toMatchSnapshot();
  });

  it("Tests header when user is set", () => {
    const element = document.createElement("div");

    const root = createRoot(element);

    const user = { id: 1, username: "bob", permissionGroup: 1 };

    act(() => {
      root.render(
        <MemoryRouter>
          <Header user={user} />
        </MemoryRouter>
      );
    });

    expect(element.querySelector("div div div")?.innerHTML).toContain(
      "Hello, bob!"
    );
    expect(element.innerHTML).toMatchSnapshot();
  });

  it("Tests 404 page", () => {
    const element = document.createElement("div");

    const root = createRoot(element);

    const user = { id: 1, username: "bob", permissionGroup: 1 };

    act(() => {
      root.render(
        <MemoryRouter>
          <Pagenotfound />
        </MemoryRouter>
      );
    });

    expect(element.querySelector("h1")?.innerHTML).toContain(
      "404 page not found"
    );
    expect(element.innerHTML).toMatchSnapshot();
  });

  it("Tests cart", () => {
    const element = document.createElement("div");

    const root = createRoot(element);

    const user = { id: 1, username: "bob", permissionGroup: 1 };
    const cart = [
      { name: "Kebab", price: 100 },
      { name: "Burger", price: 50 },
      { name: "Fries", price: 25 },
    ];
    const cartTotal = 175;

    act(() => {
      root.render(
        <MemoryRouter>
          <Cart user={user} cartTotal={cartTotal} cart={cart} />
        </MemoryRouter>
      );
    });

    expect(
      element.querySelector("div div div div:nth-of-type(1) div")?.innerHTML
    ).toEqual("Kebab");
    expect(
      element.querySelector("div div div div:nth-of-type(2) div")?.innerHTML
    ).toEqual("Burger");
    expect(
      element.querySelector("div div div div:nth-of-type(3) div")?.innerHTML
    ).toEqual("Fries");
    expect(element.querySelector("div div")?.innerHTML).toContain(
      "Your total: 175"
    );
    expect(element.innerHTML).toMatchSnapshot();
  });
});
