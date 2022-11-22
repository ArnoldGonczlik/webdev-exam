import * as React from "react"
import {createRoot} from "react-dom/client";
import { act } from "react-dom/test-utils";
import { Frontpage } from "../js/frontpage.jsx";
import { MemoryRouter } from "react-router-dom";

describe("catering business tests", () => {

    it("Renders frontpage", () => {
        const element = document.createElement("div");

        const root = createRoot(element);

        act(() => {

            root.render(
                <MemoryRouter>
                    <Frontpage/>
                </MemoryRouter>
            );
        });

        expect(element.querySelector("h1")?.innerHTML).toEqual("Welcome to the fantastic catering business!");
        expect(element.innerHTML).toMatchSnapshot();

    });
});