import { render, screen } from '@testing-library/react';
import React from "react";
import '@testing-library/jest-dom'
import {BrowserRouter} from "react-router-dom";
import Header from "../index";
import {setGlobalState} from "../../../state";


test('correctly renders navigation buttons for non logged user', () => {
    setGlobalState('token', "");
    setGlobalState('userRole', "");
    render(
        <BrowserRouter>
            <Header/>
        </BrowserRouter>
    )
    const elements = screen.getAllByLabelText("navigationButton");
    expect(elements[0].textContent).toBe("Browse");
    expect(elements[1].textContent).toBe("Add new");
    expect(elements.length).toBe(2);
});

test('correctly renders navigation buttons for logged user', () => {
    setGlobalState('token', "token");
    setGlobalState('userRole', "USER");
    render(
        <BrowserRouter>
            <Header/>
        </BrowserRouter>
    )
    const elements = screen.getAllByLabelText("navigationButton");
    expect(elements[0].textContent).toBe("Browse");
    expect(elements[1].textContent).toBe("Add new");
    expect(elements[2].textContent).toBe("Recommended");
    expect(elements.length).toBe(3);
});

test('correctly renders navigation buttons for logged admin', () => {
    setGlobalState('token', "token");
    setGlobalState('userRole', "ADMIN");
    render(
        <BrowserRouter>
            <Header/>
        </BrowserRouter>
    )
    const elements = screen.getAllByLabelText("navigationButton");
    expect(elements[0].textContent).toBe("Browse");
    expect(elements[1].textContent).toBe("Add new");
    expect(elements[2].textContent).toBe("Recommended");
    expect(elements[3].textContent).toBe("Admin panel");
    expect(elements.length).toBe(4);
});
